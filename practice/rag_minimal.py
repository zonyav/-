"""Минимальный RAG до вызова генератора: поиск, gate, eval и сборка prompt."""

import argparse
import json
from pathlib import Path

try:
    from sentence_transformers import SentenceTransformer
except ModuleNotFoundError as error:
    raise SystemExit(
        "Не найдена библиотека sentence-transformers. Сначала выполните: "
        "python -m pip install -r requirements.txt"
    ) from error


ROOT = Path(__file__).parent
MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
# Значение только для учебного корпуса. На рабочих данных порог калибруют по eval-набору.
ANSWERABILITY_THRESHOLD = 0.45
TOP_K = 3


def load_json(name: str):
    return json.loads((ROOT / name).read_text(encoding="utf-8"))


def build_prompt(query: str, hits: list[dict]) -> str:
    context = "\n\n".join(
        f"[{number}] {hit['title']} ({hit['id']})\n{hit['text']}"
        for number, hit in enumerate(hits, start=1)
    )
    return f"""Ты помощник службы поддержки.
Отвечай только по источникам ниже и указывай номера в квадратных скобках.
Если источники не подтверждают ответ, честно скажи, что информации недостаточно.

ИСТОЧНИКИ
{context}

ВОПРОС
{query}
"""


def retrieve(query: str, documents: list[dict], model: SentenceTransformer) -> list[dict]:
    texts = [item["text"] for item in documents]
    document_vectors = model.encode(texts, normalize_embeddings=True)
    query_vector = model.encode([query], normalize_embeddings=True)[0]
    scores = document_vectors @ query_vector
    order = scores.argsort()[::-1][:TOP_K]
    return [{**documents[index], "score": float(scores[index])} for index in order]


def load_eval_cases() -> list[dict]:
    lines = (ROOT / "eval_cases.jsonl").read_text(encoding="utf-8").splitlines()
    return [json.loads(line) for line in lines if line.strip()]


def run_evaluation(documents: list[dict], model: SentenceTransformer) -> None:
    cases = load_eval_cases()
    answerable = [case for case in cases if case["can_answer"]]
    retrieval_hits = 0
    correct_decisions = 0

    print(f"Eval: {len(cases)} вопросов, top_k={TOP_K}, threshold={ANSWERABILITY_THRESHOLD}")
    for case in cases:
        hits = retrieve(case["query"], documents, model)
        top_score = hits[0]["score"] if hits else 0.0
        predicted_id = hits[0]["id"] if hits and top_score >= ANSWERABILITY_THRESHOLD else None
        expected_id = case["expected_doc_id"]
        found_expected = expected_id is not None and any(
            hit["id"] == expected_id for hit in hits
        )
        retrieval_hits += int(found_expected)
        correct_decisions += int(predicted_id == expected_id)
        mark = "OK" if predicted_id == expected_id else "ERR"
        print(
            f"{mark:3s} | score={top_score:.3f} | expected={expected_id} "
            f"| predicted={predicted_id} | {case['query']}"
        )

    recall_at_k = retrieval_hits / len(answerable) if answerable else 0.0
    gate_accuracy = correct_decisions / len(cases) if cases else 0.0
    print(f"\nRecall@{TOP_K}: {recall_at_k:.1%}")
    print(f"Answer-or-refuse accuracy: {gate_accuracy:.1%}")
    print("Порог учебный: подберите его заново на своих данных и цене ошибок.")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--eval",
        action="store_true",
        help="прогнать вопросы из eval_cases.jsonl вместо интерактивного режима",
    )
    args = parser.parse_args()
    documents = load_json("knowledge_base.json")
    model = SentenceTransformer(MODEL_NAME)

    if args.eval:
        run_evaluation(documents, model)
        return

    query = input("Вопрос: ").strip()
    hits = retrieve(query, documents, model)

    print("\nРезультаты retrieval:")
    for hit in hits:
        print(f"{hit['score']:.3f} | {hit['id']} | {hit['title']}")

    if not hits or hits[0]["score"] < ANSWERABILITY_THRESHOLD:
        print("\nОТКАЗ: в базе нет достаточно надёжного источника. Уточните вопрос.")
        return

    print("\nPrompt, который можно передать выбранной instruct-модели:\n")
    print(build_prompt(query, hits))


if __name__ == "__main__":
    main()
