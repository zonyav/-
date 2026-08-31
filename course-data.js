window.COURSE = {
  title: "Внутри LLM: как думает ChatGPT?",
  source: "https://stepik.org/course/243156",
  modules: [
    {
      number: "00",
      title: "Старт",
      lessons: [
        {
          id: "welcome",
          title: "Как проходить этот курс",
          deck: "Не набор терминов, а связная карта: от текста и токенов до RAG-систем и автономных агентов.",
          time: "7 мин",
          level: "Старт",
          body: `
            <section class="lesson-section" id="route">
              <span class="section-number">01</span><h2>Одна история вместо <em>разрозненных тем</em></h2>
              <p class="lead">Весь курс отвечает на один вопрос: как превратить вероятностную модель текста в полезную и проверяемую систему?</p>
              <div class="diagram"><div class="flow">
                <div class="flow-node"><strong>Текст</strong><span>задача пользователя</span></div>
                <div class="flow-node"><strong>LLM</strong><span>понимает контекст и генерирует</span></div>
                <div class="flow-node"><strong>RAG</strong><span>приносит внешние факты</span></div>
                <div class="flow-node"><strong>Инструменты</strong><span>выполняют точные действия</span></div>
                <div class="flow-node"><strong>Агент</strong><span>управляет циклом решения</span></div>
              </div></div>
              <div class="plain"><p class="kicker">Как читать</p><p>Сначала поймите идею на бытовом примере. Затем посмотрите схему и только после этого — термин или формулу. Если термин нельзя объяснить без термина, значит объяснение ещё не закончено.</p></div>
            </section>
            <section class="lesson-section" id="method">
              <span class="section-number">02</span><h2>Что будет в каждом уроке</h2>
              <div class="card-grid">
                <article class="card"><h3>Зачем</h3><p>Какую реальную проблему решает подход и когда он вообще нужен.</p></article>
                <article class="card"><h3>Механика</h3><p>Последовательность работы без лишней математики, но без магии.</p></article>
                <article class="card"><h3>Пример</h3><p>Один небольшой сценарий, который можно мысленно выполнить руками.</p></article>
                <article class="card"><h3>Проверка</h3><p>Короткое упражнение с объяснением ответа, а не только оценкой.</p></article>
              </div>
              <div class="takeaway"><strong>Главное правило</strong>Не пытайтесь запомнить названия моделей. Запоминайте различия между задачами и причины выбора технологии.</div>
            </section>
          `
        }
      ]
    },
    {
      number: "01",
      title: "NLP и языковые модели",
      lessons: [
        {
          id: "nlp-map",
          title: "Карта задач NLP",
          deck: "Научимся отличать классификацию, кластеризацию, разметку последовательностей и генерацию — по форме ответа, а не по названию.",
          time: "18 мин",
          level: "Основа",
          body: `
            <section class="lesson-section" id="what-is-nlp">
              <span class="section-number">01</span><h2>NLP — мост между <em>языком и вычислениями</em></h2>
              <p class="lead">Natural Language Processing — область на стыке лингвистики и машинного обучения. Она превращает человеческий текст в данные, с которыми может работать программа.</p>
              <div class="plain"><p class="kicker">По-простому</p><p>Компьютер не «видит» просьбу «верни деньги за заказ». Он получает последовательность символов. NLP помогает понять, что это обращение про возврат, найти номер заказа, оценить срочность и подготовить ответ.</p></div>
            </section>
            <section class="lesson-section" id="task-types">
              <span class="section-number">02</span><h2>Четыре базовые формы задачи</h2>
              <div class="card-grid">
                <article class="card"><p class="kicker">Текст → класс</p><h3>Классификация</h3><p>Категории известны заранее: спам, тональность, тема. Нужны размеченные примеры.</p></article>
                <article class="card"><p class="kicker">Тексты → группы</p><h3>Кластеризация</h3><p>Категорий заранее нет: алгоритм сам собирает похожие документы в кластеры.</p></article>
                <article class="card"><p class="kicker">Фрагмент → метка</p><h3>Sequence labeling</h3><p>Каждому токену назначается роль: имя, организация, дата или часть речи.</p></article>
                <article class="card accent"><p class="kicker">Текст → новый текст</p><h3>Seq2seq и генерация</h3><p>Перевод, краткое содержание, перефразирование и ответы на вопросы.</p></article>
              </div>
              <div class="example"><p class="kicker">Один сервис поддержки</p><h3>Один запрос — несколько NLP-задач</h3><div class="example-steps">
                <div class="example-step"><span>1</span><p>Классификатор определяет тему «возврат».</p></div>
                <div class="example-step"><span>2</span><p>NER-модель извлекает номер заказа и дату.</p></div>
                <div class="example-step"><span>3</span><p>Поиск находит нужную инструкцию.</p></div>
                <div class="example-step"><span>4</span><p>LLM формулирует понятный ответ по найденной инструкции.</p></div>
              </div></div>
            </section>
            <section class="lesson-section" id="systems">
              <span class="section-number">03</span><h2>Современная система — это <em>композиция</em></h2>
              <p>Поиск находит сведения, RAG соединяет поиск и генерацию, мультимодальная модель работает с текстом и изображениями, а агент выбирает следующие действия. Один продукт часто содержит все эти части.</p>
              <div class="quiz" data-quiz data-answer="clustering">
                <p class="kicker">Проверка</p><h3>Отзывы нужно автоматически разбить на смысловые группы. Готовых категорий нет. Что это?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="radio" name="q-nlp" value="classification"><span>Классификация</span></label>
                  <label class="quiz-option"><input type="radio" name="q-nlp" value="clustering"><span>Кластеризация</span></label>
                  <label class="quiz-option"><input type="radio" name="q-nlp" value="generation"><span>Генерация</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Кластеризация сама обнаруживает группы; у классификации классы заданы заранее."></span></div>
              </div>
            </section>
            <div class="source-box"><p class="kicker">Основа материала</p><p>Урок 2.1 курса Stepik: <a href="https://stepik.org/lesson/1786035/step/1?unit=1811709" target="_blank" rel="noreferrer">«Введение в NLP и LLM»</a>. Содержание видео встроено в объяснения, а не вынесено отдельной расшифровкой.</p></div>
          `
        },
        {
          id: "how-llm-works",
          title: "Как LLM учится продолжать текст",
          deck: "Токены, эмбеддинги, Transformer и обучение следующему токену — как единая цепочка.",
          time: "28 мин",
          level: "Основа",
          body: `
            <section class="lesson-section" id="tokens">
              <span class="section-number">01</span><h2>Токен — рабочая <em>единица текста</em></h2>
              <p class="lead">Модель не получает предложение целиком. Токенизатор разбивает его на элементы из словаря: слова, части слов, знаки и иногда отдельные байты.</p>
              <div class="example"><p class="kicker">Условный пример</p><p><code>нейросетевой</code> может превратиться в <code>нейро</code> + <code>сет</code> + <code>евой</code>. Редкое слово остаётся несколькими знакомыми частями, поэтому не нужен бесконечный словарь.</p></div>
              <details><summary>Почему токен не равен слову?</summary><div>Слова изменяются, появляются новые термины, адреса и опечатки. Подсловные алгоритмы вроде BPE позволяют собрать редкое слово из частых частей.</div></details>
            </section>
            <section class="lesson-section" id="transformer">
              <span class="section-number">02</span><h2>От номера токена к <em>контекстному смыслу</em></h2>
              <div class="diagram"><div class="flow">
                <div class="flow-node"><strong>Текст</strong><span>«ключ от двери»</span></div>
                <div class="flow-node"><strong>Токены</strong><span>части строки</span></div>
                <div class="flow-node"><strong>ID</strong><span>номера в словаре</span></div>
                <div class="flow-node"><strong>Эмбеддинги</strong><span>векторы признаков</span></div>
                <div class="flow-node"><strong>Transformer</strong><span>смысл с учётом окружения</span></div>
              </div></div>
              <div class="plain"><p class="kicker">Три понятия</p><p><strong>Эмбеддинг</strong> — обучаемый набор чисел для токена. <strong>Attention</strong> — способ определить, какие части контекста важны сейчас. <strong>Transformer</strong> — архитектура, которая многократно обновляет представления токенов с помощью attention и других преобразований.</p></div>
              <p>Слово «ключ» в «ключ от двери» и «ключ в словаре» начинается с похожего представления, но после обработки контекста получает разные внутренние признаки.</p>
            </section>
            <section class="lesson-section" id="prediction">
              <span class="section-number">03</span><h2>Обучение: предскажи <em>следующий токен</em></h2>
              <p>Во время предобучения модель видит огромные массивы текста. Для каждого места она оценивает вероятности продолжений. Правильный токен известен из исходного текста, поэтому можно посчитать ошибку и немного изменить веса.</p>
              <div class="formula">контекст → вероятности словаря → ошибка → обновление весов → повтор</div>
              <div class="card-grid">
                <article class="card"><h3>Greedy decoding</h3><p>Каждый раз выбирается самый вероятный токен. Стабильно, но иногда однообразно.</p></article>
                <article class="card accent"><h3>Sampling</h3><p>Выбор случайный, но более вероятные токены выпадают чаще. Ответы разнообразнее.</p></article>
              </div>
            </section>
            <section class="lesson-section" id="assistant">
              <span class="section-number">04</span><h2>Почему базовая модель — ещё не ассистент</h2>
              <p>Предобучение учит продолжать текст. Чтобы модель следовала просьбе, её дополнительно обучают на парах «инструкция → хороший ответ» и на человеческих предпочтениях. Это меняет поведение, но не превращает вероятностную генерацию в безошибочную базу фактов.</p>
              <div class="quiz" data-quiz data-answer="embedding">
                <p class="kicker">Короткий ответ</p><h3>Как называется числовое векторное представление токена?</h3>
                <div class="quiz-options"><label class="quiz-option"><input type="text" name="q-embed" placeholder="Введите термин"><span></span></label></div>
                <div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Верно: embedding, по-русски — эмбеддинг."></span></div>
              </div>
              <div class="takeaway"><strong>Ментальная модель</strong>LLM не достаёт готовое предложение из памяти. Она шаг за шагом строит продолжение, каждый раз опираясь на контекст и уже созданные токены.</div>
            </section>
            <div class="source-box"><p>По материалам видео о роли LLM в NLP и обучении языковых моделей: <a href="https://stepik.org/lesson/1786035/step/8?unit=1811709" target="_blank" rel="noreferrer">Stepik, шаги 8–9</a>.</p></div>
          `
        }
      ]
    },
    {
      number: "02",
      title: "Работа с моделями",
      lessons: [
        {
          id: "preprocessing",
          title: "Предобработка и токенизация",
          deck: "Почему правила классического NLP могут навредить трансформеру и какие поля действительно нужны модели.",
          time: "22 мин",
          level: "Практика",
          body: `
            <section class="lesson-section"><span class="section-number">01</span><h2>Очистка зависит от <em>типа модели</em></h2>
              <p class="lead">Для Bag of Words и TF‑IDF часто удаляли пунктуацию, приводили регистр и выкидывали стоп-слова. Для предобученного Transformer это не универсальное правило.</p>
              <div class="card-grid">
                <article class="card"><h3>Классические признаки</h3><p>Слова считаются почти независимо. Нормализация уменьшает шум и размер словаря.</p></article>
                <article class="card accent"><h3>Transformer</h3><p>Регистр, «!!!», числа и порядок могут нести смысл. Избыточная очистка уничтожает сигнал, который модель умеет использовать.</p></article>
              </div>
              <div class="example"><p class="kicker">Тональность</p><p><strong>«WOW!!!»</strong> и <strong>«wow»</strong> похожи по слову, но различаются по эмоциональной силе. Удаление регистра и пунктуации может сделать пример беднее.</p></div>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>Что возвращает токенизатор</h2>
              <div class="card-grid">
                <article class="card"><h3><code>input_ids</code></h3><p>Номера токенов в словаре именно этой модели.</p></article>
                <article class="card"><h3><code>attention_mask</code></h3><p>Показывает, где настоящие токены, а где добавленный padding.</p></article>
                <article class="card"><h3>Padding</h3><p>Выравнивает длины примеров в батче специальными токенами.</p></article>
                <article class="card"><h3>Truncation</h3><p>Обрезает текст до максимальной длины, которую принимает модель.</p></article>
              </div>
              <div class="plain"><p class="kicker">Критическая совместимость</p><p>Токенизатор должен соответствовать модели. Один и тот же ID у двух словарей может обозначать разные токены — словно открыть книгу по указателю от другой книги.</p></div>
            </section>
            <section class="lesson-section"><span class="section-number">03</span><h2>Специальные токены</h2>
              <p><code>[CLS]</code> может служить суммарным представлением последовательности для классификации, <code>[SEP]</code> разделяет части, <code>[PAD]</code> выравнивает длину. Конкретные обозначения зависят от семейства модели.</p>
              <div class="quiz" data-quiz data-answer="mask">
                <p class="kicker">Проверка</p><h3>Что случится, если передать padding, но забыть attention mask?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="radio" name="q-mask" value="speed"><span>Модель только станет медленнее</span></label>
                  <label class="quiz-option"><input type="radio" name="q-mask" value="mask"><span>Модель может учитывать padding как значимые токены</span></label>
                  <label class="quiz-option"><input type="radio" name="q-mask" value="vocab"><span>Изменится словарь токенизатора</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Mask сообщает, какие позиции нужно игнорировать; без неё padding может влиять на представление."></span></div>
              </div>
            </section>
            <div class="source-box"><p>По уроку <a href="https://stepik.org/lesson/1827829/step/1?unit=1853839" target="_blank" rel="noreferrer">3.1 «Подготовка к работе с LLM»</a>.</p></div>
          `
        },
        {
          id: "architectures",
          title: "Encoder, decoder и выбор архитектуры",
          deck: "Не «какая модель лучше», а какой поток информации соответствует задаче.",
          time: "20 мин",
          level: "Основа",
          body: `
            <section class="lesson-section"><span class="section-number">01</span><h2>Три семейства <em>Transformer-моделей</em></h2>
              <div class="card-grid">
                <article class="card"><p class="kicker">Понимание</p><h3>Encoder-only</h3><p>BERT-подобные модели видят контекст с обеих сторон. Сильны в классификации, NER, поисковых эмбеддингах и сравнении текстов.</p></article>
                <article class="card accent"><p class="kicker">Генерация</p><h3>Decoder-only</h3><p>GPT, Llama и Mistral предсказывают продолжение слева направо. Удобны для диалога, кода и открытой генерации.</p></article>
                <article class="card wide"><p class="kicker">Преобразование</p><h3>Encoder–decoder</h3><p>T5 и BART сначала кодируют вход, затем создают выход. Естественный выбор для перевода, суммаризации и строгой схемы «последовательность → последовательность».</p></article>
              </div>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>Как выбирать без списка брендов</h2>
              <div class="example"><div class="example-steps">
                <div class="example-step"><span>1</span><p>Нужна одна метка или вектор для готового текста? Начните с encoder.</p></div>
                <div class="example-step"><span>2</span><p>Нужно свободно продолжать, рассуждать или писать код? Рассмотрите decoder.</p></div>
                <div class="example-step"><span>3</span><p>Нужно преобразовать один текст в другой с контролируемым выходом? Encoder–decoder часто удобен.</p></div>
              </div></div>
              <p>После архитектуры проверяют язык, размер контекста, лицензию, требования к памяти, качество на вашем наборе и стоимость эксплуатации.</p>
              <div class="quiz" data-quiz data-answer="encoder">
                <h3>Нужно получать качественный вектор документа для смыслового поиска. С чего логичнее начать?</h3>
                <div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-arch" value="encoder"><span>С encoder-модели, обученной на эмбеддинги</span></label><label class="quiz-option"><input type="radio" name="q-arch" value="decoder"><span>С любой самой большой decoder-модели</span></label></div>
                <div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Для поиска нужен стабильный вектор. Специализированный encoder обычно эффективнее и дешевле генеративной LLM."></span></div>
              </div>
            </section>
            <div class="source-box"><p>По уроку <a href="https://stepik.org/lesson/1825737/step/1?unit=1851635" target="_blank" rel="noreferrer">3.2 «Use-cases архитектур трансформеров»</a>.</p></div>
          `
        },
        {
          id: "huggingface",
          title: "Hugging Face: от модели к результату",
          deck: "Разберём удобный pipeline и то, что скрывается под одной строкой кода.",
          time: "24 мин",
          level: "Код",
          body: `
            <section class="lesson-section"><span class="section-number">01</span><h2>Hub, библиотека и <em>pipeline</em></h2>
              <p>Hugging Face Hub хранит модели, токенизаторы, датасеты и карточки с условиями использования. Библиотека Transformers загружает их в Python, а <code>pipeline</code> связывает типичные шаги в готовый конвейер.</p>
              <div class="formula">text → tokenizer → tensors → model → logits → post-processing → label</div>
              <div class="plain"><p class="kicker">Что важно проверить</p><p>Задачу модели, язык данных, лицензию, размер, максимальный контекст и пример правильной предобработки. Популярность модели не гарантирует пригодность для вашей задачи.</p></div>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>Одна строка и явные этапы</h2>
              <div class="example"><p class="kicker">Быстрый прототип</p><pre class="formula">from transformers import pipeline
clf = pipeline("sentiment-analysis")
clf("The course is clear and useful")</pre></div>
              <p>Pipeline удобен для проверки идеи. В production часто нужны явные tokenizer/model, управление устройством, батчами, длиной, кэшем и форматом выхода.</p>
              <details><summary>Что такое logits?</summary><div>Это необработанные числовые оценки вариантов ответа. Для классификации softmax превращает их в вероятности, после чего выбирается метка.</div></details>
              <div class="takeaway"><strong>Практическое правило</strong>Сначала соберите маленький работающий baseline через pipeline, затем раскройте конвейер и оптимизируйте только измеренную проблему.</div>
            </section>
            <div class="source-box"><p>По уроку <a href="https://stepik.org/lesson/1786038/step/1?unit=1811712" target="_blank" rel="noreferrer">3.3 о Hugging Face</a>. Практика курса: <a href="https://colab.research.google.com/drive/1gH_q-TwEQEh-d7ntlSMCo1Vo0eY5TOFd?usp=sharing" target="_blank" rel="noreferrer">Colab</a>.</p></div>
          `
        },
        {
          id: "finetuning",
          title: "Fine-tuning без магии",
          deck: "Когда промпта недостаточно, как меняются веса и почему дообучение не добавляет надёжную базу знаний.",
          time: "26 мин",
          level: "Практика",
          body: `
            <section class="lesson-section"><span class="section-number">01</span><h2>Предобучение даёт язык, fine-tuning — <em>специализацию</em></h2>
              <p class="lead">Предобученная модель уже знает общие закономерности. На небольшом целевом наборе её веса корректируют под конкретную задачу: классификацию, стиль ответа или формат.</p>
              <div class="card-grid"><article class="card"><h3>Хороший повод</h3><p>Нужное поведение должно повторяться стабильно на большом потоке примеров.</p></article><article class="card"><h3>Плохой повод</h3><p>Нужно подставлять часто меняющиеся факты. Здесь лучше RAG или API.</p></article></div>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>Цикл обучения</h2>
              <div class="diagram"><div class="flow"><div class="flow-node"><strong>Данные</strong><span>примеры + ответы</span></div><div class="flow-node"><strong>Forward</strong><span>прогноз модели</span></div><div class="flow-node"><strong>Loss</strong><span>величина ошибки</span></div><div class="flow-node"><strong>Backward</strong><span>градиенты</span></div><div class="flow-node"><strong>Update</strong><span>новые веса</span></div></div></div>
              <p><strong>Epoch</strong> — один полный проход по обучающим данным. <strong>Batch</strong> — небольшая порция примеров. <strong>Learning rate</strong> — размер шага изменения весов. Слишком большой шаг разрушает знания, слишком маленький делает обучение медленным.</p>
              <div class="plain"><p class="kicker">LoRA</p><p>Вместо изменения всех параметров обучаются небольшие добавочные матрицы. Это снижает расход памяти и упрощает хранение нескольких специализаций, но не отменяет требования к качественным данным и проверке.</p></div>
            </section>
            <section class="lesson-section"><span class="section-number">03</span><h2>Как не обмануть себя метрикой</h2>
              <p>Разделяйте train, validation и test. Если много раз подбирать решение по test, он перестаёт быть независимой проверкой. При несбалансированных классах одной accuracy недостаточно: смотрите precision, recall и F1.</p>
              <div class="quiz" data-quiz data-answer="rag"><h3>Цены компании меняются каждый день. Что лучше добавит актуальные значения в ответ?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-ft" value="finetune"><span>Ежедневно полностью дообучать модель</span></label><label class="quiz-option"><input type="radio" name="q-ft" value="rag"><span>Получать цены из базы через RAG или инструмент</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Меняющиеся факты лучше читать из актуального источника; fine-tuning закрепляет поведение, а не служит удобной базой данных."></span></div></div>
            </section>
            <div class="source-box"><p>По урокам <a href="https://stepik.org/lesson/2423788/step/1?unit=2460578" target="_blank" rel="noreferrer">3.4</a> и <a href="https://stepik.org/lesson/1834618/step/1?unit=1859720" target="_blank" rel="noreferrer">3.5</a>.</p></div>
          `
        }
      ]
    },
    {
      number: "03",
      title: "Attention и RAG",
      lessons: [
        {
          id: "attention",
          title: "Attention: на что смотрит модель",
          deck: "Разберём механизм как управляемое смешивание информации — сначала интуитивно, затем через Q, K и V.",
          time: "32 мин",
          level: "Механика",
          body: `
            <section class="lesson-section"><span class="section-number">01</span><h2>Проблема: одно слово зависит от <em>других</em></h2>
              <p class="lead">Чтобы понять «она» в предложении, недостаточно самого токена. Нужны связи с контекстом. Attention позволяет каждому токену собрать полезную информацию от остальных.</p>
              <div class="example"><p class="kicker">Интуиция</p><p>В «Мария убрала ноутбук в сумку, потому что <strong>она</strong> была тяжёлой» модель сравнивает связи. «Она» сильнее связано с «сумкой» или «Марией» в зависимости от всего контекста.</p></div>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>Query, Key, Value — <em>три роли</em></h2>
              <div class="card-grid">
                <article class="card"><h3>Query (Q)</h3><p>Что текущему токену нужно найти в контексте.</p></article>
                <article class="card"><h3>Key (K)</h3><p>По каким признакам другой токен предлагает себя для сравнения.</p></article>
                <article class="card wide accent"><h3>Value (V)</h3><p>Какую информацию другой токен передаст, если окажется важным.</p></article>
              </div>
              <div class="formula">Attention(Q,K,V) = softmax(QKᵀ / √d) · V</div>
              <p>Скалярные оценки Q·K показывают совместимость. Деление на √d стабилизирует масштаб. Softmax превращает оценки в веса с суммой 1. Затем значения V смешиваются с этими весами.</p>
              <div class="plain"><p class="kicker">По-простому</p><p>Query — вопрос, Key — подпись на папке, Value — содержимое папки. Модель сравнивает вопрос с подписями и берёт больше содержимого из наиболее подходящих папок.</p></div>
            </section>
            <section class="lesson-section"><span class="section-number">03</span><h2>Multi-head и маска</h2>
              <p>Несколько голов attention параллельно учатся замечать разные типы связей: синтаксис, ссылки на объекты, дальний контекст. В decoder причинная маска запрещает смотреть в будущие токены — иначе обучение подсматривало бы ответ.</p>
              <div class="quiz" data-quiz data-answer="weights"><h3>Что является непосредственным результатом softmax над оценками QKᵀ?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-att" value="tokens"><span>Новые токены</span></label><label class="quiz-option"><input type="radio" name="q-att" value="weights"><span>Нормированные веса важности</span></label><label class="quiz-option"><input type="radio" name="q-att" value="loss"><span>Ошибка обучения</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Softmax превращает оценки совместимости в распределение весов; ими смешиваются Value-векторы."></span></div></div>
            </section>
            <div class="source-box"><p>По уроку <a href="https://stepik.org/lesson/1786156/step/1?unit=1811830" target="_blank" rel="noreferrer">4.1 «Recap и погружение в attention»</a>. В объяснение включено содержание 57‑минутного видео после автоматической расшифровки и смысловой проверки.</p></div>
          `
        },
        {
          id: "rag-basics",
          title: "RAG: дать модели внешнюю память",
          deck: "Как поиск по смыслу уменьшает галлюцинации и позволяет отвечать по закрытым или новым данным.",
          time: "24 мин",
          level: "Архитектура",
          body: `
            <section class="lesson-section"><span class="section-number">01</span><h2>Проблема знаний <em>внутри весов</em></h2>
              <p>У модели есть дата обучения, ограниченная точность и нет автоматического доступа к вашим документам. Если попросить ответить уверенно, она может заполнить пробел правдоподобным вымыслом — это называют галлюцинацией.</p>
              <div class="plain"><p class="kicker">RAG</p><p><strong>Retrieval-Augmented Generation</strong> сначала ищет подходящие фрагменты во внешнем источнике, затем передаёт их LLM вместе с вопросом. Модель формулирует ответ, опираясь на найденный контекст.</p></div>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>Эмбеддинги и <em>смысловой поиск</em></h2>
              <p>Embedding-модель превращает вопрос и документы в векторы. Похожие по смыслу тексты оказываются близко, даже если слова не совпадают буквально.</p>
              <div class="example"><p class="kicker">Почему не только ключевые слова</p><p>Запрос «как вернуть оплату» должен найти инструкцию «процедура возмещения средств». Совпадений слов почти нет, но смысл близок.</p></div>
              <div class="formula">similarity(q, d) = cosine(embedding(q), embedding(d))</div>
            </section>
            <section class="lesson-section"><span class="section-number">03</span><h2>Что RAG исправляет, а что нет</h2>
              <div class="card-grid"><article class="card"><h3>Помогает</h3><p>Новые факты, закрытые документы, ссылки на источник, обновление без переобучения.</p></article><article class="card"><h3>Не гарантирует</h3><p>Идеальный поиск, правильную интерпретацию, отсутствие конфликтов и полную безопасность.</p></article></div>
              <div class="quiz" data-quiz data-answer="retrieve,generate"><h3>Какие два этапа входят в базовый RAG?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" name="q-rag" value="retrieve"><span>Поиск релевантного контекста</span></label><label class="quiz-option"><input type="checkbox" name="q-rag" value="generate"><span>Генерация ответа по контексту</span></label><label class="quiz-option"><input type="checkbox" name="q-rag" value="train"><span>Обязательное изменение весов LLM</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Название буквально складывается из Retrieval + Augmented Generation. Переобучение не обязательно."></span></div></div>
            </section>
            <div class="source-box"><p>По уроку <a href="https://stepik.org/lesson/1786157/step/1?unit=1811831" target="_blank" rel="noreferrer">4.2 «RAG»</a>.</p></div>
          `
        },
        {
          id: "rag-pipeline",
          title: "Полный RAG-пайплайн",
          deck: "Chunking, индексация, гибридный поиск, reranking, контекст и генерация — с точками отказа на каждом шаге.",
          time: "34 мин",
          level: "Практика",
          body: `
            <section class="lesson-section"><span class="section-number">01</span><h2>Два процесса: подготовка и <em>ответ</em></h2>
              <h3>Индексация</h3><div class="formula">документы → очистка → chunks → embeddings → vector store</div>
              <h3>Запрос</h3><div class="formula">вопрос → embedding → retrieval → reranking → контекст → LLM → ответ + источники</div>
              <p><strong>Chunk</strong> — фрагмент документа. Слишком большой содержит шум, слишком маленький теряет смысл. Перекрытие помогает не разрезать важную мысль на границе.</p>
              <div class="card-grid"><article class="card"><h3>Фиксированный размер</h3><p>Простой baseline: например, 250 токенов с перекрытием. Быстро внедряется, но может разрезать смысловой блок.</p></article><article class="card"><h3>По структуре</h3><p>Разделение по заголовкам, абзацам или таблицам сохраняет естественные границы документа.</p></article><article class="card wide"><h3>Parent–child</h3><p>Ищем по небольшому точному фрагменту, а в контекст отдаём его более широкий родительский раздел. Так поиск остаётся точным, а модель получает достаточно смысла.</p></article></div>
              <p>Каждый chunk полезно хранить вместе с метаданными: исходным документом, страницей, разделом, датой и правами доступа. Они нужны для фильтров, ссылок на источник и безопасного обновления индекса.</p>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>Гибридный поиск и reranking</h2>
              <div class="card-grid"><article class="card"><h3>Dense search</h3><p>Векторный поиск ловит перефразированный смысл.</p></article><article class="card"><h3>Sparse search</h3><p>BM25 хорошо ловит точные термины, коды, артикулы и редкие имена.</p></article><article class="card wide accent"><h3>Hybrid</h3><p>Объединяет кандидатов обоих методов, а reranker внимательнее сортирует небольшой список.</p></article></div>
              <div class="plain"><p class="kicker">Почему два этапа</p><p>Быстрый retriever ищет по миллионам фрагментов. Более дорогой reranker сравнивает вопрос лишь с десятками кандидатов — так качество растёт без неприемлемой задержки.</p></div>
              <p>В рабочей системе запрос может идти сразу в несколько источников: векторную базу документов, обычный поиск и граф знаний. Затем результаты объединяются и заново ранжируются. Граф особенно полезен, когда ответ зависит не только от похожего текста, но и от связей между сущностями.</p>
            </section>
            <section class="lesson-section"><span class="section-number">03</span><h2>Оценивать отдельно поиск и ответ</h2>
              <ul><li><strong>Recall@k:</strong> попал ли нужный документ в первые k результатов.</li><li><strong>Precision@k:</strong> какая доля найденных фрагментов действительно полезна.</li><li><strong>Faithfulness:</strong> поддерживается ли ответ данным контекстом.</li><li><strong>Answer relevance:</strong> отвечает ли текст на вопрос пользователя.</li></ul>
              <div class="example"><p class="kicker">Диагностика</p><p>Если нужного документа нет в top‑k, генератор не виноват. Если документ найден, но ответ противоречит ему — проблема уже в промпте, контексте или LLM.</p></div>
              <div class="takeaway"><strong>Главный принцип отладки</strong>Не измеряйте RAG одной общей оценкой. Разделите retrieval, формирование контекста и generation.</div>
            </section>
            <div class="source-box"><p>По урокам <a href="https://stepik.org/lesson/1786157/step/2?unit=1811831" target="_blank" rel="noreferrer">4.2</a> и <a href="https://stepik.org/lesson/2427546/step/1?unit=2464379" target="_blank" rel="noreferrer">4.3 «Погружение в RAG и практика»</a>. В урок включена смысловая редактура 28‑минутной видеолекции: chunking с overlap, структурное разбиение, метаданные, reranking и несколько источников контекста. Практический <a href="https://colab.research.google.com/drive/1B_u6Qo69ItutLqLjBbKTeNt5A8Y9WT13?usp=sharing" target="_blank" rel="noreferrer">ноутбук</a>.</p></div>
          `
        }
      ]
    },
    {
      number: "04",
      title: "RAG-система на практике",
      lessons: [
        {
          id: "rag-system",
          title: "Собираем LLM + RAG",
          deck: "От юридического поиска до ответа с доказательством: проектируем систему, а не эффектную демонстрацию.",
          time: "30 мин",
          level: "Проект",
          body: `
            <section class="lesson-section"><span class="section-number">01</span><h2>Сначала цель и <em>цена ошибки</em></h2>
              <p>В юридическом поиске правильный документ должен попасть в первые результаты. Если retrieval ошибся, красивый ответ LLM лишь маскирует проблему. Поэтому итоговое задание курса отдельно фокусируется на Recall@5.</p>
              <div class="example"><p class="kicker">Постановка задачи</p><p>Для каждого юридического вопроса вернуть нужный судебный акт в top‑5. После этого можно добавить генерацию краткого ответа, который явно опирается на найденный акт.</p></div>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>Практический контур</h2>
              <div class="diagram"><div class="flow"><div class="flow-node"><strong>Corpus</strong><span>судебные акты</span></div><div class="flow-node"><strong>Index</strong><span>chunks + metadata</span></div><div class="flow-node"><strong>Retrieve</strong><span>top‑k документов</span></div><div class="flow-node"><strong>Generate</strong><span>ответ по контексту</span></div><div class="flow-node"><strong>Verify</strong><span>ссылка и проверка</span></div></div></div>
              <p>Метаданные — название документа, дата, раздел и ссылка — нужны не меньше текста: они позволяют фильтровать результаты, показывать происхождение и обновлять индекс.</p>
            </section>
            <section class="lesson-section"><span class="section-number">03</span><h2>Открытая или API-модель?</h2>
              <div class="card-grid"><article class="card"><h3>API</h3><p>Быстрый старт и сильное качество, но цена запроса, ограничения данных и зависимость от провайдера.</p></article><article class="card"><h3>Локальная модель</h3><p>Контроль и приватность, но нужны вычисления, обслуживание, квантизация и собственные тесты.</p></article></div>
              <div class="quiz" data-quiz data-answer="retrieval"><h3>Нужный акт не попал в top‑5, а LLM дала неверный ответ. Какой слой проверять первым?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-layer" value="prompt"><span>Только формулировку ответа</span></label><label class="quiz-option"><input type="radio" name="q-layer" value="retrieval"><span>Retrieval и индекс</span></label><label class="quiz-option"><input type="radio" name="q-layer" value="theme"><span>Интерфейс</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Без нужного документа генератор не получает основание. Сначала чинят retrieval."></span></div></div>
            </section>
            <div class="source-box"><p>По урокам <a href="https://stepik.org/lesson/2432426/step/1?unit=2469579" target="_blank" rel="noreferrer">5.1</a> и <a href="https://stepik.org/lesson/1786158/step/1?unit=1811832" target="_blank" rel="noreferrer">5.2</a>. Базовый <a href="https://colab.research.google.com/drive/19ax-Awwl-Z7ExJoG9RgmmmwZOv_HeEQ7?usp=sharing" target="_blank" rel="noreferrer">ноутбук соревнования</a>.</p></div>
          `
        },
        {
          id: "rag-evaluation",
          title: "Тестирование RAG",
          deck: "Как построить набор вопросов, выбрать метрики и не перепутать правдоподобный ответ с правильным.",
          time: "23 мин",
          level: "Качество",
          body: `
            <section class="lesson-section"><span class="section-number">01</span><h2>Тестовый набор — это <em>контракт</em></h2>
              <p>Соберите реальные вопросы, правильные документы, допустимый ответ и опасные ошибки. Добавьте простые, сложные, неоднозначные и вопросы, на которые система должна честно сказать «не найдено».</p>
              <div class="card-grid"><article class="card"><h3>Retrieval</h3><p>Recall@k, MRR, nDCG и ручная релевантность.</p></article><article class="card"><h3>Generation</h3><p>Корректность, полнота, релевантность и опора на контекст.</p></article><article class="card wide"><h3>Система</h3><p>Задержка, стоимость, отказоустойчивость, права доступа и доля безопасных отказов.</p></article></div>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>LLM-as-a-judge — полезно, но не достаточно</h2>
              <p>Модель-судья ускоряет массовую оценку, но сама может быть предвзятой и нестабильной. Калибруйте её на ручной разметке, фиксируйте критерии и периодически проверяйте расхождения.</p>
              <div class="plain"><p class="kicker">Защита от самообмана</p><p>Не показывайте судье лишние сигналы вроде названия модели-кандидата. Перемешивайте порядок вариантов и измеряйте согласие с людьми.</p></div>
              <div class="takeaway"><strong>Готовность к запуску</strong>Средняя метрика недостаточна. Нужны границы: где система работает, где отказывает и где обязательно вмешательство человека.</div>
            </section>
          `
        }
      ]
    },
    {
      number: "05",
      title: "ИИ-агенты",
      lessons: [
        {
          id: "agents",
          title: "От чат-бота к агенту",
          deck: "Агент не только формулирует ответ: он выбирает действие, использует инструмент, наблюдает результат и продолжает цикл.",
          time: "28 мин",
          level: "Архитектура",
          body: `
            <section class="lesson-section"><span class="section-number">01</span><h2>Ассистент отвечает, агент <em>действует</em></h2>
              <p class="lead">ИИ-агент — программа, которая получает цель, оценивает состояние, планирует следующий шаг, вызывает доступные инструменты и использует результат для продолжения.</p>
              <div class="plain"><p class="kicker">Как базовая LLM стала чат-ассистентом</p><p><strong>Предобучение</strong> учит продолжать любой текст. <strong>SFT</strong> показывает образцы «запрос → хороший ответ» и закрепляет формат помощника. <strong>Обучение по человеческим предпочтениям</strong> делает одни варианты поведения вероятнее других. Лишь после этого поверх модели строят агентный цикл с инструментами.</p></div>
              <div class="card-grid"><article class="card"><h3>Полезность не равна истине</h3><p>Человеческий feedback учит ответам, которые люди предпочитают. Это не автоматическая проверка каждого факта.</p></article><article class="card"><h3>Риск поддакивания</h3><p>Ассистент может слишком охотно соглашаться. В важных задачах прямо просите искать контраргументы и подтверждать выводы источниками.</p></article></div>
              <div class="diagram"><div class="flow"><div class="flow-node"><strong>Цель</strong><span>что достичь</span></div><div class="flow-node"><strong>План</strong><span>следующий шаг</span></div><div class="flow-node"><strong>Tool</strong><span>API, поиск, код</span></div><div class="flow-node"><strong>Observation</strong><span>что получилось</span></div><div class="flow-node"><strong>Stop / loop</strong><span>завершить или повторить</span></div></div></div>
              <div class="example"><p class="kicker">Запись к врачу</p><p>Чат-бот перечисляет клиники. Агент запрашивает свободные слоты, сверяет календарь, просит подтверждение перед бронированием и создаёт запись через API.</p></div>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>Из чего состоит агент</h2>
              <div class="card-grid"><article class="card"><h3>Модель</h3><p>Интерпретирует цель и выбирает следующий шаг.</p></article><article class="card"><h3>Инструменты</h3><p>Дают доступ к поиску, базам, календарю, коду и внешним действиям.</p></article><article class="card"><h3>Состояние</h3><p>Хранит контекст задачи, промежуточные результаты и ограничения.</p></article><article class="card"><h3>Оркестратор</h3><p>Управляет циклом, лимитами, повторами и остановкой.</p></article></div>
              <div class="plain"><p class="kicker">Аналогия с компьютером</p><p><strong>LLM похожа на процессор</strong>, текущий контекст — на оперативную память, долговременная память о пользователе — на диск, а tools — на драйверы для взаимодействия со средой. Аналогия не буквальная, но хорошо показывает, почему одна модель ещё не является всей агентной системой.</p></div>
              <p><strong>Контекстная гигиена</strong> — управление рабочей памятью агента. Старые шаги можно обрезать, суммировать или возвращать по RAG. Если без разбора хранить всю историю, важная инструкция утонет в шуме, расходы вырастут, а поведение станет менее стабильным.</p>
              <details><summary>Рабочая и долговременная память — в чём разница?</summary><div>Рабочая память нужна для текущей траектории: что уже попробовали и что получили. Долговременная хранит устойчивые факты между задачами — например, настройки пользователя. Обе памяти внешние по отношению к весам модели.</div></details>
              <div class="plain"><p class="kicker">Workflow или агент?</p><p>В <strong>workflow</strong> ветки и порядок шагов заранее заданы кодом — даже если внутри пять вызовов разных LLM. В <strong>агенте</strong> модель сама решает, какой инструмент вызвать и как перестроить дальнейший путь по наблюдаемому результату. Начинайте с workflow; добавляйте агентную свободу только там, где полезный путь действительно нельзя разумно описать заранее.</p></div>
              <p>Совокупность управления контекстом, памятью, инструментами, ограничениями и циклом иногда называют <strong>agent harness</strong> — «обвязкой» вокруг модели. Именно эта обвязка чаще определяет надёжность продукта.</p>
            </section>
            <section class="lesson-section"><span class="section-number">03</span><h2>Мультиагентная система</h2>
              <p>Несколько агентов могут разделять роли: исследователь собирает сведения, критик проверяет, исполнитель готовит результат. Это полезно лишь когда разделение улучшает проверяемость; иначе оно добавляет стоимость и новые точки отказа.</p>
              <div class="quiz" data-quiz data-answer="act"><h3>Какой признак лучше всего отличает агента от обычного чат-бота?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-agent" value="long"><span>Очень длинный ответ</span></label><label class="quiz-option"><input type="radio" name="q-agent" value="act"><span>Выбор и выполнение действий через инструменты</span></label><label class="quiz-option"><input type="radio" name="q-agent" value="large"><span>Большое число параметров</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Агент действует в среде и адаптирует следующий шаг по наблюдаемому результату."></span></div></div>
            </section>
            <div class="source-box"><p>По уроку <a href="https://stepik.org/lesson/2440247/step/1?unit=2477492" target="_blank" rel="noreferrer">6.1 «Введение в агентов»</a>. В мост от LLM к агенту включена смысловая редактура 21‑минутного видео о предобучении, SFT, feedback от человека и ограничениях такого выравнивания.</p></div>
          `
        },
        {
          id: "agent-quality",
          title: "Надёжность, guardrails и MCP",
          deck: "Как оценивать автономную систему, ограничивать риск и стандартизировать подключение инструментов.",
          time: "25 мин",
          level: "Качество",
          body: `
            <section class="lesson-section"><span class="section-number">01</span><h2>Качество агента шире <em>качества ответа</em></h2>
              <ul><li><strong>Task success:</strong> достигнута ли цель целиком.</li><li><strong>Tool correctness:</strong> выбран ли правильный инструмент и верны ли аргументы.</li><li><strong>Efficiency:</strong> сколько шагов, времени и денег потребовалось.</li><li><strong>Recovery:</strong> умеет ли агент заметить ошибку и сменить путь.</li><li><strong>Safety:</strong> соблюдены ли права доступа и подтверждения.</li></ul>
              <div class="example"><p class="kicker">Почему финальный ответ недостаточен</p><p>Агент мог случайно получить правильную сумму, дважды списав и затем вернув деньги. Поэтому проверяют не только результат, но и траекторию действий.</p></div>
              <div class="plain"><p class="kicker">Два уровня проверки</p><p>Отдельно тестируйте способность самой LLM решать подзадачи и отдельно — весь harness: промпты, память, маршрутизацию, инструменты и ограничения. Замена «сильной» модели не спасёт ошибочную схему вызова инструмента.</p></div>
              <p>Соберите устойчивый regression-набор из запросов доменных экспертов и обезличенных production-логов. После каждого изменения промпта, модели или tool-схемы прогоняйте один и тот же набор — иначе невозможно понять, действительно ли система стала лучше.</p>
              <details><summary>Почему человеческая оценка тоже ошибается?</summary><div>Люди устают, расходятся во мнениях и могут завысить оценку красиво оформленного, но неверного ответа. Делите критерии на атомарные вопросы, используйте несколько оценщиков и измеряйте согласие. Для узкой области нужны доменные эксперты.</div></details>
              <details><summary>Когда полезен LLM-as-a-judge?</summary><div>Сначала человек размечает эталонную выборку. Затем промпт модели-судьи калибруют так, чтобы её оценки воспроизводили человеческие критерии. Судья ускоряет регрессионные проверки, но его нужно регулярно сверять с людьми и нельзя считать источником абсолютной истины.</div></details>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>Guardrails — границы поведения</h2>
              <p>Guardrails проверяют вход, план, вызовы инструментов и выход. Они могут блокировать опасные параметры, скрывать персональные данные, ограничивать сумму операции и требовать подтверждение человека.</p>
              <div class="card-grid"><article class="card"><p class="kicker">На входе</p><h3>До модели</h3><p>Персональные данные, prompt injection, запрещённая тема, превышение прав и подозрительные параметры.</p></article><article class="card"><p class="kicker">На выходе</p><h3>Перед пользователем</h3><p>Утечка закрытых сведений, неподтверждённый факт, опасное действие или нарушение формата.</p></article></div>
              <div class="plain"><p class="kicker">Важно</p><p>Промпт «не делай ничего опасного» — не надёжная граница. Критические ограничения должны выполняться кодом и правами доступа вне модели.</p></div>
            </section>
            <section class="lesson-section"><span class="section-number">03</span><h2>MCP — общий язык подключения контекста</h2>
              <p>Model Context Protocol стандартизирует, как приложение предоставляет модели инструменты и источники данных. Он уменьшает количество уникальных интеграций, но сам по себе не решает авторизацию, безопасность и качество инструмента.</p>
              <div class="quiz" data-quiz data-answer="control"><h3>Какова основная роль guardrails?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-guard" value="speed"><span>Ускорить вычисления</span></label><label class="quiz-option"><input type="radio" name="q-guard" value="control"><span>Ограничивать и контролировать поведение по правилам</span></label><label class="quiz-option"><input type="radio" name="q-guard" value="train"><span>Переобучать модель после каждого запроса</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Guardrails обеспечивают соблюдение правил и требований безопасности на разных этапах работы."></span></div></div>
            </section>
            <div class="source-box"><p>По уроку <a href="https://stepik.org/lesson/2440334/step/1?unit=2477579" target="_blank" rel="noreferrer">6.2 «Оценка качества агентов»</a>. В урок встроена смысловая редактура 15‑минутной лекции: отдельные evals модели и harness, regression-набор, ограничения человеческой разметки, guardrails на входе и выходе, калибровка LLM-as-a-judge.</p></div>
          `
        },
        {
          id: "agent-practice",
          title: "Проектируем собственного агента",
          deck: "Безопасный минимальный проект: одна цель, два инструмента, наблюдаемая траектория и ясное условие остановки.",
          time: "30 мин",
          level: "Проект",
          body: `
            <section class="lesson-section"><span class="section-number">01</span><h2>Начните с узкой <em>проверяемой задачи</em></h2>
              <p>Например: получить вопрос о документе, найти нужный фрагмент и сохранить черновик ответа. Не начинайте с «универсального цифрового сотрудника» — невозможно понять, что именно сломалось.</p>
              <div class="card-grid"><article class="card"><h3>Цель</h3><p>Описана наблюдаемым результатом.</p></article><article class="card"><h3>Tools</h3><p>Минимальный набор с чёткими схемами аргументов.</p></article><article class="card"><h3>Stop</h3><p>Условие завершения и лимит шагов.</p></article><article class="card"><h3>Trace</h3><p>Журнал решений, вызовов и ответов инструментов.</p></article></div>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>Каркас цикла</h2>
              <pre class="formula">state = {goal, history, limits}
while not done(state):
    action = model.choose_action(state, tools)
    checked = guardrails.validate(action)
    observation = tools.call(checked)
    state = update(state, observation)
return verified_result(state)</pre>
              <p>В реальном коде добавляются тайм-ауты, повторяемость операций, разграничение доступа, обработка ошибок и подтверждение для необратимых действий.</p>
              <div class="plain"><p class="kicker">Idempotency</p><p>Повтор одного и того же запроса не должен дважды списывать деньги или создавать две встречи. Инструментам для действий нужен идентификатор операции и защита от повторов.</p></div>
            </section>
            <section class="lesson-section"><span class="section-number">03</span><h2>Финальная проверка</h2>
              <ol><li>Прогоните обычные сценарии.</li><li>Сломайте один инструмент и проверьте восстановление.</li><li>Дайте противоречивые данные.</li><li>Попробуйте заставить агента выйти за разрешения.</li><li>Измерьте успех, шаги, задержку и стоимость.</li></ol>
              <div class="takeaway"><strong>Вы закончили маршрут</strong>LLM формулирует и выбирает, RAG приносит знания, инструменты действуют, guardrails ограничивают, а тесты показывают, можно ли системе доверять.</div>
            </section>
            <div class="source-box"><p>Финальная практика курса: <a href="https://stepik.org/lesson/2440335/step/2?unit=2477580" target="_blank" rel="noreferrer">создание агента в Python</a> и <a href="https://colab.research.google.com/drive/1jCHFqaNWDxrWvJJF5g30qlwmuR1KgPlC?usp=sharing" target="_blank" rel="noreferrer">ноутбук</a>.</p></div>
          `
        }
      ]
    }
  ]
};
