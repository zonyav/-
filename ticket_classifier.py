"""Минимальный смысловой поиск по русским текстам."""

try:
    from sentence_transformers import SentenceTransformer
except ModuleNotFoundError as error:
    raise SystemExit(
        "Не найдена библиотека sentence-transformers. Сначала выполните: "
        "python -m pip install -r requirements.txt"
    ) from error


MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
DOCUMENTS = [
    "Возврат денег на банковскую карту занимает до десяти рабочих дней.",
    "Адрес доставки можно изменить до передачи заказа курьеру.",
    "Для восстановления пароля запросите одноразовый код в профиле.",
    "Повреждённый товар сфотографируйте вместе с упаковкой и номером заказа.",
    "Корпоративные клиенты получают закрывающие документы в начале месяца.",
]


def main() -> None:
    model = SentenceTransformer(MODEL_NAME)
    document_vectors = model.encode(DOCUMENTS, normalize_embeddings=True)

    query = "Сколько ждать деньги после отмены покупки?"
    query_vector = model.encode([query], normalize_embeddings=True)[0]
    scores = document_vectors @ query_vector

    print("Запрос:", query)
    print("\nТри наиболее близких документа:")
    for index in scores.argsort()[::-1][:3]:
        print(f"{scores[index]:.3f} | {DOCUMENTS[index]}")


if __name__ == "__main__":
    main()
