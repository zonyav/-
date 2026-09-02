"""Проверяет retrieval и answerability gate на фиксированном eval-наборе."""

from __future__ import annotations

import json
import time
from pathlib import Path

from sentence_transformers import SentenceTransformer

from rag_core import MODEL_NAME, load_index, retrieve, settings


ROOT = Path(__file__).parent


def load_cases() -> list[dict]:
    return [
        json.loads(line)
        for line in (ROOT / "eval.jsonl").read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]


def main() -> None:
    cases = load_cases()
    vectors, metadata = load_index()
    model = SentenceTransformer(MODEL_NAME)
    config = settings()
    answerable = [case for case in cases if case["can_answer"]]
    recall_hits = top_one_hits = gate_hits = 0
    latencies: list[float] = []

    for case in cases:
        started = time.perf_counter()
        hits = retrieve(case["query"], model, vectors, metadata, config["top_k"])
        latencies.append((time.perf_counter() - started) * 1000)
        sources = [hit.source for hit in hits]
        expected = case["expected_source"]
        predicted_answerable = bool(hits and hits[0].score >= config["threshold"])
        recall_hits += int(expected is not None and expected in sources)
        top_one_hits += int(expected is not None and bool(sources) and sources[0] == expected)
        gate_hits += int(predicted_answerable == case["can_answer"])
        mark = "OK" if predicted_answerable == case["can_answer"] else "ERR"
        score = hits[0].score if hits else 0.0
        print(
            f"{mark:3s} | {case['id']} | score={score:.3f} | "
            f"expected={expected} | top={sources[0] if sources else None}"
        )

    print(f"\nRecall@{config['top_k']}: {recall_hits / len(answerable):.1%}")
    print(f"Top-1 accuracy: {top_one_hits / len(answerable):.1%}")
    print(f"Answerability accuracy: {gate_hits / len(cases):.1%}")
    print(f"Mean retrieval latency: {sum(latencies) / len(latencies):.1f} ms")
    print("Порог не универсален: настройте его на своём eval и цене ошибок.")


if __name__ == "__main__":
    main()

