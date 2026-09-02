"""Строит локальный embedding-индекс из папки documents."""

from rag_core import MODEL_NAME, build_index


def main() -> None:
    print("Embedding model:", MODEL_NAME)
    result = build_index()
    print(f"Готово: документов {result['documents']}, chunks {result['chunks']}")


if __name__ == "__main__":
    main()

