"""Интерфейс итогового RAG-проекта."""

import streamlit as st
from sentence_transformers import SentenceTransformer

from rag_core import MODEL_NAME, answer_query, load_index


st.set_page_config(page_title="RAG-ассистент", page_icon="◉", layout="centered")


@st.cache_resource
def load_resources():
    vectors, metadata = load_index()
    model = SentenceTransformer(MODEL_NAME)
    return model, vectors, metadata


st.title("RAG-ассистент по базе знаний")
st.caption("Учебный production-minded проект: источники, scores, отказ и логи.")
st.info("Ответы ограничены документами в папке documents. Проверяйте источники перед важным решением.")

try:
    model, vectors, metadata = load_resources()
except RuntimeError as error:
    st.error(str(error))
    st.code("python ingest.py")
    st.stop()

query = st.text_area(
    "Вопрос",
    placeholder="Например: сколько ждать возврат денег на карту?",
    height=100,
)

if st.button("Найти ответ", type="primary", disabled=not query.strip()):
    with st.spinner("Ищу подтверждение в документах..."):
        result = answer_query(query, model, vectors, metadata)

    if not result["can_answer"]:
        st.warning(
            "В базе недостаточно надёжной информации. "
            "Уточните вопрос или передайте его специалисту."
        )
    elif result["error"]:
        st.error(result["error"])
    elif result["answer"]:
        st.subheader("Ответ")
        st.write(result["answer"])
    else:
        st.success("Подходящие источники найдены. Генератор не подключён.")
        with st.expander("Prompt для совместимого генератора"):
            st.code(result["prompt"], language="text")

    st.caption(
        f"request_id: {result['request_id']} · "
        f"latency: {result['latency_ms']} ms · threshold: {result['threshold']}"
    )
    st.subheader("Источники")
    for index, hit in enumerate(result["hits"], start=1):
        with st.expander(f"[{index}] {hit['title']} · score {hit['score']:.3f}"):
            st.caption(f"{hit['source']} · {hit['chunk_id']}")
            st.write(hit["text"])

