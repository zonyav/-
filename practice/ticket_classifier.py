"""Учебный baseline: классификация обращений без LLM."""

from pathlib import Path

try:
    import pandas as pd
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.linear_model import LogisticRegression
    from sklearn.metrics import classification_report, confusion_matrix
    from sklearn.model_selection import train_test_split
    from sklearn.pipeline import Pipeline
except ModuleNotFoundError as error:
    raise SystemExit(
        "Не найдена библиотека для практикума. Сначала выполните: "
        "python -m pip install -r requirements.txt"
    ) from error


DATA_PATH = Path(__file__).with_name("tickets.csv")
RANDOM_STATE = 42


def main() -> None:
    data = pd.read_csv(DATA_PATH)
    train_texts, test_texts, train_labels, test_labels = train_test_split(
        data["text"],
        data["label"],
        test_size=0.25,
        random_state=RANDOM_STATE,
        stratify=data["label"],
    )

    # Этот baseline дешёвый, быстрый и объяснимый. С ним сравнивают более сложные модели.
    model = Pipeline(
        [
            ("tfidf", TfidfVectorizer(ngram_range=(1, 2), lowercase=True)),
            (
                "classifier",
                LogisticRegression(
                    max_iter=1000,
                    class_weight="balanced",
                    random_state=RANDOM_STATE,
                ),
            ),
        ]
    )
    model.fit(train_texts, train_labels)

    predictions = model.predict(test_texts)
    labels = sorted(data["label"].unique())
    print("Классы:", labels)
    print("\nClassification report:\n")
    print(classification_report(test_labels, predictions, labels=labels, zero_division=0))
    print("Confusion matrix (строки — факт, столбцы — прогноз):\n")
    print(confusion_matrix(test_labels, predictions, labels=labels))

    examples = [
        "Деньги за отмененный заказ еще не пришли",
        "Не могу получить код для входа",
        "Курьер привез разбитый монитор",
    ]
    print("\nНовые обращения:")
    for text, label in zip(examples, model.predict(examples)):
        print(f"- {label:8s} | {text}")


if __name__ == "__main__":
    main()
