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
          id: "classification-metrics",
          title: "Метрики классификации без самообмана",
          deck: "Accuracy, confusion matrix, precision, recall и F1 — не как набор формул, а как разные способы посчитать цену ошибок.",
          time: "32 мин",
          level: "Качество",
          body: `
            <section class="lesson-section" id="metrics-purpose">
              <span class="section-number">01</span><h2>Метрика отвечает не на вопрос «умная ли модель», а <em>полезна ли она в задаче</em></h2>
              <p class="lead">Ответ модели может звучать убедительно, поэтому впечатление от нескольких примеров — плохой измерительный прибор. Метрика задаёт повторяемое правило: какие ответы считать правильными и какие ошибки для нас особенно дороги.</p>
              <div class="plain"><p class="kicker">Сначала определите задачу</p><p>Для регрессии применяют, например, MAE и RMSE, для сравнения сгенерированного текста — BLEU, ROUGE и смысловые оценки. Здесь мы разбираем <strong>классификацию</strong>: тональность, тему, эмоцию, токсичность или спам.</p></div>
              <div class="takeaway"><strong>Loss и метрика — не одно и то же</strong>Loss нужен оптимизатору во время обучения: он подсказывает, как менять веса. Метрика нужна человеку, чтобы решить, подходит ли результат для реальной цели.</div>
            </section>
            <section class="lesson-section" id="classification-confusion-matrix">
              <span class="section-number">02</span><h2>Confusion matrix: четыре исхода одного <em>решения</em></h2>
              <p>Пусть «положительный» класс — важное событие, которое мы ищем. Например, токсичный комментарий. Тогда каждое предсказание попадает в одну из четырёх ячеек.</p>
              <div class="card-grid">
                <article class="card"><h3>TP — true positive</h3><p>Модель сказала «да», и событие действительно есть. Токсичный комментарий найден.</p></article>
                <article class="card"><h3>TN — true negative</h3><p>Модель сказала «нет», и события действительно нет. Обычный комментарий пропущен правильно.</p></article>
                <article class="card"><h3>FP — false positive</h3><p>Ложная тревога: обычный комментарий ошибочно заблокирован.</p></article>
                <article class="card accent"><h3>FN — false negative</h3><p>Пропуск: токсичный комментарий остался незамеченным.</p></article>
              </div>
              <div class="example"><p class="kicker">Матрица на 100 отзывах</p><p>TP = 40, FN = 10, FP = 20, TN = 30. Эти четыре числа — исходные детали; accuracy, precision и recall просто по-разному их группируют.</p></div>
            </section>
            <section class="lesson-section" id="accuracy-imbalance">
              <span class="section-number">03</span><h2>Accuracy полезна, пока большинство не <em>прячет проблему</em></h2>
              <div class="formula">Accuracy = все правильные ответы / все примеры = (TP + TN) / (TP + TN + FP + FN)</div>
              <p>Если классы примерно сбалансированы и обе ошибки сопоставимы по цене, accuracy понятна и полезна. Но при дисбалансе она может выглядеть отлично у бесполезной модели.</p>
              <div class="example"><p class="kicker">Ловушка 95%</p><p>Есть 950 отрицательных и 50 положительных отзывов. Модель всегда отвечает «отрицательный». Она угадает 950 из 1000 и получит accuracy 95%, но не найдёт ни одного положительного отзыва.</p></div>
              <div class="quiz" data-quiz data-answer="useless">
                <h3>Модель всегда выбирает частый класс и получает accuracy 98%. Что проверить первым?</h3>
                <div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-accuracy-trap" value="perfect"><span>Считать модель почти идеальной</span></label><label class="quiz-option"><input type="radio" name="q-accuracy-trap" value="useless"><span>Распределение классов и ошибки по каждому классу</span></label><label class="quiz-option"><input type="radio" name="q-accuracy-trap" value="tokens"><span>Только среднюю длину текста в токенах</span></label></div>
                <div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Высокая accuracy может быть следствием частого класса. Нужны confusion matrix и отдельные метрики для редкого класса."></span></div>
              </div>
            </section>
            <section class="lesson-section" id="precision-recall-classification">
              <span class="section-number">04</span><h2>Precision и recall считают <em>разные виды доверия</em></h2>
              <div class="card-grid">
                <article class="card"><h3>Precision: можно ли верить тревоге?</h3><div class="formula">Precision = TP / (TP + FP)</div><p>Из всего, что модель назвала положительным, какая доля действительно положительна? Метрика падает из-за ложных срабатываний FP.</p></article>
                <article class="card accent"><h3>Recall: всё ли важное мы нашли?</h3><div class="formula">Recall = TP / (TP + FN)</div><p>Из всех реальных положительных случаев какую долю нашла модель? Метрика падает из-за пропусков FN.</p></article>
              </div>
              <div class="example"><p class="kicker">Считаем руками</p><p>При TP = 40, FP = 20 и FN = 10: precision = 40 / 60 ≈ 0,67; recall = 40 / 50 = 0,80. Тревоги модели верны в 67% случаев, а найти она смогла 80% всех положительных объектов.</p></div>
              <div class="plain"><p class="kicker">Как выбрать приоритет</p><p>Для поиска персональных данных в документах опаснее FN: пропущенный номер карты останется утечкой — нужен высокий recall. Для спам-фильтра, где важное письмо нельзя потерять, особенно опасен FP — нужен высокий precision.</p></div>
              <div class="quiz" data-quiz data-answer="recall">
                <h3>Система ищет утечки имён и номеров карт. Что важнее максимизировать, если все находки затем проверит человек?</h3>
                <div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-pii-metric" value="recall"><span>Recall — не пропустить реальные утечки</span></label><label class="quiz-option"><input type="radio" name="q-pii-metric" value="precision"><span>Только precision — исключить все лишние проверки</span></label><label class="quiz-option"><input type="radio" name="q-pii-metric" value="latency"><span>Только скорость ответа</span></label></div>
                <div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Когда пропуск опаснее ложной тревоги, приоритет у recall. FP допустимы, если их может проверить человек."></span></div>
              </div>
              <div class="quiz" data-quiz data-answer="0.67">
                <h3>TP = 40, FP = 20. Чему примерно равен precision?</h3>
                <div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-precision-calc" value="0.40"><span>0,40</span></label><label class="quiz-option"><input type="radio" name="q-precision-calc" value="0.67"><span>0,67</span></label><label class="quiz-option"><input type="radio" name="q-precision-calc" value="0.80"><span>0,80</span></label></div>
                <div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Precision = TP / (TP + FP) = 40 / 60 ≈ 0,67."></span></div>
              </div>
            </section>
            <section class="lesson-section" id="f1-score">
              <span class="section-number">05</span><h2>F1 требует, чтобы обе метрики были <em>достаточно хороши</em></h2>
              <div class="formula">F1 = 2 × Precision × Recall / (Precision + Recall)</div>
              <p>Это гармоническое среднее. Оно сильнее обычного среднего реагирует на слабое значение: precision 0,95 и recall 0,30 дают F1 примерно 0,46, а не «успокаивающие» 0,63.</p>
              <div class="example"><p class="kicker">Пример</p><p>При precision = 0,8 и recall = 0,6 получаем F1 ≈ 0,686. Метрика удобна, когда важны и ложные тревоги, и пропуски, а выбрать одну сторону нельзя.</p></div>
              <div class="quiz" data-quiz data-answer="harmonic">
                <h3>Почему F1 падает, если recall низкий, даже при высоком precision?</h3>
                <div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-f1-meaning" value="harmonic"><span>Гармоническое среднее наказывает сильный перекос</span></label><label class="quiz-option"><input type="radio" name="q-f1-meaning" value="accuracy"><span>F1 всегда равна accuracy</span></label><label class="quiz-option"><input type="radio" name="q-f1-meaning" value="tokens"><span>F1 зависит только от длины токенов</span></label></div>
                <div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="F1 высока только тогда, когда одновременно достаточно высоки precision и recall."></span></div>
              </div>
            </section>
            <section class="lesson-section" id="multiclass-f1">
              <span class="section-number">06</span><h2>Несколько классов: важно, <em>кому дать вес</em></h2>
              <p>Для каждого класса можно временно считать «этот класс против остальных», получить собственный F1, а затем усреднить.</p>
              <div class="card-grid">
                <article class="card"><h3>Macro F1</h3><p>Простое среднее F1 по классам. Редкий класс получает тот же вес, что массовый, поэтому его провал хорошо виден.</p></article>
                <article class="card"><h3>Weighted F1</h3><p>F1 каждого класса умножается на число его примеров. Отражает общую массу данных, но частые классы могут приглушить редкий.</p></article>
                <article class="card wide accent"><h3>Micro F1</h3><p>Сначала суммируются TP, FP и FN по всем классам, затем считается общая метрика. В обычной однозначной многоклассовой классификации она близка по смыслу к общей доле верных ответов.</p></article>
              </div>
              <div class="plain"><p class="kicker">Практический набор</p><p>При дисбалансе смотрите хотя бы <strong>weighted F1</strong> для общей картины и <strong>macro F1</strong>, чтобы не потерять редкие классы. Ещё лучше — таблицу precision, recall и F1 для каждого класса.</p></div>
              <div class="quiz" data-quiz data-answer="macro,weighted">
                <p class="kicker">Несколько ответов</p><h3>Какие утверждения верны?</h3>
                <div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="macro"><span>Macro F1 помогает заметить провал редкого класса</span></label><label class="quiz-option"><input type="checkbox" value="weighted"><span>Weighted F1 учитывает число примеров каждого класса</span></label><label class="quiz-option"><input type="checkbox" value="accuracy"><span>Accuracy всегда достаточно при любом дисбалансе</span></label><label class="quiz-option"><input type="checkbox" value="universal"><span>Одна метрика одинаково подходит всем бизнес-задачам</span></label></div>
                <div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Macro даёт классам равный вес, weighted учитывает support. Выбор метрики зависит от распределения данных и цены ошибок."></span></div>
              </div>
              <div class="takeaway"><strong>Правильный порядок</strong>Сначала определите положительный класс и цену FP/FN, затем посмотрите confusion matrix, после этого выбирайте accuracy, precision, recall и способ усреднения F1.</div>
            </section>
            <div class="source-box"><p>Полный разбор урока Stepik <a href="https://stepik.org/lesson/2422690/step/1?unit=2459477" target="_blank" rel="noreferrer">2.4 «Метрики качества моделей»</a>: accuracy при дисбалансе, confusion matrix, precision, recall, F1 и macro/weighted/micro-усреднение. Примеры переработаны так, чтобы сначала был понятен смысл ошибки, а затем формула.</p></div>
          `
        },
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
              <div class="quiz" data-quiz data-answer="embedding" data-alternatives="эмбеддинг|эмбединг">
                <p class="kicker">Короткий ответ</p><h3>Как называется числовое векторное представление токена?</h3>
                <div class="quiz-options"><label class="quiz-option"><input type="text" name="q-embed" placeholder="Введите термин"><span></span></label></div>
                <div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Верно: embedding, по-русски — эмбеддинг."></span></div>
              </div>
              <div class="takeaway"><strong>Ментальная модель</strong>LLM не достаёт готовое предложение из памяти. Она шаг за шагом строит продолжение, каждый раз опираясь на контекст и уже созданные токены.</div>
            </section>
            <div class="source-box"><p>По материалам видео о роли LLM в NLP и обучении языковых моделей: <a href="https://stepik.org/lesson/1786035/step/8?unit=1811709" target="_blank" rel="noreferrer">Stepik, шаги 8–9</a>.</p></div>
          `
        },
        {
          id: "ai-landscape",
          title: "Где LLM находится в мире искусственного интеллекта",
          deck: "Разложим по уровням AI, машинное обучение, нейросети, генеративные модели и LLM — и не будем смешивать эти понятия.",
          time: "24 мин",
          level: "Основа",
          body: `
            <section class="lesson-section" id="nested-fields">
              <span class="section-number">01</span><h2>Пять вложенных <em>уровней</em></h2>
              <p class="lead">LLM — не синоним всего искусственного интеллекта. Это один конкретный класс моделей внутри более широкой области.</p>
              <div class="diagram"><div class="flow">
                <div class="flow-node"><strong>AI</strong><span>автоматизация интеллектуальных задач</span></div>
                <div class="flow-node"><strong>Machine Learning</strong><span>правила извлекаются из данных</span></div>
                <div class="flow-node"><strong>Нейросети</strong><span>сложные обучаемые функции</span></div>
                <div class="flow-node"><strong>Generative AI</strong><span>создаёт новые объекты</span></div>
                <div class="flow-node"><strong>LLM</strong><span>генерирует и преобразует текст</span></div>
              </div></div>
              <div class="plain"><p class="kicker">Главное различие</p><p>В системе на правилах разработчик пишет «если произошло X, сделай Y». В машинном обучении разработчик даёт примеры, а алгоритм сам подбирает зависимость между входом и правильным ответом.</p></div>
            </section>
            <section class="lesson-section" id="discriminative-generative">
              <span class="section-number">02</span><h2>Решить о готовом объекте или <em>создать новый</em></h2>
              <div class="card-grid">
                <article class="card"><p class="kicker">Дискриминативная модель</p><h3>Выбирает</h3><p>«На фото владелец телефона или нет?», «Это спам или обычное письмо?». Результат — метка, число или граница между классами.</p></article>
                <article class="card accent"><p class="kicker">Генеративная модель</p><h3>Создаёт</h3><p>Новый текст, изображение, аудио, видео или код. Результат не выбирается из короткого готового списка.</p></article>
              </div>
              <p>Мы давно пользуемся дискриминативными моделями и почти перестали их замечать. Генеративные модели привлекли внимание потому, что результат похож на самостоятельное творчество.</p>
            </section>
            <section class="lesson-section" id="why-language">
              <span class="section-number">03</span><h2>Почему текст дал LLM столько <em>возможностей</em></h2>
              <p>Через текст люди фиксируют знания, инструкции, аргументы, программы и правила взаимодействия. Научившись продолжать и преобразовывать текст, модель получила единый интерфейс к множеству задач: переводу, суммаризации, коду, анализу документов и диалогу.</p>
              <div class="example"><p class="kicker">Но это не волшебный интеллект</p><p>Научные системы на основе LLM могут перебирать и оценивать варианты алгоритмов, находя сильные комбинации внутри заданной рамки. Это серьёзный результат, но он не доказывает, что модель создаёт принципиально новые научные теории без человеческой постановки задачи и проверки.</p></div>
              <details><summary>Что такое AGI?</summary><div><strong>Artificial General Intelligence</strong> — гипотетический общий искусственный интеллект, способный переносить знания между очень разными задачами на уровне человека или выше. Современные LLM считаются важным шагом в этом направлении, но термин AGI не означает, что такая система уже создана.</div></details>
            </section>
            <section class="lesson-section" id="capability-boundary">
              <span class="section-number">04</span><h2>Мощная модель — не обязательно <em>правильный инструмент</em></h2>
              <p>LLM универсальна, но за универсальность платят задержкой, стоимостью токенов, GPU-ресурсами и вероятностными ошибками. Регулярное выражение надёжнее извлечёт e-mail из стандартного поля, а калькулятор точнее посчитает формулу.</p>
              <div class="quiz" data-quiz data-answer="classification,generation">
                <p class="kicker">Несколько ответов</p><h3>Какие пары описаны верно?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="checkbox" value="classification"><span>Распознать владельца телефона — дискриминативная задача</span></label>
                  <label class="quiz-option"><input type="checkbox" value="generation"><span>Написать резюме статьи — генеративная задача</span></label>
                  <label class="quiz-option"><input type="checkbox" value="agi"><span>Любая LLM уже является AGI</span></label>
                  <label class="quiz-option"><input type="checkbox" value="rules"><span>Машинное обучение всегда состоит из правил if/else, написанных вручную</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Верны первые два пункта. LLM относится к генеративному AI, но это не тождественно AGI; в ML закономерность обучается по данным."></span></div>
              </div>
            </section>
            <div class="source-box"><p>Развёрнуто по первой видеочасти урока 2.1: место LLM среди AI-технологий, примеры применения и границы современных моделей.</p></div>
          `
        },
        {
          id: "pretraining-deep-dive",
          title: "Предобучение LLM: от текста до обновления весов",
          deck: "Проследим полный учебный цикл: датасет, батч, вероятности, cross-entropy, градиентный спуск и сохранённые веса.",
          time: "32 мин",
          level: "Углубление",
          body: `
            <section class="lesson-section" id="training-data">
              <span class="section-number">01</span><h2>Откуда берётся <em>учебный материал</em></h2>
              <p class="lead">Для базовой модели собирают огромный корпус: веб-страницы, книги, статьи и репозитории кода. Важны не только объём, но также качество, разнообразие языков и источников.</p>
              <div class="plain"><p class="kicker">Корпус</p><p>Это большая коллекция текстов, подготовленная для обучения. Тексты очищают, удаляют явные дубликаты, фильтруют нежелательные данные и разбивают на последовательности токенов.</p></div>
              <p>Один фрагмент автоматически даёт много учебных примеров. Для последовательности «мама мыла раму» входом может быть «мама», затем «мама мыла»; правильными продолжениями будут «мыла» и «раму».</p>
            </section>
            <section class="lesson-section" id="training-loop">
              <span class="section-number">02</span><h2>Один шаг обучения <em>по порядку</em></h2>
              <div class="example"><div class="example-steps">
                <div class="example-step"><span>1</span><p>Берём небольшой набор последовательностей — <strong>batch</strong>.</p></div>
                <div class="example-step"><span>2</span><p>Модель выдаёт вероятности всех токенов словаря для следующей позиции.</p></div>
                <div class="example-step"><span>3</span><p>Сравниваем распределение с токеном, который действительно стоял в исходном тексте.</p></div>
                <div class="example-step"><span>4</span><p>Функция потерь превращает ошибку в одно число.</p></div>
                <div class="example-step"><span>5</span><p>Градиентный спуск немного меняет веса в направлении меньшей ошибки.</p></div>
              </div></div>
              <div class="takeaway"><strong>Почему правильный ответ уже известен</strong>Тексты не нужно вручную размечать для каждого следующего токена: продолжение находится прямо в исходном предложении. Это называется self-supervised learning — обучение с самогенерируемой разметкой.</div>
            </section>
            <section class="lesson-section" id="cross-entropy">
              <span class="section-number">03</span><h2>Cross-entropy без <em>страшной формулы</em></h2>
              <p>Правильный токен кодируется вектором, где одна позиция равна 1, остальные — 0. Поэтому в сумме cross-entropy фактически остаётся отрицательный логарифм вероятности правильного токена.</p>
              <div class="formula">loss = −log P(правильный токен | предыдущий контекст)</div>
              <div class="card-grid">
                <article class="card"><h3>P = 0,9</h3><p>Модель уверена в правильном продолжении. −log(0,9) — маленький штраф.</p></article>
                <article class="card accent"><h3>P = 0,001</h3><p>Правильному токену дали почти нулевую вероятность. −log(0,001) — большой штраф.</p></article>
              </div>
              <details><summary>Зачем здесь логарифм?</summary><div>Вероятность лежит между 0 и 1, а функция потерь должна резко наказывать самоуверенно неправильные ответы. Логарифм превращает значения около нуля в очень большой штраф и удобно суммирует вероятности длинных последовательностей.</div></details>
            </section>
            <section class="lesson-section" id="weights-and-scale">
              <span class="section-number">04</span><h2>Что именно модель <em>сохраняет</em></h2>
              <p><strong>Параметры, или веса</strong>, — обученные числа внутри слоёв нейросети. Они не являются таблицей готовых предложений. В них распределённо закодированы закономерности языка, ассоциации, стили и часть фактических связей.</p>
              <p>Процесс повторяется миллионы раз до заданного числа шагов или до того, как качество на проверочных данных перестаёт заметно расти. Обучение огромной сети требует GPU-кластеров; запуск готовой модели обычно намного дешевле обучения с нуля.</p>
              <div class="quiz" data-quiz data-answer="loss">
                <h3>Модель дала правильному токену вероятность 0,002. Что произойдёт?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="radio" name="q-loss" value="loss"><span>Cross-entropy даст большой штраф, и веса скорректируются</span></label>
                  <label class="quiz-option"><input type="radio" name="q-loss" value="ignore"><span>Ошибка будет проигнорирована, потому что вероятность не равна нулю</span></label>
                  <label class="quiz-option"><input type="radio" name="q-loss" value="vocab"><span>Токен удалится из словаря</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Низкая вероятность правильного токена означает большой loss. Градиентный спуск изменит веса так, чтобы на похожих примерах вероятность стала выше."></span></div>
              </div>
            </section>
            <div class="source-box"><p>Полная логика второй видеочасти урока 2.1: языковое моделирование, токенизация, цикл предобучения, cross-entropy и градиентный спуск.</p></div>
          `
        },
        {
          id: "transformer-to-chat",
          title: "От Transformer к ChatGPT",
          deck: "Почему масштаб дал сильную базовую модель, но для полезного ассистента понадобилось отдельное обучение инструкциям.",
          time: "30 мин",
          level: "Основа",
          body: `
            <section class="lesson-section" id="attention-idea">
              <span class="section-number">01</span><h2>Transformer и механизм <em>attention</em></h2>
              <p class="lead">Архитектура Transformer появилась в 2017 году. Её ключевая идея — для каждого токена вычислять, какие другие позиции контекста важны именно сейчас.</p>
              <div class="example"><p class="kicker">Местоимение</p><p>В предложении «Анна положила книгу на стол, потому что <strong>она</strong> мешала» внимание помогает связать «она» с книгой, а не со столом. Конкретные связи не программируются вручную: модель учится им, потому что полезный фокус уменьшает ошибку следующего токена.</p></div>
              <p>Attention модели не обязан буквально совпадать с человеческим вниманием и не всегда интерпретируется однозначно. Это обучаемый вычислительный механизм, а не доказательство человеческого понимания.</p>
            </section>
            <section class="lesson-section" id="scaling">
              <span class="section-number">02</span><h2>Почему для GPT‑3 «размер имел <em>значение</em>»</h2>
              <p>GPT‑3 объединила большую Transformer-сеть, огромный корпус и вычислительные ресурсы. Масштаб позволил модели освоить не только грамматику, но и множество шаблонов: форматы документов, стили, программный код и фактические ассоциации.</p>
              <div class="plain"><p class="kicker">Параметр — не отдельный факт</p><p>175 миллиардов параметров не означают 175 миллиардов карточек «вопрос → ответ». Знания распределены по сети, поэтому модель может обобщать, но не гарантирует точное извлечение конкретного факта.</p></div>
            </section>
            <section class="lesson-section" id="base-model-problem">
              <span class="section-number">03</span><h2>Почему GPT‑3 могла не ответить на <em>просьбу</em></h2>
              <p>Цель базовой модели — естественно продолжить вход. Если после вопроса обычно идут варианты теста, модель может сгенерировать варианты A, B, C, D вместо объяснения. Для языкового моделирования это хорошее продолжение, но для пользователя — плохое поведение.</p>
              <div class="takeaway"><strong>Несовпадение целей</strong>Больше текста и параметров не исправляют задачу, если мы обучаем «продолжай», а ожидаем «распознай намерение и помоги». Нужно изменить обучающую цель.</div>
            </section>
            <section class="lesson-section" id="instruction-tuning">
              <span class="section-number">04</span><h2>Instruction tuning: показать, как <em>помогать</em></h2>
              <p>После предобучения собирают примеры «инструкция пользователя → качественный ответ». Разметчики пишут разнообразные просьбы и эталонные реакции: объяснить код, придумать идеи, составить историю, изменить формат текста.</p>
              <div class="diagram"><div class="flow">
                <div class="flow-node"><strong>Pretraining</strong><span>язык и общие закономерности</span></div>
                <div class="flow-node"><strong>SFT</strong><span>примеры следования инструкциям</span></div>
                <div class="flow-node"><strong>Preferences</strong><span>полезность, вежливость, безопасность</span></div>
                <div class="flow-node"><strong>Assistant</strong><span>диалоговое поведение</span></div>
              </div></div>
              <p><strong>SFT</strong> — supervised fine-tuning, дообучение на эталонных ответах. Отдельный этап предпочтений учит выбирать более полезный и безопасный вариант. Эти стадии меняют поведение, но не превращают модель в безошибочный справочник.</p>
              <div class="quiz" data-quiz data-answer="objective">
                <h3>Почему одной базовой задачи следующего токена недостаточно для чат-ассистента?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="radio" name="q-chat" value="objective"><span>Естественное продолжение текста не всегда совпадает с намерением пользователя</span></label>
                  <label class="quiz-option"><input type="radio" name="q-chat" value="tokens"><span>Базовая модель не использует токены</span></label>
                  <label class="quiz-option"><input type="radio" name="q-chat" value="attention"><span>В базовой модели нет attention</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Проблема в цели обучения: продолжить текст и выполнить просьбу — не одно и то же. Instruction tuning показывает модели желаемую реакцию на намерение."></span></div>
              </div>
            </section>
            <div class="source-box"><p>По видеочасти «Современные LLM»: Transformer, масштаб GPT‑3, несовпадение задач и инструктивное дообучение.</p></div>
          `
        },
        {
          id: "prompting-and-reasoning",
          title: "Промптинг, галлюцинации и reasoning",
          deck: "Как ставить задачу модели, где ей нельзя доверять и когда пошаговое рассуждение действительно помогает.",
          time: "34 мин",
          level: "Практика",
          body: `
            <section class="lesson-section" id="not-search-not-calculator">
              <span class="section-number">01</span><h2>LLM — не поисковик и не <em>калькулятор</em></h2>
              <p class="lead">Она выбирает правдоподобное продолжение, а не извлекает гарантированно верную запись из базы. Факты и арифметика могут выглядеть убедительно и при этом быть ошибочными.</p>
              <div class="card-grid">
                <article class="card"><h3>Нужен свежий факт</h3><p>Подключите поиск или RAG, потребуйте источники и проверьте, действительно ли найденный документ подтверждает ответ.</p></article>
                <article class="card"><h3>Нужен точный расчёт</h3><p>Пусть программа или калькулятор выполняет вычисление, а LLM только формулирует план и объясняет результат.</p></article>
                <article class="card accent"><h3>Нужна генерация</h3><p>LLM сильна в черновиках, преобразовании текста, объяснениях и работе с нестрогими требованиями.</p></article>
              </div>
              <div class="plain"><p class="kicker">Галлюцинация</p><p>Уверенный, связный, но выдуманный ответ. Это не редкий «сбой честности», а следствие цели: модель должна продолжить текст даже тогда, когда достоверного знания недостаточно.</p></div>
            </section>
            <section class="lesson-section" id="prompt-rules">
              <span class="section-number">02</span><h2>Семь правил хорошего <em>промпта</em></h2>
              <div class="example"><div class="example-steps">
                <div class="example-step"><span>1</span><p>Опишите роль, ситуацию и аудиторию: кто отвечает, для кого и в каких условиях.</p></div>
                <div class="example-step"><span>2</span><p>Сформулируйте результат: формат, объём, язык, обязательные поля.</p></div>
                <div class="example-step"><span>3</span><p>Разбейте сложную работу на проверяемые этапы.</p></div>
                <div class="example-step"><span>4</span><p>Замените «сделай хорошо» конкретными критериями качества.</p></div>
                <div class="example-step"><span>5</span><p>Дайте пример, если формат трудно описать словами.</p></div>
                <div class="example-step"><span>6</span><p>Экспериментируйте с формулировками и сравнивайте по одинаковому тест-набору.</p></div>
                <div class="example-step"><span>7</span><p>Ведите отдельный чат для отдельной задачи и сохраняйте важные артефакты вне чата.</p></div>
              </div></div>
              <p>Вежливость не заменяет ясность. Её можно сохранять для естественного общения, но качество определяется контекстом, требованиями и примерами, а не словом «пожалуйста».</p>
            </section>
            <section class="lesson-section" id="context-hygiene">
              <span class="section-number">03</span><h2>Диалог — часть входного <em>контекста</em></h2>
              <p>При новом ответе модель видит системную инструкцию и доступную историю сообщений. Лишние темы, устаревшие решения и противоречивые требования конкурируют за внимание.</p>
              <div class="example"><p class="kicker">Если чат «уплыл»</p><p>Попросите кратко суммировать принятые решения, проверьте summary, заново укажите цель и ограничения. Если накопилось много мусора — начните новый диалог с проверенной сводкой.</p></div>
            </section>
            <section class="lesson-section" id="reasoning">
              <span class="section-number">04</span><h2>Когда reasoning даёт <em>прирост</em></h2>
              <p><strong>Chain of thought</strong> — промежуточные шаги между вопросом и ответом. Пошаговый разбор особенно полезен в математике, логике, планировании и задачах с зависимостями. Для простого вопроса о факте длинное рассуждение обычно не добавляет знания.</p>
              <p>Одной фразы «думай по шагам» бывает мало. Современные reasoning-модели дополнительно обучают на примерах рассуждений и проверяемых задачах. Такой режим дороже и медленнее, поэтому его включают там, где сложность оправдана.</p>
              <div class="quiz" data-quiz data-answer="search,calculator,criteria">
                <p class="kicker">Несколько ответов</p><h3>Какие меры реально повышают надёжность?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="checkbox" value="search"><span>Для свежих фактов подключить поиск и проверять источники</span></label>
                  <label class="quiz-option"><input type="checkbox" value="calculator"><span>Точные вычисления передать калькулятору или коду</span></label>
                  <label class="quiz-option"><input type="checkbox" value="criteria"><span>Заменить «сделай хорошо» измеримыми критериями</span></label>
                  <label class="quiz-option"><input type="checkbox" value="confidence"><span>Верить ответу, если он звучит уверенно</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Надёжность дают внешние инструменты и проверяемые требования. Уверенный тон не является доказательством."></span></div>
              </div>
            </section>
            <div class="source-box"><p>Развёрнуто по видеочасти о промптинге, reasoning, ограничениях LLM и управлении контекстом диалога.</p></div>
          `
        },
        {
          id: "lora-versus-rag",
          title: "LoRA и RAG: навык или знание",
          deck: "Два подхода часто смешивают, хотя они меняют разные части системы и решают разные проблемы.",
          time: "28 мин",
          level: "Архитектура",
          body: `
            <section class="lesson-section" id="why-not-full-finetune">
              <span class="section-number">01</span><h2>Почему не дообучить <em>всю модель</em></h2>
              <p>Полное обновление миллиардов весов требует много GPU-памяти, времени, данных и контроля. Для одной прикладной задачи это часто экономически неоправданно.</p>
              <div class="plain"><p class="kicker">PEFT</p><p>Parameter-Efficient Fine-Tuning — семейство методов, которые обучают небольшую часть параметров или компактную добавку к замороженной модели.</p></div>
            </section>
            <section class="lesson-section" id="lora-mechanics">
              <span class="section-number">02</span><h2>LoRA как сменный <em>фильтр</em></h2>
              <p>Исходные веса остаются замороженными. Для выбранных слоёв обучаются две маленькие низкоранговые матрицы, произведение которых даёт поправку к весу во время работы.</p>
              <div class="formula">эффективный вес = базовый вес + обученная LoRA‑поправка</div>
              <p>Одна база может работать с несколькими адаптерами: стиль поддержки, формат юридического ответа, специальная классификация. LoRA особенно полезна для поведения, формата, стиля и узкого навыка.</p>
              <div class="takeaway"><strong>Чего LoRA не гарантирует</strong>Адаптер не превращается в надёжную обновляемую базу фактов. Знания внутри весов трудно адресно исправить, процитировать и поддерживать актуальными.</div>
            </section>
            <section class="lesson-section" id="rag-mechanics">
              <span class="section-number">03</span><h2>RAG: найти, затем <em>сформулировать</em></h2>
              <div class="diagram"><div class="flow">
                <div class="flow-node"><strong>Вопрос</strong><span>что нужно узнать</span></div>
                <div class="flow-node"><strong>Retriever</strong><span>ищет релевантные фрагменты</span></div>
                <div class="flow-node"><strong>Контекст</strong><span>добавляется к промпту</span></div>
                <div class="flow-node"><strong>LLM</strong><span>строит ответ по источникам</span></div>
              </div></div>
              <p>Документ можно заменить за минуту, не переобучая модель. Поэтому RAG подходит для внутренних регламентов, каталогов, часто меняющихся правил и ответов, где важно показать источник.</p>
              <p>RAG не исправит плохую базу: если поиск нашёл нерелевантный или недостоверный документ, генератор аккуратно сформулирует неправильный ответ. Качество индекса и источников критично.</p>
            </section>
            <section class="lesson-section" id="choice-matrix">
              <span class="section-number">04</span><h2>Матрица <em>выбора</em></h2>
              <div class="card-grid">
                <article class="card"><h3>Новые свежие факты</h3><p><strong>RAG.</strong> Знания вынесены во внешнюю, обновляемую и цитируемую базу.</p></article>
                <article class="card"><h3>Новый стиль или формат</h3><p><strong>Промпт</strong>, а если его мало — <strong>LoRA</strong>.</p></article>
                <article class="card"><h3>Узкий повторяемый навык</h3><p><strong>LoRA</strong> или другое дообучение на качественных примерах.</p></article>
                <article class="card accent"><h3>Навык + актуальные факты</h3><p><strong>LoRA и RAG вместе.</strong> Адаптер меняет поведение, поиск приносит знания.</p></article>
              </div>
              <div class="quiz" data-quiz data-answer="rag">
                <h3>Регламент компании меняется каждую неделю, а ответ должен содержать ссылку на пункт. Что выбрать?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="radio" name="q-lora-rag" value="rag"><span>RAG по версии контролируемой базы документов</span></label>
                  <label class="quiz-option"><input type="radio" name="q-lora-rag" value="lora"><span>Раз в неделю обучать новый LoRA-адаптер</span></label>
                  <label class="quiz-option"><input type="radio" name="q-lora-rag" value="memory"><span>Попросить модель запомнить регламент в чате</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="RAG позволяет адресно обновлять документы и показывать источник. LoRA лучше подходит для поведения и навыков, а не для постоянно меняющихся фактов."></span></div>
              </div>
            </section>
            <div class="source-box"><p>По заключительной части видео о практических способах адаптации LLM: LoRA, RAG, их ограничения и совместное применение.</p></div>
          `
        },
        {
          id: "llm-project-checklist",
          title: "Как проверить идею LLM‑проекта",
          deck: "От здравого смысла и дешёвого прототипа до тестового набора, стоимости и защитных ограничений.",
          time: "24 мин",
          level: "Практика",
          body: `
            <section class="lesson-section" id="need-llm">
              <span class="section-number">01</span><h2>Первый вопрос: нужна ли здесь <em>LLM</em></h2>
              <p class="lead">Модный инструмент легко принять за цель. Сначала определите проблему, цену ошибки и самый простой способ решить её.</p>
              <div class="example"><p class="kicker">Пример из лекции</p><p>Идея «сделать RAG по научным статьям» может после проверки превратиться в обычный смысловой поиск. Если пользователю нужен список релевантных документов, генерация ответа только добавляет стоимость и риск искажения.</p></div>
              <div class="card-grid">
                <article class="card"><h3>Точное правило</h3><p>Regex, SQL, фильтр или обычный код.</p></article>
                <article class="card"><h3>Поиск документа</h3><p>Классический или векторный поиск без генерации.</p></article>
                <article class="card"><h3>Неоднозначный язык</h3><p>LLM оправдана для понимания и генерации текста.</p></article>
              </div>
            </section>
            <section class="lesson-section" id="prototype">
              <span class="section-number">02</span><h2>Сначала дешёвый <em>прототип</em></h2>
              <div class="example"><div class="example-steps">
                <div class="example-step"><span>1</span><p>Соберите 20–50 реальных примеров задачи, включая неудобные случаи.</p></div>
                <div class="example-step"><span>2</span><p>Проверьте несколько промптов вручную или сделайте минимальный RAG.</p></div>
                <div class="example-step"><span>3</span><p>Зафиксируйте ожидаемый ответ и критерии качества до оптимизации.</p></div>
                <div class="example-step"><span>4</span><p>Только после подтверждения гипотезы стройте полноценный pipeline.</p></div>
              </div></div>
              <p>Прототип отвечает на вопрос «в принципе работает?», а не доказывает готовность production-системы.</p>
            </section>
            <section class="lesson-section" id="evaluation-cost">
              <span class="section-number">03</span><h2>Собрать систему проще, чем <em>доказать качество</em></h2>
              <p>Два красивых ответа ничего не говорят о надёжности. Нужен тестовый набор, категории ошибок и повторяемый запуск. Для RAG отдельно оценивают поиск и финальную генерацию; для агента — ещё выбор инструментов и выполнение действий.</p>
              <div class="plain"><p class="kicker">Считать нужно больше точности</p><p>Измеряйте стоимость запроса, задержку, долю отказов, длину контекста, число внешних вызовов и цену человеческой проверки. «Самая умная» модель может оказаться худшим продуктовым решением.</p></div>
            </section>
            <section class="lesson-section" id="safety-validation">
              <span class="section-number">04</span><h2>LLM как талантливый <em>джун</em></h2>
              <p>Модель быстро делает черновик и иногда неожиданно сильна, но не знает всех внутренних договорённостей и может уверенно ошибиться. Результат кода, аналитики и документов должен проходить проверку специалиста или автоматические тесты.</p>
              <p>Критические ограничения не стоит оставлять в промпте. Внешний код должен проверять права, допустимые входы и выходы, лимиты сумм и разрешённые действия.</p>
              <div class="quiz" data-quiz data-answer="baseline,testset,guardrails">
                <p class="kicker">Несколько ответов</p><h3>Что сделать до масштабного внедрения?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="checkbox" value="baseline"><span>Сравнить с более простым baseline без LLM</span></label>
                  <label class="quiz-option"><input type="checkbox" value="testset"><span>Создать набор реальных и сложных тестов</span></label>
                  <label class="quiz-option"><input type="checkbox" value="guardrails"><span>Вынести критические ограничения во внешний код</span></label>
                  <label class="quiz-option"><input type="checkbox" value="demo"><span>Оценить качество только по удачной демонстрации</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Нужны baseline, тест-набор и внешние ограничения. Демонстрация показывает возможность, но не устойчивость решения."></span></div>
              </div>
            </section>
            <div class="source-box"><p>По заключительному видео вводного модуля: проверка идеи, быстрый прототип, оценка качества, стоимость, безопасность и роль человеческой валидации.</p></div>
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
              <details><summary>Когда очистка всё-таки полезна?</summary><div>Удаляйте не «всё необычное», а доказанный технический мусор: обрывки HTML после парсинга, дубли, пустые строки, невидимые управляющие символы и повторяющиеся служебные блоки. Нормализация пробелов помогает стабильности эксперимента. Числа, пунктуацию, стоп-слова и регистр сохраняйте, пока тесты не показали обратное: они могут нести смысл.</div></details>
              <div class="takeaway"><strong>Практическое правило</strong>Сначала сохраните текст близким к исходному и измерьте baseline. Затем меняйте один шаг очистки за раз и сравнивайте метрику на той же validation-выборке.</div>
            </section>
            <section class="lesson-section"><span class="section-number">02</span><h2>Что возвращает токенизатор</h2>
              <div class="card-grid">
                <article class="card"><h3><code>input_ids</code></h3><p>Номера токенов в словаре именно этой модели.</p></article>
                <article class="card"><h3><code>attention_mask</code></h3><p>Показывает, где настоящие токены, а где добавленный padding.</p></article>
                <article class="card"><h3>Padding</h3><p>Выравнивает длины примеров в батче специальными токенами.</p></article>
                <article class="card"><h3>Truncation</h3><p>Обрезает текст до максимальной длины, которую принимает модель.</p></article>
              </div>
              <div class="plain"><p class="kicker">Критическая совместимость</p><p>Токенизатор должен соответствовать модели. Один и тот же ID у двух словарей может обозначать разные токены — словно открыть книгу по указателю от другой книги.</p></div>
              <div class="card-grid">
                <article class="card"><h3>WordPiece</h3><p>Используется в BERT: редкое слово разбивается на знакомые части, а <code>##</code> отмечает продолжение внутри слова.</p></article>
                <article class="card"><h3>BPE</h3><p>Постепенно объединяет часто встречающиеся пары символов или фрагментов. Варианты BPE часто встречаются у GPT-подобных моделей.</p></article>
                <article class="card wide"><h3>SentencePiece</h3><p>Работает непосредственно со строкой и не требует заранее делить её по пробелам. Это удобно для разных языков и систем письма.</p></article>
              </div>
              <p><strong>OOV</strong> означает out of vocabulary — фрагмент, которого нет в словаре. Современный subword-токенизатор сначала пытается собрать его из частей; <code>[UNK]</code> используется, только если представить фрагмент знакомыми токенами не удалось.</p>
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
            <section class="lesson-section" id="bert-tokenizer-example"><span class="section-number">04</span><h2>Токенизация BERT <em>по шагам</em></h2>
              <pre class="formula">from transformers import AutoTokenizer

tok = AutoTokenizer.from_pretrained("bert-base-uncased")
batch = tok(
    "Unbelievably quick foxes",
    padding="max_length",
    truncation=True,
    max_length=10,
    return_tensors="pt",
)

print(batch["input_ids"])
print(batch["attention_mask"])</pre>
              <div class="example"><div class="example-steps">
                <div class="example-step"><span>1</span><p>Строка разбивается на подслова, например <code>un</code>, <code>##bel</code>, <code>##ie</code>, <code>##vably</code>.</p></div>
                <div class="example-step"><span>2</span><p>Добавляются служебные границы <code>[CLS]</code> и <code>[SEP]</code>.</p></div>
                <div class="example-step"><span>3</span><p>Каждый токен заменяется ID из словаря именно <code>bert-base-uncased</code>.</p></div>
                <div class="example-step"><span>4</span><p>Если длина больше 10 — хвост обрезается; если меньше — добавляются <code>[PAD]</code>.</p></div>
                <div class="example-step"><span>5</span><p><code>return_tensors="pt"</code> возвращает тензоры PyTorch: числовые массивы формы «batch × длина».</p></div>
              </div></div>
              <div class="plain"><p class="kicker">Что делает attention mask</p><p>Например, маска <code>[1, 1, 1, 1, 1, 1, 1, 0, 0, 0]</code> говорит attention: первые семь позиций настоящие, последние три — заполнители. Без маски модель может учитывать пустышки как содержимое.</p></div>
              <div class="quiz" data-quiz data-answer="model-tokenizer,mask,truncation">
                <p class="kicker">Несколько ответов</p><h3>Какие правила безопасны для работы с токенизатором?</h3>
                <div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="model-tokenizer"><span>Брать токенизатор от той же модели</span></label><label class="quiz-option"><input type="checkbox" value="mask"><span>Передавать attention mask при padding</span></label><label class="quiz-option"><input type="checkbox" value="truncation"><span>Проверять, не обрезана ли важная часть текста</span></label><label class="quiz-option"><input type="checkbox" value="random"><span>Смешивать словарь BERT с весами другой модели</span></label></div>
                <div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Совместимый токенизатор, корректная маска и контроль усечения — обязательные части воспроизводимого входа модели."></span></div>
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
          id: "transformer-families-deep",
          title: "Как Transformer разделился на три семейства",
          deck: "Пройдём путь от рекуррентных encoder–decoder сетей к T5, BERT и GPT и увидим, что именно делает каждая часть.",
          time: "27 мин",
          level: "Углубление",
          body: `
            <section class="lesson-section" id="rnn-bottleneck">
              <span class="section-number">01</span><h2>Откуда взялась схема <em>encoder–decoder</em></h2>
              <p class="lead">До Transformer перевод часто строили на рекуррентных сетях. Encoder читал вход по одному элементу и сжимал всё предложение в состояние, decoder по нему создавал выход.</p>
              <div class="example"><p class="kicker">Проблема одного вектора</p><p>Если в конце длинного абзаца нужно вспомнить уточнение из начала, единственное сжатое состояние становится узким горлышком. Ранние детали ослабевают по мере последовательных преобразований.</p></div>
              <p>Attention сначала появился как способ дать decoder прямой доступ к разным состояниям encoder. В Transformer 2017 года вся архитектура была построена вокруг attention, без обязательной рекуррентной обработки токенов по одному.</p>
            </section>
            <section class="lesson-section" id="encoder-work">
              <span class="section-number">02</span><h2>Что делает <em>encoder</em></h2>
              <div class="diagram"><div class="flow">
                <div class="flow-node"><strong>Токены</strong><span>элементы входа</span></div>
                <div class="flow-node"><strong>Эмбеддинги</strong><span>начальные векторы</span></div>
                <div class="flow-node"><strong>Позиции</strong><span>где стоит каждый токен</span></div>
                <div class="flow-node"><strong>N блоков</strong><span>attention + преобразования</span></div>
                <div class="flow-node"><strong>Контекстные векторы</strong><span>значение с учётом всего входа</span></div>
              </div></div>
              <p>Attention сам по себе не знает порядок: перестановка одинаковых векторов не сообщает, кто был первым. Поэтому добавляется <strong>positional encoding</strong> — признаки позиции токена.</p>
              <p>После нескольких блоков каждый выходной вектор содержит не только исходный токен, но и сведения о связанных частях последовательности. Эти «насыщенные» представления удобно использовать для понимания текста.</p>
            </section>
            <section class="lesson-section" id="decoder-work">
              <span class="section-number">03</span><h2>Что делает <em>decoder</em></h2>
              <p>Decoder создаёт последовательность авторегрессионно: генерирует один токен, добавляет его к контексту и повторяет. Причинная маска не разрешает позиции смотреть в ещё не созданное будущее.</p>
              <div class="plain"><p class="kicker">Почему GPT обходится без encoder</p><p>При огромном предобучении decoder научился одновременно извлекать полезные зависимости из предыдущего контекста и генерировать продолжение. Encoder не «выбрасывают» из уже обученной модели — GPT изначально проектируют и обучают как decoder-only сеть.</p></div>
            </section>
            <section class="lesson-section" id="three-families-use">
              <span class="section-number">04</span><h2>Три архитектуры — три <em>потока информации</em></h2>
              <div class="card-grid">
                <article class="card"><h3>Encoder-only: BERT</h3><p>Каждый токен видит контекст слева и справа. Классификация, NER, извлечение признаков, смысловые векторы.</p></article>
                <article class="card accent"><h3>Decoder-only: GPT</h3><p>Видит только доступное прошлое и продолжает последовательность. Диалог, код, свободная генерация.</p></article>
                <article class="card wide"><h3>Encoder–decoder: T5</h3><p>Encoder строит полное представление входа, decoder создаёт новый текст с cross-attention к нему. Перевод, суммаризация, преобразование текста.</p></article>
              </div>
              <div class="quiz" data-quiz data-answer="position">
                <h3>Зачем Transformer добавляет позиционное кодирование?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="radio" name="q-pos" value="position"><span>Чтобы различать порядок токенов в последовательности</span></label>
                  <label class="quiz-option"><input type="radio" name="q-pos" value="vocab"><span>Чтобы увеличить словарь модели</span></label>
                  <label class="quiz-option"><input type="radio" name="q-pos" value="labels"><span>Чтобы получить готовые классы для классификации</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Attention сравнивает содержимое векторов, но без отдельного сигнала не знает их порядок. Позиционные признаки добавляют эту информацию."></span></div>
              </div>
            </section>
            <div class="source-box"><p>Развёрнуто по видеолекции 3.2: классический Transformer, наследие RNN, encoder, decoder, позиционное кодирование и специализация архитектур.</p></div>
          `
        },
        {
          id: "bert-and-sentence-embeddings",
          title: "BERT: маскированное обучение, классификация и SBERT",
          deck: "Как encoder учится без ручной разметки, что выдаёт на выходе и почему для смыслового поиска нужен специальный Sentence‑BERT.",
          time: "36 мин",
          level: "Углубление",
          body: `
            <section class="lesson-section" id="masked-language-model">
              <span class="section-number">01</span><h2>Masked Language Modeling</h2>
              <p class="lead">BERT обучали восстанавливать скрытые токены: из исходного текста часть слов заменялась маской, а правильный ответ уже находился в самом тексте.</p>
              <div class="example"><p class="kicker">Пример</p><p>«Париж — столица <strong>[MASK]</strong>». Модель видит контекст с обеих сторон и распределяет вероятность по словарю. Если «Франции» получило низкую вероятность, веса корректируются.</p></div>
              <p>Это self-supervised обучение: люди не размечают миллионы предложений вручную, но задача всё равно имеет правильные ответы. Благодаря двунаправленному контексту BERT особенно силён в понимании готового текста.</p>
            </section>
            <section class="lesson-section" id="bert-output">
              <span class="section-number">02</span><h2>BERT выдаёт не метку, а <em>представления</em></h2>
              <p>На выходе находится контекстный вектор для каждой позиции. Чтобы решить прикладную задачу, сверху добавляют небольшую обучаемую «голову».</p>
              <div class="card-grid">
                <article class="card"><h3>Класс всего текста</h3><p>Берут представление специального токена <code>[CLS]</code> или агрегируют токены, затем предсказывают «спам / не спам».</p></article>
                <article class="card"><h3>Метка каждого токена</h3><p>Каждый выход идёт в классификатор: B‑PERSON, I‑PERSON, O — так строятся NER и разметка последовательностей.</p></article>
              </div>
              <div class="plain"><p class="kicker">Почему [CLS] может представлять предложение</p><p>У него нет собственного лексического смысла. Проходя через слои attention, он собирает сведения от всей последовательности; при дообучении классификатор заставляет этот вектор хранить полезную для задачи сводку.</p></div>
            </section>
            <section class="lesson-section" id="bert-preprocessing">
              <span class="section-number">03</span><h2>Почему классическая очистка может <em>мешать</em></h2>
              <p>В Bag of Words лемматизация и удаление стоп-слов уменьшали разреженный словарь. BERT предобучался на естественном тексте и уже умеет учитывать формы слов, регистр и пунктуацию.</p>
              <p>Удалять признаки «по привычке» опасно: «НЕ рекомендую!!!» после агрессивной очистки может потерять отрицание и эмоциональную силу. Начинайте с токенизатора самой модели и меняйте предобработку только после измерения.</p>
            </section>
            <section class="lesson-section" id="bert-variants">
              <span class="section-number">04</span><h2>DistilBERT, RoBERTa и <em>семейство</em></h2>
              <div class="card-grid">
                <article class="card"><h3>DistilBERT</h3><p>Компактная модель, которая перенимает поведение большой через distillation. Быстрее и легче ценой части качества.</p></article>
                <article class="card"><h3>RoBERTa</h3><p>Пересмотр режима обучения BERT: больше данных, другие гиперпараметры и стратегия маскирования.</p></article>
                <article class="card"><h3>ALBERT / TinyBERT</h3><p>Способы сократить память и вычисления через разделение параметров, факторизацию или дистилляцию.</p></article>
              </div>
            </section>
            <section class="lesson-section" id="sbert-search">
              <span class="section-number">05</span><h2>Почему обычный BERT не идеален для <em>поиска</em></h2>
              <p>Для поиска нужно независимо превратить запрос и каждый документ в сопоставимые векторы. Sentence‑BERT обучают так, чтобы близкие по смыслу тексты располагались рядом в одном пространстве.</p>
              <div class="formula">вопрос → SBERT → вектор q<br>документ → тот же SBERT → вектор d<br>cosine_similarity(q, d) → близость</div>
              <p><strong>Косинусная близость</strong> сравнивает направление двух векторов. Чем ближе к 1, тем больше совпадает направление, а в хорошо обученном пространстве — и смысл.</p>
              <details><summary>SOTA, zero-shot и few-shot</summary><div><strong>SOTA</strong> — state of the art, общепризнанно сильный результат для конкретной задачи и набора условий. <strong>Zero-shot</strong> — модель решает новую задачу без примеров пользователя. <strong>Few-shot</strong> — в запросе или обучении дают несколько примеров, показывающих формат и правило.</div></details>
              <div class="quiz" data-quiz data-answer="sbert">
                <h3>Нужно найти ближайшие документы к вопросу среди 100 000 текстов. Что практичнее?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="radio" name="q-sbert" value="sbert"><span>Заранее построить векторы документов Sentence‑BERT и искать по близости</span></label>
                  <label class="quiz-option"><input type="radio" name="q-sbert" value="chat"><span>Каждый раз отправлять все 100 000 документов в чат-модель</span></label>
                  <label class="quiz-option"><input type="radio" name="q-sbert" value="cls"><span>Сравнивать номера токена [CLS] в словарях</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Sentence‑BERT создаёт сопоставимые векторы. Документы индексируют заранее, затем считают близость только для вектора нового вопроса."></span></div>
              </div>
            </section>
            <div class="source-box"><p>Полно по видео 3.2: обучение BERT, прикладные головы, различия предобработки, варианты семейства и Sentence‑BERT для RAG.</p></div>
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
          id: "huggingface-workflow",
          title: "Hugging Face на практике: карточка модели и pipeline",
          deck: "Как выбрать совместимую модель, загрузить tokenizer и AutoModel, решить NER и понять, почему русская фраза сломала английский sentiment-анализ.",
          time: "31 мин",
          level: "Код",
          body: `
            <section class="lesson-section" id="hub-map">
              <span class="section-number">01</span><h2>Hub — больше, чем каталог <em>LLM</em></h2>
              <p class="lead">На Hugging Face лежат encoder, decoder и мультимодальные модели, датасеты, метрики и демонстрационные приложения. Поиск начинается не с бренда, а с типа задачи.</p>
              <div class="example"><div class="example-steps">
                <div class="example-step"><span>1</span><p>Выберите задачу: text classification, token classification, fill-mask, embeddings, generation.</p></div>
                <div class="example-step"><span>2</span><p>Отфильтруйте язык, библиотеку, лицензию, размер и формат весов.</p></div>
                <div class="example-step"><span>3</span><p>Откройте model card и прочитайте назначение, датасет, метрики и ограничения.</p></div>
                <div class="example-step"><span>4</span><p>Проверьте пример кода и протестируйте на собственных примерах, включая трудные.</p></div>
              </div></div>
              <div class="plain"><p class="kicker">Имя репозитория</p><p>Обычно имеет вид <code>organization/model-name</code>. Хорошее имя намекает на базовую архитектуру, язык, задачу и вариант размера, но окончательное решение принимают по карточке.</p></div>
            </section>
            <section class="lesson-section" id="model-card">
              <span class="section-number">02</span><h2>Что искать в <em>model card</em></h2>
              <div class="card-grid">
                <article class="card"><h3>Задача и данные</h3><p>На чём модель обучали и совпадает ли домен с вашими текстами.</p></article>
                <article class="card"><h3>Язык</h3><p>Англоязычный sentiment-классификатор может принять русскую похвалу за нейтральный текст.</p></article>
                <article class="card"><h3>Метрики</h3><p>На каком датасете получено число и подходит ли метрика вашей цене ошибки.</p></article>
                <article class="card"><h3>Ограничения</h3><p>Максимальная длина, размер, лицензия, известные смещения и нежелательные сценарии.</p></article>
              </div>
              <p>Лайки и число загрузок помогают найти распространённые модели, но популярность не заменяет проверку совместимости.</p>
            </section>
            <section class="lesson-section" id="pipeline-code">
              <span class="section-number">03</span><h2>Что собирает <em>pipeline</em></h2>
              <div class="formula">сырой текст → tokenizer → тензоры → model → logits → декодирование результата</div>
              <pre class="formula">from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline

name = "dslim/bert-base-NER"
tokenizer = AutoTokenizer.from_pretrained(name)
model = AutoModelForTokenClassification.from_pretrained(name)

ner = pipeline("ner", model=model, tokenizer=tokenizer,
               aggregation_strategy="simple")
ner("Diana lives in Moscow")</pre>
              <p><strong>Auto-классы</strong> читают конфигурацию репозитория и выбирают правильную Python-архитектуру. Суффикс <code>ForTokenClassification</code> означает, что поверх backbone уже есть голова для метки каждого токена.</p>
              <details><summary>Почему первый запуск медленный?</summary><div>Веса и конфигурация скачиваются и кэшируются локально. В лекции BERT-модель занимала сотни мегабайт; последующие вызовы используют уже загруженные файлы и выполняются заметно быстрее.</div></details>
            </section>
            <section class="lesson-section" id="tokenizer-inside">
              <span class="section-number">04</span><h2>Внутри tokenizer: IDs, batch и <em>padding</em></h2>
              <p>Tokenizer разбивает строку на слова или части слов, находит их номера в фиксированном словаре и добавляет служебные токены. Операция <code>decode</code> позволяет увидеть, как набор ID восстанавливается обратно в читаемый текст.</p>
              <div class="card-grid">
                <article class="card"><h3>Cased</h3><p>Различает верхний и нижний регистр. <code>Apple</code> и <code>apple</code> могут токенизироваться по-разному.</p></article>
                <article class="card"><h3>Uncased</h3><p>Обычно приводит текст к нижнему регистру. Удобнее там, где регистр не несёт полезного сигнала.</p></article>
              </div>
              <p>В одном batch тензоры должны иметь прямоугольную форму. <strong>Padding</strong> дополняет короткие строки специальным ID до длины самой длинной строки, а <strong>attention mask</strong> сообщает модели, какие позиции являются заполнителем. <strong>Truncation</strong> обрезает последовательности, которые не помещаются в лимит контекста.</p>
              <div class="plain"><p class="kicker">Не путать</p><p>Padding делает длины одинаковыми, но не добавляет смысл. Без attention mask модель может учитывать заполнители как обычные позиции.</p></div>
            </section>
            <section class="lesson-section" id="task-examples">
              <span class="section-number">05</span><h2>Три задачи — три <em>головы</em></h2>
              <div class="card-grid">
                <article class="card"><h3>NER</h3><p>Token classification: для каждого фрагмента определяется PERSON, LOCATION, ORGANIZATION и другие классы.</p></article>
                <article class="card"><h3>Sentiment</h3><p>Sequence classification: всему тексту назначается позитивная, нейтральная или негативная метка.</p></article>
                <article class="card"><h3>Fill-mask</h3><p>Masked language model оценивает кандидатов для скрытого токена. Высокая связность ответа не гарантирует верный исторический факт.</p></article>
              </div>
              <div class="example"><p class="kicker">Ошибка из видео</p><p>Модель, обученная на английских твитах, неуверенно обработала русскую фразу «Сегодня был очень хороший день». Это не доказательство слабости Transformer: нарушено соответствие языка и обучающего распределения.</p></div>
            </section>
            <section class="lesson-section" id="debug-pipeline">
              <span class="section-number">06</span><h2>Если результат плохой — где <em>искать причину</em></h2>
              <div class="example"><div class="example-steps">
                <div class="example-step"><span>1</span><p>Проверьте задачу и язык модели.</p></div>
                <div class="example-step"><span>2</span><p>Убедитесь, что tokenizer взят из того же репозитория.</p></div>
                <div class="example-step"><span>3</span><p>Посмотрите, не обрезан ли текст и как объединяются subword-токены.</p></div>
                <div class="example-step"><span>4</span><p>Сравните несколько моделей на одном наборе реальных примеров.</p></div>
              </div></div>
              <div class="quiz" data-quiz data-answer="language,task,tokenizer">
                <p class="kicker">Несколько ответов</p><h3>Что проверить перед заменой модели?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="checkbox" value="language"><span>Совпадает ли язык обучения</span></label>
                  <label class="quiz-option"><input type="checkbox" value="task"><span>Соответствует ли голова нужной задаче</span></label>
                  <label class="quiz-option"><input type="checkbox" value="tokenizer"><span>Совместим ли tokenizer с весами</span></label>
                  <label class="quiz-option"><input type="checkbox" value="likes"><span>Есть ли у модели больше всего лайков на Hub</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Критичны язык, задача и tokenizer. Лайки — лишь слабый сигнал популярности."></span></div>
              </div>
            </section>
            <div class="source-box"><p>Полно по трём видео урока 3.3: обзор Hub, фильтры и карточки моделей, Auto-классы, pipeline, NER, sentiment и fill-mask.</p></div>
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
        },
        {
          id: "finetuning-workflow",
          title: "Fine-tuning классификатора шаг за шагом",
          deck: "От DatasetDict и токенизации до Trainer, validation-метрик и сохранённого checkpoint — без пропущенных связей.",
          time: "39 мин",
          level: "Код",
          body: `
            <section class="lesson-section" id="ft-task-data">
              <span class="section-number">01</span><h2>Задача и <em>данные</em></h2>
              <p class="lead">В практике берётся encoder-модель и задача классификации коротких новостей по четырём темам. Backbone создаёт представление текста, классификационная голова выдаёт четыре logits.</p>
              <div class="formula">текст → tokenizer → BERT backbone → [CLS] vector → linear head → 4 logits</div>
              <p><strong>Backbone</strong> — основная предобученная сеть. <strong>Head</strong> — небольшой слой под конкретную задачу. <code>AutoModelForSequenceClassification</code> загружает их вместе, поэтому вручную создавать логистическую регрессию не нужно.</p>
              <div class="plain"><p class="kicker">DatasetDict</p><p>Hugging Face хранит разделы <code>train</code>, <code>validation</code> и иногда <code>test</code> под единым интерфейсом. Столбцы обычно содержат текст и числовой <code>label</code>.</p></div>
            </section>
            <section class="lesson-section" id="ft-clean-tokenize">
              <span class="section-number">02</span><h2>Минимальная очистка и <em>токенизация</em></h2>
              <p>В лекции убираются технические HTML-фрагменты и лишние пробелы, но сохраняются числа, формы слов и пунктуация. Предобученный Transformer ожидает текст, похожий на его обучающие данные.</p>
              <pre class="formula">def tokenize(batch):
    return tokenizer(
        batch["text"],
        truncation=True,
        max_length=128
    )

tokenized = dataset.map(tokenize, batched=True)</pre>
              <p><code>map</code> применяет функцию ко всему Dataset. <code>batched=True</code> передаёт сразу группы строк. <strong>Truncation</strong> обрезает вход длиннее 128 токенов; это не то же самое, что padding.</p>
              <div class="takeaway"><strong>Цена обрезания</strong>Если важный признак часто находится в конце документа, простая обрезка ухудшит качество. Тогда используют умный выбор фрагмента, скользящее окно или модель с более длинным контекстом.</div>
            </section>
            <section class="lesson-section" id="ft-collator-mask">
              <span class="section-number">03</span><h2>Data collator, padding и <em>attention mask</em></h2>
              <p><code>DataCollatorWithPadding</code> во время сборки batch дополняет только до самой длинной последовательности в этом batch. Это экономнее, чем заранее добивать весь датасет до общего максимума.</p>
              <div class="card-grid">
                <article class="card"><h3>input_ids</h3><p>Номера токенов, включая служебные и padding.</p></article>
                <article class="card"><h3>attention_mask</h3><p>1 для содержательной позиции, 0 для padding — чтобы пустые элементы не участвовали во внимании.</p></article>
                <article class="card"><h3>labels</h3><p>Правильные номера классов, по которым считается loss.</p></article>
              </div>
            </section>
            <section class="lesson-section" id="ft-trainer">
              <span class="section-number">04</span><h2>Что получает <em>Trainer</em></h2>
              <div class="diagram"><div class="flow">
                <div class="flow-node"><strong>model</strong><span>backbone + head</span></div>
                <div class="flow-node"><strong>datasets</strong><span>train и validation</span></div>
                <div class="flow-node"><strong>collator</strong><span>собирает batch</span></div>
                <div class="flow-node"><strong>arguments</strong><span>epochs, batch, LR</span></div>
                <div class="flow-node"><strong>metrics</strong><span>как оценивать</span></div>
              </div></div>
              <p><code>TrainingArguments</code> задаёт число эпох, размер batch на устройстве, learning rate, warmup, weight decay, частоту оценки и сохранения checkpoints. Trainer выполняет forward, loss, backward и update.</p>
              <details><summary>Warmup и weight decay</summary><div><strong>Warmup</strong> начинает с маленького learning rate и постепенно поднимает его, снижая риск нестабильного старта. <strong>Weight decay</strong> — регуляризация, препятствующая чрезмерному росту весов и переобучению.</div></details>
            </section>
            <section class="lesson-section" id="ft-metrics">
              <span class="section-number">05</span><h2>Почему одной accuracy <em>мало</em></h2>
              <p>Функция <code>compute_metrics</code> получает logits, выбирает класс с максимальной оценкой и сравнивает с labels. В практике считаются accuracy, macro F1 и weighted F1.</p>
              <div class="card-grid">
                <article class="card"><h3>Accuracy</h3><p>Доля всех правильных ответов. Может скрыть провал редкого класса.</p></article>
                <article class="card"><h3>Macro F1</h3><p>F1 каждого класса усредняется поровну. Чувствителен к редким классам.</p></article>
                <article class="card"><h3>Weighted F1</h3><p>Учитывает размер классов. Ближе к общей массе данных, но может приглушить редкий класс.</p></article>
              </div>
              <div class="quiz" data-quiz data-answer="macro">
                <h3>Редкая тема новостей критически важна, а большинство примеров относится к другим темам. На какую сводную метрику смотреть особенно внимательно?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="radio" name="q-ftmetric" value="macro"><span>Macro F1</span></label>
                  <label class="quiz-option"><input type="radio" name="q-ftmetric" value="accuracy"><span>Только accuracy</span></label>
                  <label class="quiz-option"><input type="radio" name="q-ftmetric" value="loss"><span>Только train loss последнего batch</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Macro F1 даёт каждому классу равный вес и не позволяет массовому классу полностью скрыть ошибку редкого."></span></div>
              </div>
            </section>
            <section class="lesson-section" id="ft-checkpoints">
              <span class="section-number">06</span><h2>Validation, checkpoint и <em>test</em></h2>
              <p>Validation используют во время разработки: выбирать эпоху, learning rate и модель. Checkpoint сохраняет веса и состояние обучения. Независимый test запускают после принятия решений, иначе он постепенно превращается в ещё одну validation-выборку.</p>
              <div class="plain"><p class="kicker">После обучения</p><p>Сохраните tokenizer вместе с моделью. На inference применяйте ту же очистку, порядок labels и максимальную длину, что использовались при обучении.</p></div>
            </section>
            <section class="lesson-section" id="ft-model-comparison">
              <span class="section-number">07</span><h2>Сравнение BERT, RoBERTa и <em>DistilBERT</em></h2>
              <p>Одинаковая функция обучения позволяет менять только model ID и сравнивать кандидатов в одинаковых условиях. В демонстрации RoBERTa оказалась сильнее на конкретной задаче, а компактный DistilBERT мог обойти базовый BERT.</p>
              <div class="takeaway"><strong>Нет победителя заранее</strong>Большая или более новая модель не обязана быть лучшей на вашем домене. Запускайте одинаковый pipeline, несколько seed при возможности и сравнивайте validation-метрики, скорость и память.</div>
            </section>
            <section class="lesson-section" id="ft-two-strategies">
              <span class="section-number">08</span><h2>Две стратегии: end-to-end или <em>готовые embeddings</em></h2>
              <div class="card-grid">
                <article class="card"><h3>Fine-tuning сети</h3><p>Backbone и head обучаются на целевых данных. Выше потенциальное качество, но нужны GPU и аккуратные гиперпараметры.</p></article>
                <article class="card accent"><h3>Замороженный encoder</h3><p>Тексты один раз превращаются в векторы, затем поверх них учится CatBoost, логистическая регрессия или другая табличная модель.</p></article>
              </div>
              <p>Для второго варианта берут last hidden state, исключают padding по mask и агрегируют токены, например mean pooling. Получается один вектор на текст. Это быстрый baseline и хороший способ понять, линейно ли разделяются классы в готовом пространстве.</p>
              <p><strong>Training</strong> — обновление весов по известным labels. <strong>Inference</strong> — применение зафиксированной модели к новым текстам. Pipeline после обучения должен получать именно сохранённый checkpoint и tokenizer.</p>
              <div class="plain"><p class="kicker">Colab временный</p><p>Файлы в runtime исчезают после завершения сессии. Нужные checkpoints сохраняйте на подключённый диск или выгружайте в контролируемое хранилище.</p></div>
            </section>
            <div class="source-box"><p>Подробно по первой практической видеолекции 3.4: библиотеки Transformers/Datasets/Evaluate/Accelerate, DatasetDict, backbone и head, Trainer и метрики.</p></div>
          `
        },
        {
          id: "model-selection-serving",
          title: "Выбор и запуск модели: локально, API или vLLM",
          deck: "Как учитывать язык, задачу, память, задержку и объём запросов — и не выбирать модель только по размеру.",
          time: "23 мин",
          level: "Инженерия",
          body: `
            <section class="lesson-section" id="selection-checklist">
              <span class="section-number">01</span><h2>Пять фильтров выбора <em>модели</em></h2>
              <div class="card-grid">
                <article class="card"><h3>Задача</h3><p>Классификация, embeddings, token labeling или generation требуют разных архитектур и heads.</p></article>
                <article class="card"><h3>Язык и домен</h3><p>«Multilingual» не означает одинаковое качество на всех языках. Проверяйте именно свой корпус.</p></article>
                <article class="card"><h3>Ресурсы</h3><p>Размер весов, RAM/VRAM, тип чисел, длина контекста и допустимый batch.</p></article>
                <article class="card"><h3>Качество</h3><p>Одинаковый тест-набор, а не несопоставимые числа из разных карточек.</p></article>
                <article class="card"><h3>Эксплуатация</h3><p>Задержка, throughput, стоимость, лицензия и требования к приватности.</p></article>
              </div>
            </section>
            <section class="lesson-section" id="local-api">
              <span class="section-number">02</span><h2>Локальный запуск или <em>API</em></h2>
              <div class="card-grid">
                <article class="card"><h3>API</h3><p>Быстрый старт и нет заботы о GPU. Минусы: тарифы, сетевые задержки, зависимость от поставщика и правила передачи данных.</p></article>
                <article class="card accent"><h3>Локально</h3><p>Больше контроля, приватность и предсказуемость при большом потоке. Минусы: инфраструктура, обновления, мониторинг и GPU.</p></article>
              </div>
              <p>Для редкого прототипа API часто дешевле. Для постоянного массового потока локальная модель может окупиться, если команда умеет её обслуживать.</p>
            </section>
            <section class="lesson-section" id="vllm">
              <span class="section-number">03</span><h2>Что ускоряет <em>vLLM</em></h2>
              <p>vLLM — движок inference для генеративных моделей. Он эффективно управляет KV-cache, объединяет запросы в динамические batch и повышает количество обработанных токенов в секунду.</p>
              <div class="plain"><p class="kicker">Inference</p><p>Использование уже обученной модели для получения результата. Оптимизация inference не меняет знания модели — она уменьшает задержку и расход памяти.</p></div>
              <p><strong>Throughput</strong> — сколько запросов или токенов система обрабатывает за единицу времени. <strong>Latency</strong> — сколько ждёт один пользователь. Максимизация throughput может увеличить ожидание отдельного запроса, поэтому нужен продуктовый баланс.</p>
            </section>
            <section class="lesson-section" id="chat-template">
              <span class="section-number">04</span><h2>Chat template — служебная <em>грамматика диалога</em></h2>
              <p>Разные instruction-модели ожидают специальные токены ролей и конца сообщения. Chat template превращает список <code>system/user/assistant</code> в точную строку, на которой модель обучалась.</p>
              <div class="takeaway"><strong>Почему это важно</strong>Одинаковый текст с неправильными служебными токенами может заметно ухудшить следование инструкциям. Используйте шаблон из tokenizer/config конкретной модели.</div>
              <div class="quiz" data-quiz data-answer="language,latency,license">
                <p class="kicker">Несколько ответов</p><h3>Что обязательно проверить перед production-запуском?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="checkbox" value="language"><span>Качество на нужном языке и домене</span></label>
                  <label class="quiz-option"><input type="checkbox" value="latency"><span>Latency и throughput под реальной нагрузкой</span></label>
                  <label class="quiz-option"><input type="checkbox" value="license"><span>Лицензию и правила обработки данных</span></label>
                  <label class="quiz-option"><input type="checkbox" value="largest"><span>Что модель является самой большой из доступных</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Критичны язык, нагрузка и юридические условия. Размер сам по себе не гарантирует лучшего продукта."></span></div>
              </div>
            </section>
            <div class="source-box"><p>По практической части 3.4: критерии выбора, chat template, API против локального запуска и роль vLLM в ускорении inference.</p></div>
          `
        },
        {
          id: "open-models-resources",
          title: "Open source, open weights и ресурсы для запуска",
          deck: "Почему доступные веса ещё не делают модель полностью открытой, сколько памяти нужно и зачем нужны quantization и быстрый inference.",
          time: "19 мин",
          level: "Инженерия",
          body: `
            <section class="lesson-section" id="open-definitions"><span class="section-number">01</span><h2>Три разных уровня <em>доступа</em></h2>
              <div class="card-grid"><article class="card"><h3>Закрытая модель</h3><p>Доступ обычно через сайт или API. Веса и подробности обучения не выдаются, возможности дообучения определяет поставщик.</p></article><article class="card"><h3>Open weights</h3><p>Веса можно скачать и запускать самостоятельно, но данные, рецепт обучения или лицензия могут оставаться закрытыми.</p></article><article class="card wide accent"><h3>Open source</h3><p>Помимо весов доступны код, архитектура и достаточно подробная информация для изучения или воспроизведения — в пределах лицензии.</p></article></div>
              <p>В разговорной речи эти термины часто смешивают. Перед проектом проверяйте не ярлык, а конкретную лицензию: разрешён ли коммерческий запуск, модификация и распространение производной модели.</p>
            </section>
            <section class="lesson-section" id="model-sizes"><span class="section-number">02</span><h2>Размер модели и <em>где она поместится</em></h2>
              <p><strong>Frontier-модели</strong> обычно доступны только как сервис: самостоятельный запуск требует огромной инфраструктуры. Модели примерно на 7–8 млрд параметров уже можно пробовать в Colab или на мощном пользовательском GPU. Модели на десятки и сотни миллиардов требуют нескольких ускорителей и инженерии распределённого запуска.</p>
              <div class="plain"><p class="kicker">Грубая оценка только весов</p><p>8 млрд параметров в FP16 занимают около 16 ГБ; в 8‑битном виде — около 8 ГБ; в 4‑битном — около 4 ГБ. Реальный расход выше из-за KV-cache, промежуточных вычислений, служебных буферов и самого runtime.</p></div>
              <div class="formula">память весов ≈ параметры × число бит / 8</div>
            </section>
            <section class="lesson-section" id="quantization"><span class="section-number">03</span><h2>Quantization: меньше точность чисел, меньше <em>память</em></h2>
              <p>Квантизация хранит веса в более компактном формате — например, 8 или 4 бита вместо 16. Это облегчает локальный запуск и часто ускоряет inference, но может немного ухудшить качество.</p>
              <p>Нельзя смотреть только на размер файла. Длинный контекст увеличивает KV-cache; параллельные пользователи требуют дополнительной памяти; некоторые слои могут временно считать с большей точностью.</p>
              <div class="example"><p class="kicker">Практическое решение</p><p>Если модель едва помещается, уменьшите длину контекста и batch, включите 4‑битную загрузку или возьмите меньшую модель. Offload части слоёв в RAM возможен, но обычно резко увеличивает задержку.</p></div>
            </section>
            <section class="lesson-section" id="weights-or-api"><span class="section-number">04</span><h2>Когда выбирать API, а когда <em>свои веса</em></h2>
              <div class="card-grid"><article class="card"><h3>API</h3><p>Подходит для быстрого прототипа, редкой нагрузки и доступа к сильной модели без своей инфраструктуры.</p></article><article class="card"><h3>Самостоятельный запуск</h3><p>Нужен для закрытого контура, контроля версии, предсказуемой массовой нагрузки или специфического дообучения.</p></article></div>
              <div class="quiz" data-quiz data-answer="weights"><h3>Веса можно скачать, но обучающие данные и полный рецепт не раскрыты. Как точнее назвать модель?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-open" value="weights"><span>Open weights</span></label><label class="quiz-option"><input type="radio" name="q-open" value="full"><span>Полностью open source без оговорок</span></label><label class="quiz-option"><input type="radio" name="q-open" value="closed"><span>Полностью закрытая</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Доступ к весам позволяет локальный запуск, но не раскрывает автоматически данные, код обучения и все условия лицензии."></span></div></div>
            </section>
            <div class="source-box"><p>Полный разбор 12‑минутной видеолекции 5.2: encoder против генеративных LLM, closed/open‑weights/open‑source, классы размеров, память GPU, 4‑битная quantization и локальный inference.</p></div>
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
          deck: "Проходим путь от функции потерь и Word2Vec до encoder–decoder, контекстных векторов, Q/K/V, cross-attention и нескольких голов.",
          time: "58 мин",
          level: "Механика",
          body: `
            <section class="lesson-section" id="attention-ml-recap"><span class="section-number">01</span><h2>С чего начинается обучение: <em>параметры и ошибка</em></h2>
              <p class="lead">Нейросеть не получает готовые правила языка. Она начинает со случайных параметров, делает предсказание, сравнивает его с правильным ответом и постепенно меняет параметры так, чтобы ошибка уменьшалась.</p>
              <div class="example"><p class="kicker">Простой пример из лекции</p><p>Цена квартиры оценивается по площади и расстоянию до метро. Сначала коэффициенты <code>w₁</code> и <code>w₂</code> случайны; функция потерь показывает, насколько прогноз отличается от реальной цены. Обучение подбирает коэффициенты, уменьшающие эту разницу.</p></div>
              <div class="formula">признаки × веса → прогноз → loss → обновление весов</div>
              <p><strong>Параметры</strong>, или веса, — числа, которые изменяет обучение. <strong>Функция потерь</strong> — одна числовая мера ошибки. Для следующего токена обычно сравнивают предсказанное распределение вероятностей с правильным токеном.</p>
            </section>
            <section class="lesson-section" id="attention-vectors"><span class="section-number">02</span><h2>Компьютеру нужны числа: объект превращают в <em>вектор</em></h2>
              <p>Изображение можно представить матрицами интенсивностей RGB, а затем набором чисел. С текстом сложнее: номер слова в словаре сам по себе не передаёт значение.</p>
              <div class="card-grid"><article class="card"><h3>One-hot</h3><p>Вектор длиной со словарь: одна единица и остальные нули. Слова различимы, но «кот» и «кошка» не ближе, чем «кот» и «трактор».</p></article><article class="card"><h3>Embedding</h3><p>Короткий плотный вектор, положение которого обучается отражать полезные свойства и смысл объекта.</p></article></div>
              <p>Нормализация приводит признаки к сопоставимому масштабу и часто делает оптимизацию стабильнее. Но <strong>flattening</strong> (разворачивание матрицы) и <strong>нормализация</strong> — разные операции: первая меняет форму, вторая — масштаб значений.</p>
              <div class="quiz" data-quiz data-answer="embedding"><h3>Какое представление должно кодировать смысловую близость слов?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-vector-type" value="index"><span>Порядковый номер в словаре</span></label><label class="quiz-option"><input type="radio" name="q-vector-type" value="onehot"><span>Случайный one-hot без обучения</span></label><label class="quiz-option"><input type="radio" name="q-vector-type" value="embedding"><span>Обучаемый embedding</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Embedding обучают так, чтобы геометрия пространства была полезна для задачи и отражала контекстные закономерности."></span></div></div>
            </section>
            <section class="lesson-section" id="attention-word2vec"><span class="section-number">03</span><h2>Word2Vec: смысл слова восстанавливается по <em>соседям</em></h2>
              <p>Берём большой неразмеченный корпус и двигаем окно по тексту. Слова, которые встречаются в похожем контексте, получают близкие векторы. Это пример самосупервизии: правильные пары создаются из самого текста.</p>
              <div class="card-grid"><article class="card"><h3>CBOW</h3><p>По словам вокруг предсказывает центральное слово.</p></article><article class="card"><h3>Skip-gram</h3><p>По центральному слову предсказывает слова его окружения.</p></article></div>
              <div class="example"><p class="kicker">Классическая аналогия</p><p><code>король − мужчина + женщина ≈ королева</code>. Это не закон языка и не всегда срабатывает, но показывает, что некоторые отношения проявляются как направления в embedding-пространстве.</p></div>
              <p>Статический Word2Vec даёт слову один вектор во всех предложениях. Поэтому «лук» как оружие и «лук» как овощ сначала представлены одинаково. Transformer решает именно эту проблему: делает вектор контекстно-зависимым.</p>
              <div class="quiz" data-quiz data-answer="контекст" data-alternatives="окружение|соседние слова"><p class="kicker">Короткий ответ</p><h3>Как одним словом называется окружение, по которому Word2Vec восстанавливает смысл?</h3><div class="quiz-options"><label class="quiz-option"><input type="text" name="q-word2vec-context" placeholder="Введите термин"><span></span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Контекст задают окном соседних слов; его размер — выбранный разработчиком гиперпараметр."></span></div></div>
            </section>
            <section class="lesson-section" id="attention-encdec"><span class="section-number">04</span><h2>Encoder–decoder: извлечь смысл и <em>сгенерировать форму</em></h2>
              <p>В машинном переводе encoder принимает последовательность исходных токенов и создаёт представления их смысла. Decoder получает эти представления и уже сгенерированные токены, затем предсказывает следующее слово — снова и снова до специального токена конца.</p>
              <div class="formula">P(y₁…yₙ | x) = P(y₁ | x) · P(y₂ | x,y₁) · …</div>
              <p>«Перевод» здесь шире языков: формальный стиль можно преобразовать в разговорный, изображение — в описание, аудио — в текст. Если разные типы данных удалось закодировать в полезные векторы, decoder может генерировать нужную последовательность.</p>
              <div class="plain"><p class="kicker">Teacher forcing при обучении</p><p>На каждом шаге модели показывают правильные предыдущие токены и сравнивают вероятности следующего токена с эталоном. На использовании эталона уже нет — модель продолжает собственный вывод.</p></div>
            </section>
            <section class="lesson-section" id="attention-contextual"><span class="section-number">05</span><h2>Self-attention создаёт <em>контекстные векторы</em></h2>
              <p>На входе embedding слова описывает его общее значение. На выходе self-attention каждый токен получает новую версию, в которую подмешана релевантная информация других токенов той же последовательности.</p>
              <div class="example"><p class="kicker">Разница до и после attention</p><p>До внимания embedding описывает абстрактного «кота» и абстрактную «квартиру». После внимания представление «кота» уже означает конкретного кота из этой квартиры, а представление «квартиры» учитывает, что в ней находится этот кот.</p></div>
              <div class="example"><p class="kicker">Разрешение ссылки</p><p>В «The animal didn't cross the street because <strong>it</strong> was too tired» вектор <strong>it</strong> должен взять больше информации от <strong>animal</strong>. В похожем предложении «because it was too wide» внимание может сильнее связать <strong>it</strong> со <strong>street</strong>.</p></div>
            </section>
            <section class="lesson-section" id="attention-qkv"><span class="section-number">06</span><h2>Query, Key, Value — <em>три роли одного токена</em></h2>
              <div class="card-grid"><article class="card"><h3>Query (Q)</h3><p>Что текущему токену нужно найти в контексте.</p></article><article class="card"><h3>Key (K)</h3><p>По каким признакам другой токен предлагает себя для сравнения.</p></article><article class="card wide accent"><h3>Value (V)</h3><p>Какую информацию другой токен передаст, если окажется важным.</p></article></div>
              <p>Каждый входной embedding умножается на три обучаемые матрицы: <code>WQ</code>, <code>WK</code> и <code>WV</code>. Так из одного токена получаются три разные проекции. Матрицы сначала случайны, а во время обучения приспосабливаются к задаче.</p>
              <div class="plain"><p class="kicker">Аналогия поиска</p><p>Query — строка запроса, Key — заголовок найденной страницы, Value — её содержимое. Чем лучше запрос совпал с заголовком, тем больше содержимого страницы попадёт в итог.</p></div>
              <div class="formula">Attention(Q,K,V) = softmax(QKᵀ / √d) · V</div>
              <p>Скалярные оценки Q·K показывают совместимость. Деление на √d стабилизирует масштаб. Softmax превращает оценки в веса с суммой 1. Затем значения V смешиваются с этими весами.</p>
              <div class="quiz" data-quiz data-answer="q-k,softmax,v"><p class="kicker">Выберите все шаги</p><h3>Что выполняет attention?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="q-k"><span>Сравнивает Query с Key</span></label><label class="quiz-option"><input type="checkbox" value="softmax"><span>Нормирует оценки через softmax</span></label><label class="quiz-option"><input type="checkbox" value="v"><span>Смешивает Value с полученными весами</span></label><label class="quiz-option"><input type="checkbox" value="train"><span>Переобучает всю модель для каждого предложения</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="QKᵀ даёт совместимость, softmax — веса, а взвешенная сумма V — новое представление токена."></span></div></div>
            </section>
            <section class="lesson-section" id="attention-block"><span class="section-number">07</span><h2>Один блок Transformer: attention + <em>FFN</em></h2>
              <div class="diagram"><div class="flow"><div class="flow-node"><strong>Embeddings</strong><span>токены + позиции</span></div><div class="flow-node"><strong>Self-attention</strong><span>собрать контекст</span></div><div class="flow-node"><strong>Add & Norm</strong><span>сохранить сигнал</span></div><div class="flow-node"><strong>FFN</strong><span>преобразовать каждый токен</span></div><div class="flow-node"><strong>Add & Norm</strong><span>стабилизировать</span></div></div></div>
              <p><strong>Feed-forward network</strong> применяется к каждой позиции отдельно и учит нелинейные признаки. Популярная интуиция: attention переносит информацию между токенами, а FFN преобразует её и хранит часть выученных шаблонов. Но знания распределены по всей сети, а не лежат в одной «ячейке фактов».</p>
              <p><strong>Residual connection</strong> добавляет вход блока к его результату, а нормализация стабилизирует обучение глубокой сети. <strong>Positional encoding</strong> сообщает порядок: без него attention видел бы набор токенов, но хуже различал «кот укусил пса» и «пёс укусил кота».</p>
            </section>
            <section class="lesson-section" id="attention-decoder"><span class="section-number">08</span><h2>В decoder есть self-attention и <em>cross-attention</em></h2>
              <div class="card-grid"><article class="card"><h3>Masked self-attention</h3><p>Работает по уже созданной части ответа. Причинная маска закрывает будущие токены, чтобы модель не подсматривала эталон.</p></article><article class="card"><h3>Cross-attention</h3><p>Query приходит из decoder, а Key и Value — из encoder. Так генерация выбирает нужную информацию исходного текста.</p></article></div>
              <div class="example"><p class="kicker">При переводе</p><p>Когда decoder генерирует очередное английское слово, его Query ищет релевантные позиции французского предложения, закодированного encoder. Это связь между двумя последовательностями, а не внимание внутри одной.</p></div>
              <div class="quiz" data-quiz data-answer="decoder,encoder"><p class="kicker">Сопоставление</p><h3>Откуда cross-attention берёт Query и откуда — Key/Value?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="decoder"><span>Query — из decoder</span></label><label class="quiz-option"><input type="checkbox" value="encoder"><span>Key и Value — из encoder</span></label><label class="quiz-option"><input type="checkbox" value="future"><span>Query — из будущего правильного ответа</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Decoder формулирует, что ему сейчас нужно, а encoder предоставляет ключи и содержимое исходной последовательности."></span></div></div>
            </section>
            <section class="lesson-section" id="attention-heads"><span class="section-number">09</span><h2>Multi-head attention: несколько способов <em>смотреть одновременно</em></h2>
              <p>Одна голова — один отдельный набор матриц WQ/WK/WV. Несколько голов параллельно строят собственные веса внимания, их результаты объединяются и снова проецируются.</p>
              <div class="card-grid"><article class="card"><h3>Голова 1</h3><p>Может выделить синтаксические зависимости.</p></article><article class="card"><h3>Голова 2</h3><p>Может связывать местоимение с объектом.</p></article><article class="card wide"><h3>Другие головы</h3><p>Могут отслеживать близость по смыслу, границы фразы или дальние связи. Это не назначается вручную и не гарантирует понятной роли каждой головы.</p></article></div>
              <div class="quiz" data-quiz data-answer="weights"><h3>Что является непосредственным результатом softmax над оценками QKᵀ?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-att" value="tokens"><span>Новые токены</span></label><label class="quiz-option"><input type="radio" name="q-att" value="weights"><span>Нормированные веса важности</span></label><label class="quiz-option"><input type="radio" name="q-att" value="loss"><span>Ошибка обучения</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Softmax превращает оценки совместимости в распределение весов; ими смешиваются Value-векторы."></span></div></div>
              <div class="takeaway"><strong>Главное, что стоит унести</strong>Attention не «понимает» слово отдельно. Он каждый раз строит его новое представление из самого токена и релевантных частей текущего контекста.</div>
            </section>
            <div class="source-box"><p>Полный структурированный разбор 57‑минутной видеолекции <a href="https://stepik.org/lesson/1786156/step/1?unit=1811830" target="_blank" rel="noreferrer">4.1 «Recap и погружение в attention»</a>: параметры и loss, представление объектов векторами, one-hot, Word2Vec, encoder–decoder, авторегрессионная генерация, контекстные embeddings, Q/K/V, FFN, cross-attention и multi-head attention. Позиции, residual connections и causal mask добавлены как необходимые связующие пояснения.</p></div>
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
          id: "retrieval-models",
          title: "Dense, sparse и reranker: три уровня поиска",
          deck: "Почему смысловые векторы путают близкие лекарства, BM25 спасает точные названия, а cross‑encoder нельзя запускать по миллиону документов.",
          time: "35 мин",
          level: "Углубление",
          body: `
            <section class="lesson-section" id="dense-embeddings">
              <span class="section-number">01</span><h2>Dense embeddings: смысл как <em>направление</em></h2>
              <p class="lead">Encoder превращает текст в плотный вектор из сотен чисел. Обучение располагает семантически похожие фразы рядом, поэтому «погода прекрасная» может найти «на улице солнечно» без совпадающих слов.</p>
              <div class="example"><p class="kicker">Классическая интуиция</p><p>В старых word embeddings наблюдали аналогии вроде «король − мужчина + женщина ≈ королева». Современные sentence embeddings сложнее и зависят от контекста, но сохраняют идею геометрических отношений.</p></div>
              <div class="formula">cosine(q,d) = (q · d) / (||q|| × ||d||)</div>
              <p>Косинус сравнивает угол, а не абсолютную длину. Для нормализованных векторов поиск можно свести к быстрому скалярному произведению.</p>
            </section>
            <section class="lesson-section" id="bi-cross-encoder">
              <span class="section-number">02</span><h2>Bi‑encoder против <em>cross‑encoder</em></h2>
              <div class="card-grid">
                <article class="card"><h3>Bi‑encoder</h3><p>Запрос и документ кодируются отдельно. Векторы документов считают заранее, поэтому можно искать среди миллионов chunks.</p></article>
                <article class="card accent"><h3>Cross‑encoder</h3><p>Получает пару «запрос + документ» одновременно и напрямую оценивает релевантность. Обычно точнее, но требует отдельного forward для каждой пары.</p></article>
              </div>
              <p>Cross‑encoder по миллиону документов означал бы миллион дорогих запусков на каждый вопрос. Поэтому bi‑encoder быстро выбирает top‑50, а cross‑encoder переранжирует только этих кандидатов.</p>
              <div class="formula">1 000 000 chunks → bi‑encoder ANN → 50 candidates → cross‑encoder → top 5</div>
            </section>
            <section class="lesson-section" id="sparse-search">
              <span class="section-number">03</span><h2>Sparse search: когда важны <em>точные слова</em></h2>
              <p><strong>TF</strong> увеличивает вес термина, который часто встречается в конкретном документе. <strong>IDF</strong> уменьшает вес слов, встречающихся почти везде. Так редкий артикул, фамилия или код становится важнее союза «и».</p>
              <div class="formula">TF‑IDF(term, doc) = частота в doc × log(число документов / документов с term)</div>
              <p><strong>BM25</strong> развивает эту идею: насыщает вклад повторений и нормализует длину документа, чтобы длинные тексты не побеждали только потому, что в них больше слов.</p>
              <div class="example"><p class="kicker">Лекарства из лекции</p><p>Dense-поиск может считать два похожих препарата семантически близкими. Если пользователю назначено точное название и аналог противопоказан, BM25 лучше удержит буквальное совпадение.</p></div>
            </section>
            <section class="lesson-section" id="hybrid-search">
              <span class="section-number">04</span><h2>Hybrid search объединяет <em>два сигнала</em></h2>
              <p>Dense ловит перефразирование, sparse — точные термины. Результаты объединяют по нормализованным score или ранговым позициям, например Reciprocal Rank Fusion, затем передают reranker.</p>
              <div class="plain"><p class="kicker">RRF по-простому</p><p>Документ получает баллы за высокую позицию в каждом списке. Не нужно напрямую сравнивать несопоставимые cosine-score и BM25-score.</p></div>
            </section>
            <section class="lesson-section" id="matryoshka">
              <span class="section-number">05</span><h2>Matryoshka embeddings: менять размер без <em>переобучения</em></h2>
              <p>Такие модели обучают размещать наиболее полезные признаки в начале вектора. Для грубого быстрого поиска можно взять первые 64 измерения, для точной стадии — все 768 или 1024.</p>
              <p>Это управляемый компромисс: короткий вектор экономит память и ускоряет сравнение, полный сохраняет больше нюансов. Простое случайное обрезание обычного embedding такой гарантии не даёт.</p>
              <div class="quiz" data-quiz data-answer="dense,sparse,rerank">
                <p class="kicker">Сопоставьте систему</p><h3>Какие компоненты нужны для качественного поиска по базе с перефразированиями и артикулами?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="checkbox" value="dense"><span>Dense retriever для смысловых совпадений</span></label>
                  <label class="quiz-option"><input type="checkbox" value="sparse"><span>BM25 для точных терминов</span></label>
                  <label class="quiz-option"><input type="checkbox" value="rerank"><span>Cross‑encoder для точной сортировки малого списка</span></label>
                  <label class="quiz-option"><input type="checkbox" value="crossall"><span>Cross‑encoder сразу по всем миллионам chunks</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Практичная схема — dense + sparse для быстрого отбора и cross‑encoder только для небольшого top‑k."></span></div>
              </div>
            </section>
            <div class="source-box"><p>Полно по видео 4.2 об embeddings в RAG: косинус, bi/cross-encoder, TF‑IDF, BM25, гибридный поиск и Matryoshka embeddings.</p></div>
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
          id: "rag-competition",
          title: "Проект: поиск по судебным актам",
          deck: "Разбираем постановку итогового соревнования, данные, Recall@5, публичную и скрытую проверку и пути улучшения retrieval.",
          time: "39 мин",
          level: "Проект",
          body: `
            <section class="lesson-section" id="competition-task"><span class="section-number">01</span><h2>Реальная задача: найти внутренний <em>прецедент</em></h2>
              <p class="lead">Юристу недостаточно общих материалов из открытой справочной системы. Ему нужно понять, как похожая ситуация уже решалась внутри конкретной организации, и открыть исходный судебный акт.</p>
              <p>Полная система могла бы найти документы и сгенерировать ответ. В соревновании изолирован первый критический слой — retrieval. Для каждого вопроса нужно вернуть пять наиболее релевантных документов.</p>
              <div class="takeaway"><strong>Почему без генерации</strong>Если правильного акта нет в контексте, LLM не знает внутреннего прецедента. Красивый текст не компенсирует сломанный поиск.</div>
            </section>
            <section class="lesson-section" id="competition-metric"><span class="section-number">02</span><h2>Целевая метрика — <em>Recall@5</em></h2>
              <p>В упрощённой постановке у каждого вопроса есть один самый релевантный документ. Успех равен 1, если он присутствует в top‑5, и 0 — если отсутствует. Позиция внутри пятёрки не учитывается.</p>
              <div class="formula">Recall@5 = число вопросов с правильным документом в top‑5 / число всех вопросов</div>
              <div class="example"><p class="kicker">Пример</p><p>Для 100 вопросов правильный акт попал в пятёрку у 78. Recall@5 = 0,78. Если нужный документ всегда первый, результат всё равно 0,78: данная метрика не измеряет порядок внутри top‑5.</p></div>
              <p>В реальном продукте релевантных документов может быть несколько, а порядок важен пользователю. Тогда понадобятся дополнительные метрики, разобранные в следующем уроке.</p>
            </section>
            <section class="lesson-section" id="competition-data"><span class="section-number">03</span><h2>Что находится в <em>данных</em></h2>
              <div class="card-grid">
                <article class="card"><h3>Corpus</h3><p>468 обезличенных судебных актов: document id и очищенный полный текст.</p></article>
                <article class="card"><h3>Train</h3><p>700 вопросов с правильным document id, эталонным ответом, подтверждающим фрагментом и темой.</p></article>
                <article class="card wide"><h3>Test</h3><p>350 вопросов без ответов. Для каждого требуется сформировать пять document id в точном формате sample submission.</p></article>
              </div>
              <p><strong>Gold evidence</strong> — фрагмент документа, который непосредственно обосновывает эталонный ответ. Для чистого retrieval достаточно document id, но evidence помогает понять, какую часть длинного акта должен уметь находить будущий RAG.</p>
              <div class="plain"><p class="kicker">Почему данные выглядят необычно чистыми</p><p>В реальной системе документы часто приходят как DOCX, PDF или сканы. Здесь OCR, удаление артефактов и обезличивание выполнены заранее, чтобы упражнение фокусировалось на поиске.</p></div>
            </section>
            <section class="lesson-section" id="competition-validation"><span class="section-number">04</span><h2>Public и private leaderboard защищают от <em>переобучения</em></h2>
              <p>Публичная часть теста даёт текущий score во время соревнования. Скрытая часть открывается только в конце и формирует итоговый результат. Так нельзя бесконечно подстраивать решение под известную половину теста.</p>
              <div class="plain"><p class="kicker">Правильная привычка</p><p>Не выбирайте каждый параметр по leaderboard. Отделите validation из train, ведите журнал экспериментов и меняйте по одному компоненту. Иначе улучшение на публичной части может не повториться на скрытых данных.</p></div>
            </section>
            <section class="lesson-section" id="competition-improvements"><span class="section-number">05</span><h2>Лестница улучшений <em>retrieval</em></h2>
              <ol><li>Сделать воспроизводимый baseline на embeddings.</li><li>Проверить очистку текста и разбиение длинных актов.</li><li>Сравнить несколько embedding-моделей на собственной validation.</li><li>Добавить BM25 и гибридное объединение.</li><li>Переранжировать кандидатов cross‑encoder.</li><li>Попробовать расширение запроса: ключевые слова, юридические термины или несколько перефразирований.</li></ol>
              <p>Train нужен не только для обучения весов. Он показывает распределение вопросов, типичные соответствия и даёт validation для честного сравнения подходов. При желании на нём можно дообучить retriever или cross‑encoder.</p>
              <div class="quiz" data-quiz data-answer="validation,hybrid,reranker"><p class="kicker">Несколько ответов</p><h3>Какие изменения можно честно проверить до отправки на leaderboard?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="validation"><span>Выделить validation из train</span></label><label class="quiz-option"><input type="checkbox" value="hybrid"><span>Сравнить dense и hybrid retrieval</span></label><label class="quiz-option"><input type="checkbox" value="reranker"><span>Проверить reranker на тех же запросах</span></label><label class="quiz-option"><input type="checkbox" value="manual"><span>Вручную вписать ответы теста, подглядывая в leaderboard</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Локальная validation позволяет сравнивать методы воспроизводимо; подгонка под публичный score ведёт к переобучению."></span></div></div>
            </section>
            <section class="lesson-section" id="competition-private"><span class="section-number">06</span><h2>Почему закрытый контур меняет <em>архитектуру</em></h2>
              <p>В исходном бизнес-кейсе внутренние документы нельзя отправлять внешнему API. Значит, embeddings, индекс и генератор должны работать внутри инфраструктуры организации. Небольшая открытая модель может оказаться практичнее сильной облачной, которую юридически нельзя использовать.</p>
              <div class="takeaway"><strong>Архитектуру задаёт не только качество</strong>Приватность, лицензия, стоимость и доступное железо — такие же требования, как Recall@5.</div>
            </section>
            <div class="source-box"><p>Полный разбор 37‑минутной видеолекции 5.1: бизнес-кейс, правила соревнования, 468 документов, train/test, gold evidence, Recall@5, public/private leaderboard, query expansion и закрытый контур.</p></div>
          `
        },
        {
          id: "rag-hands-on",
          title: "Практика: RAG по PDF от начала до ответа",
          deck: "Разбираем весь ноутбук на примере книги правил D&D: загрузка PDF, chunks, embeddings, FAISS, prompt и ссылки на страницы.",
          time: "36 мин",
          level: "Практика",
          body: `
            <section class="lesson-section" id="rag-practice-goal"><span class="section-number">01</span><h2>Задача и <em>baseline</em></h2>
              <p class="lead">Есть большой PDF с правилами настольной игры. Обычная LLM может путать редакции и придумывать детали. Соберём простой RAG, который ищет нужные страницы и отвечает только по ним.</p>
              <div class="formula">PDF → текст по страницам → chunks → embeddings → FAISS → top‑5 → prompt → ответ + источники</div>
              <p><strong>Baseline</strong> — первая простая работающая версия. Она нужна не потому, что идеальна, а чтобы измерять пользу каждого следующего усложнения.</p>
            </section>
            <section class="lesson-section" id="rag-notebook"><span class="section-number">02</span><h2>Среда, библиотеки и <em>секреты</em></h2>
              <p>Ноутбук запускается в Google Colab: это временная удалённая машина, где можно выбрать CPU или GPU. После перезапуска установленные пакеты и загруженные файлы могут исчезнуть, поэтому важные результаты сохраняют отдельно.</p>
              <div class="card-grid"><article class="card"><h3>LLM API</h3><p>Для генерации нужны base URL, имя модели и API‑ключ. Многие провайдеры поддерживают OpenAI‑совместимый формат, поэтому при смене сервиса часто меняются только адрес, ключ и model id.</p></article><article class="card"><h3>Локальный fallback</h3><p>Embedding-модель можно загрузить из Hugging Face и считать векторы локально. Это полезно, если API недоступен или данные нельзя отправлять наружу.</p></article></div>
              <div class="takeaway"><strong>Никогда не вставляйте ключ в открытый ноутбук</strong>Храните его в разделе Secrets или переменной окружения. Если ключ попал в публикацию, отзовите его и создайте новый.</div>
            </section>
            <section class="lesson-section" id="rag-pdf-chunks"><span class="section-number">03</span><h2>Извлечение PDF и <em>chunking</em></h2>
              <p>Текст извлекается постранично. Номер страницы сохраняется как metadata, чтобы затем показать пользователю источник ответа.</p>
              <div class="example"><p class="kicker">Параметры из демонстрации</p><p><code>chunk_size = 1200</code> символов, небольшое перекрытие и <code>top_k = 5</code>. Это стартовые значения, а не универсальный стандарт: их нужно подбирать на своём тестовом наборе.</p></div>
              <p><strong>Overlap</strong> дублирует границу соседних chunks. Если определение начинается в конце одной части и заканчивается в следующей, оно не разрывается полностью.</p>
              <div class="plain"><p class="kicker">Что часто ломается</p><p>Сканированный PDF может не содержать текстового слоя — тогда нужен OCR. Таблицы, колонки и колонтитулы тоже требуют отдельной обработки; иначе в индекс попадёт перемешанный текст.</p></div>
            </section>
            <section class="lesson-section" id="rag-faiss"><span class="section-number">04</span><h2>Embeddings и индекс <em>FAISS</em></h2>
              <p>Каждый chunk кодируется embedding-моделью. FAISS хранит векторы и быстро ищет ближайшие к вектору вопроса. Сам FAISS — не «понимающая база знаний»: смысл появляется из embedding-модели, а индекс лишь ускоряет сравнение.</p>
              <div class="formula">embedding(question) → nearest vectors → chunks + page metadata</div>
              <p>Важно использовать совместимые преобразования для документов и вопросов. Если модель предлагает разные префиксы вроде <code>query:</code> и <code>passage:</code>, их нельзя игнорировать.</p>
            </section>
            <section class="lesson-section" id="rag-answer-prompt"><span class="section-number">05</span><h2>Собираем контекст и <em>prompt</em></h2>
              <p>Из top‑5 формируется контекст: текст chunk, страница, источник и идентификатор. В system-инструкции модель просят отвечать по предоставленному материалу, не выдумывать отсутствующее и перечислять использованные источники.</p>
              <div class="example"><p class="kicker">Запрос из семинара</p><p>На вопрос «Как работает класс брони?» retriever нашёл фрагменты про Armor Class. LLM собрала объяснение и вернула страницы, на которые можно перейти для проверки.</p></div>
              <p>Ссылки повышают контролируемость, но не являются доказательством сами по себе: проверьте, что указанный chunk действительно подтверждает конкретное утверждение.</p>
            </section>
            <section class="lesson-section" id="rag-iterate"><span class="section-number">06</span><h2>Улучшение — это <em>итерации</em>, а не один запуск</h2>
              <div class="card-grid"><article class="card"><h3>Плохой поиск</h3><p>Поменяйте chunking, embedding-модель, top‑k, добавьте BM25 или reranker.</p></article><article class="card"><h3>Нужный chunk найден</h3><p>Если ответ всё равно плох, правьте порядок контекста, prompt, модель генерации и формат цитат.</p></article><article class="card wide"><h3>Провайдер недоступен</h3><p>Обработайте timeout и лимиты, задайте повтор с задержкой и проверенный fallback. Смена модели не должна молча менять формат результата.</p></article></div>
              <div class="quiz" data-quiz data-answer="page,secrets,test"><p class="kicker">Несколько ответов</p><h3>Что превратит демонстрационный ноутбук в более надёжный прототип?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="page"><span>Хранить страницу и источник каждого chunk</span></label><label class="quiz-option"><input type="checkbox" value="secrets"><span>Убрать API‑ключи в Secrets</span></label><label class="quiz-option"><input type="checkbox" value="test"><span>Собрать вопросы и измерять качество после изменений</span></label><label class="quiz-option"><input type="checkbox" value="magic"><span>Считать chunk_size = 1200 идеальным для всех PDF</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Метаданные дают проверяемость, Secrets защищают доступ, а тесты позволяют улучшать систему без самообмана."></span></div></div>
            </section>
            <div class="source-box"><p>Полный разбор 35‑минутного практического видео 4.3: Colab, OpenAI‑совместимые API, Secrets, PDF по страницам, chunk_size/overlap, локальные embeddings, FAISS, top‑5, prompt и вывод источников.</p></div>
          `
        },
        {
          id: "rag-generation",
          title: "Генерация в RAG: от найденных chunks до ответа",
          deck: "Запускаем генератор на ограниченном железе, правильно собираем контекст и управляем тем, как модель выбирает следующие токены.",
          time: "70 мин",
          level: "Практика + теория",
          body: `
            <section class="lesson-section" id="generation-two-systems"><span class="section-number">01</span><h2>Retrieval и generation — <em>две разные системы</em></h2>
              <p class="lead">RAG не заканчивается на найденном документе. Retriever выбирает доказательства, а генератор превращает их в понятный ответ. Ошибки этих этапов выглядят похоже, но исправляются по-разному.</p>
              <div class="formula">вопрос → top‑k chunks → prompt → LLM → ответ с опорой на источники</div>
              <div class="card-grid"><article class="card"><h3>Нужного факта нет в top‑k</h3><p>Исправляем разбиение, embeddings, sparse/dense-поиск, fusion или reranking. Prompt не может восстановить отсутствующее доказательство.</p></article><article class="card"><h3>Факт найден, ответ неверен</h3><p>Проверяем инструкцию, длину и порядок контекста, модель, параметры декодирования и формат результата.</p></article></div>
              <div class="quiz" data-quiz data-answer="generation"><h3>Правильный chunk стоит первым, но модель добавляет неподтверждённую дату. Какой этап проверять первым?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-gen-layer" value="retrieval"><span>Retrieval</span></label><label class="quiz-option"><input type="radio" name="q-gen-layer" value="generation"><span>Generation и prompt</span></label><label class="quiz-option"><input type="radio" name="q-gen-layer" value="index"><span>Только размер индекса</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Доказательство уже найдено. Значит, нужно проверить, как оно передано генератору и почему ответ вышел за его пределы."></span></div></div>
            </section>
            <section class="lesson-section" id="generation-answerability"><span class="section-number">02</span><h2>Если доказательств нет, правильный результат — <em>не ответ</em></h2>
              <p>Фраза в prompt «не выдумывай» полезна, но не гарантирует отказ. До вызова LLM система должна оценить, есть ли среди найденных фрагментов достаточная опора: прошёл ли лучший результат проверенный порог релевантности, сработал ли reranker, не пуст ли набор документов.</p>
              <div class="diagram"><div class="flow"><div class="flow-node"><strong>Retrieval</strong><span>получить кандидатов</span></div><div class="flow-node"><strong>Answerability gate</strong><span>есть ли доказательство</span></div><div class="flow-node"><strong>Да</strong><span>собрать контекст и ответить</span></div><div class="flow-node"><strong>Нет</strong><span>честный отказ или уточнение</span></div></div></div>
              <div class="plain"><p class="kicker">Порог не берут «из головы»</p><p>Значения cosine similarity несопоставимы между всеми моделями и корпусами. Порог выбирают на размеченных вопросах: сравнивают релевантные и нерелевантные находки и учитывают цену ошибочного ответа и лишнего отказа.</p></div>
              <div class="example"><p class="kicker">Безопасный ответ</p><p>«В доступных документах нет подтверждения этому утверждению. Уточните период или укажите нужный регламент». Это лучше правдоподобной догадки без источника.</p></div>
              <div class="quiz" data-quiz data-answer="refuse"><h3>Лучший chunk не проходит проверенный порог, а остальные ещё слабее. Что должна сделать система?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-answerability" value="refuse"><span>Отказаться или запросить уточнение</span></label><label class="quiz-option"><input type="radio" name="q-answerability" value="guess"><span>Попросить LLM догадаться по общим знаниям</span></label><label class="quiz-option"><input type="radio" name="q-answerability" value="temperature"><span>Повысить температуру</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Если проверяемой опоры нет, генерация создаёт риск галлюцинации. Нужен отказ, уточнение или передача человеку."></span></div></div>
            </section>
            <section class="lesson-section" id="generation-quantization"><span class="section-number">03</span><h2>Как поместить LLM на доступную GPU: <em>квантизация</em></h2>
              <p>Веса модели обычно хранятся числами высокой точности. Квантизация представляет их меньшим числом бит. Например, 7 миллиардов параметров в 16‑битном виде требуют только под веса около 14 ГБ, а в 4‑битном — примерно 3,5 ГБ, не считая служебной памяти и KV‑кэша.</p>
              <div class="formula">память весов ≈ число параметров × число бит / 8</div>
              <p>В практической лекции 7B instruct-модель загружается через конфигурацию <code>BitsAndBytesConfig</code>: веса — в 4 битах, вычисления — в <code>bfloat16</code>. Это разные настройки: формат хранения сжимает модель, а вычислительный тип определяет, с какой точностью выполняются операции.</p>
              <div class="plain"><p class="kicker">Цена экономии</p><p>Квантизация может немного снизить качество, а не каждая видеокарта поддерживает каждый тип вычислений. Всегда проверяйте документацию модели, объём памяти и качество на своих вопросах.</p></div>
              <div class="quiz" data-quiz data-answer="weights,compute"><p class="kicker">Несколько ответов</p><h3>Какие две вещи нельзя путать в конфигурации квантизации?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="weights"><span>Формат хранения весов</span></label><label class="quiz-option"><input type="checkbox" value="compute"><span>Тип чисел для вычислений</span></label><label class="quiz-option"><input type="checkbox" value="font"><span>Шрифт интерфейса</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Модель можно хранить в 4 битах, но выполнять матричные операции, например, в bfloat16."></span></div></div>
            </section>
            <section class="lesson-section" id="generation-context"><span class="section-number">04</span><h2>Контекст должен быть <em>коротким и проверяемым</em></h2>
              <p>В демонстрации в prompt передаются три лучших документа. Каждый фрагмент получает номер или document id. Это позволяет потребовать ссылки вида <code>[1]</code> и затем программно проверить, существовал ли указанный источник.</p>
              <ol><li>Отсортируйте найденные chunks по итоговому score.</li><li>Обрежьте каждый до разумной длины и не переполняйте контекстное окно.</li><li>Сохраните id, страницу, заголовок и ссылку.</li><li>Явно отделите документы друг от друга и от вопроса.</li><li>Попросите отказаться от ответа, если доказательства нет.</li></ol>
              <div class="example"><p class="kicker">Упрощённый шаблон</p><p><strong>System:</strong> «Ты помощник. Отвечай только по источникам. После каждого утверждения укажи [номер]. Если ответа нет, скажи об этом». <strong>User:</strong> «Источники: [1] … [2] … Вопрос: …»</p></div>
              <div class="takeaway"><strong>Большое окно не означает хороший контекст</strong>Лишние документы конкурируют за внимание модели, повышают цену и увеличивают риск смешать несовместимые сведения.</div>
            </section>
            <section class="lesson-section" id="generation-model-card"><span class="section-number">05</span><h2>Почему нужна именно <em>instruct-модель</em></h2>
              <p>Базовая модель в первую очередь продолжает текст. Instruct-версию дополнительно учили следовать запросам и поддерживать роли сообщений. В карточке модели на Hugging Face проверяют языки, лицензию, размер контекста, рекомендуемый формат диалога и пример запуска.</p>
              <p><code>apply_chat_template</code> превращает массив сообщений <code>system/user/assistant</code> в точную последовательность специальных токенов, ожидаемую конкретной моделью. Самодельный формат может ухудшить ответы, даже если текст инструкции тот же.</p>
              <div class="quiz" data-quiz data-answer="карточка модели" data-alternatives="model card|modelcard"><p class="kicker">Короткий ответ</p><h3>Где сначала искать рекомендуемый chat template, контекстное окно и поддерживаемые языки?</h3><div class="quiz-options"><label class="quiz-option"><input type="text" name="q-model-card" placeholder="Введите два слова"><span></span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Карточка модели — документация именно той версии, которую вы собираетесь запускать."></span></div></div>
            </section>
            <section class="lesson-section" id="generation-decoding"><span class="section-number">06</span><h2>Декодирование: как вероятности превращаются в <em>текст</em></h2>
              <p>На каждом шаге LLM выдаёт распределение вероятностей следующего токена. Декодирование решает, какой токен выбрать. Поэтому одна и та же модель с одним prompt может отвечать по-разному.</p>
              <div class="card-grid">
                <article class="card"><h3>Greedy</h3><p>Всегда берёт самый вероятный токен. Просто и воспроизводимо, но локально лучший выбор не гарантирует лучшую фразу и иногда ведёт к повторам.</p></article>
                <article class="card"><h3>Top‑k</h3><p>Оставляет k самых вероятных токенов и выбирает среди них. Жёстко контролирует размер набора кандидатов.</p></article>
                <article class="card"><h3>Top‑p</h3><p>Берёт минимальный набор токенов, чья суммарная вероятность достигла p. Размер набора автоматически меняется по ситуации.</p></article>
                <article class="card"><h3>Beam search</h3><p>Параллельно ведёт несколько продолжений и сравнивает вероятность целых цепочек, а не только ближайшего токена.</p></article>
              </div>
              <div class="example"><p class="kicker">Top‑p без магии</p><p>Вероятности токенов: 0,45; 0,30; 0,15; 0,07; 0,03. При <code>top_p = 0.8</code> нужны первые три: их сумма 0,90, а первые два дают только 0,75.</p></div>
              <div class="quiz" data-quiz data-answer="3"><h3>Сколько токенов войдёт в nucleus при вероятностях 0,45; 0,30; 0,15; 0,07; 0,03 и top_p = 0,8?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-topp" value="2"><span>2</span></label><label class="quiz-option"><input type="radio" name="q-topp" value="3"><span>3</span></label><label class="quiz-option"><input type="radio" name="q-topp" value="5"><span>5</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Два токена дают 0,75 — этого мало. После третьего накопленная вероятность равна 0,90."></span></div></div>
            </section>
            <section class="lesson-section" id="generation-temperature"><span class="section-number">07</span><h2>Температура меняет не знания, а <em>форму выбора</em></h2>
              <p>Низкая температура делает распределение резче: модель чаще выбирает наиболее вероятные токены и отвечает стабильнее. Высокая выравнивает вероятности: текст становится разнообразнее, но растёт риск ухода от темы и неподтверждённых деталей.</p>
              <div class="card-grid"><article class="card"><h3>Юридический RAG</h3><p>Обычно нужна низкая температура и строгий формат: ценятся повторяемость и верность источнику.</p></article><article class="card"><h3>Мозговой штурм</h3><p>Допустима более высокая температура: несколько необычных вариантов могут быть полезнее одного предсказуемого.</p></article></div>
              <p>Температура не исправляет поиск и не добавляет знания. Это гиперпараметр, который выбирают по задаче и проверяют на тестовом наборе.</p>
            </section>
            <section class="lesson-section" id="generation-evaluation"><span class="section-number">08</span><h2>Как оценивать <em>сгенерированный ответ</em></h2>
              <div class="card-grid"><article class="card"><h3>Token F1</h3><p>Гармоническое среднее точности и полноты совпавших токенов ответа и эталона. Плохо видит перефразирование.</p></article><article class="card"><h3>BLEU и n‑grams</h3><p>Сравнивают короткие последовательности слов. Полезны в узких задачах, но семантически равные ответы всё равно могут получить низкий балл.</p></article><article class="card"><h3>Embedding similarity</h3><p>Сравнивает смысл ответа с эталоном или подтверждающим фрагментом, но не гарантирует истинность каждой детали.</p></article><article class="card"><h3>LLM-as-a-judge</h3><p>Сильной модели дают вопрос, контекст, ответ и рубрику. Судья должен быть сильнее генератора и тоже нуждается в калибровке.</p></article></div>
              <p>В лекции предлагается собрать 50–100 вручную оценённых ответов, затем подобрать набор метрик и веса так, чтобы автоматическая оценка коррелировала с человеческой. Не ищите одну «идеальную» цифру: измеряйте правильность, полноту, faithfulness, форму, задержку и стоимость отдельно.</p>
              <div class="quiz" data-quiz data-answer="context,rubric,calibration"><p class="kicker">Несколько ответов</p><h3>Что нужно для более надёжного LLM-судьи?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="context"><span>Передать доказательный контекст</span></label><label class="quiz-option"><input type="checkbox" value="rubric"><span>Задать явную рубрику оценки</span></label><label class="quiz-option"><input type="checkbox" value="calibration"><span>Сверить оценки с людьми</span></label><label class="quiz-option"><input type="checkbox" value="blind"><span>Попросить судить без вопроса и источников</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Судья не должен угадывать критерии или факты: ему нужны контекст и рубрика, а его оценки проверяют на ручной разметке."></span></div></div>
            </section>
            <section class="lesson-section" id="generation-checklist"><span class="section-number">09</span><h2>Рабочий порядок <em>эксперимента</em></h2>
              <ol><li>Зафиксировать validation-набор и baseline.</li><li>Проверить Recall retrieval до генерации.</li><li>Выбрать instruct-модель по карточке и ограничениям инфраструктуры.</li><li>Собрать нумерованный контекст с метаданными и правилом отказа.</li><li>Зафиксировать seed и параметры декодирования для воспроизводимости.</li><li>Менять один параметр за раз и сохранять ответы.</li><li>Проверять автоматические метрики ручной оценкой.</li></ol>
              <div class="takeaway"><strong>Главная мысль</strong>Качественный RAG — не один удачный ответ в ноутбуке, а воспроизводимая цепочка: измеренный поиск, контролируемая генерация и проверяемые источники.</div>
            </section>
            <div class="source-box"><p>Полный структурированный разбор 69‑минутной видеолекции 4.5: TF‑IDF/BM25, dense и hybrid retrieval, GraphRAG, chunking, 4‑битная загрузка Qwen 7B, chat template, prompt, greedy/top‑k/top‑p/beam search, температура и оценка генерации.</p></div>
          `
        },
        {
          id: "rag-evaluation",
          title: "Метрики и тестирование RAG",
          deck: "От матрицы ошибок до nDCG: учимся отдельно проверять поиск, опору на контекст и полезность ответа.",
          time: "38 мин",
          level: "Качество",
          body: `
            <section class="lesson-section" id="rag-testset"><span class="section-number">01</span><h2>Тестовый набор — это <em>контракт</em></h2>
              <p class="lead">Фраза «поиск вроде работает» ничего не доказывает. Нужен набор реальных вопросов, для которых известно, какие документы или chunks должны быть найдены.</p>
              <p>Для каждого примера сохраните запрос, список релевантных документов, допустимый ответ и опасные ошибки. Добавьте простые, сложные, неоднозначные вопросы и запросы, на которые система должна честно сказать «информация не найдена».</p>
              <div class="plain"><p class="kicker">Разметка</p><p>Это эталон, с которым сравнивают систему. Его могут собрать эксперты, восстановить из истории поиска или сначала сгенерировать автоматически, а затем проверить вручную. Без разметки нельзя уверенно сказать, что новая embedding-модель или другой chunking сделали систему лучше.</p></div>
            </section>
            <section class="lesson-section" id="confusion-matrix"><span class="section-number">02</span><h2>Матрица ошибок — четыре возможных <em>исхода</em></h2>
              <p>Для одного документа поиск делает бинарное предположение: «релевантен» или «не релевантен». Эталон говорит, так ли это на самом деле.</p>
              <div class="card-grid">
                <article class="card"><h3>True Positive, TP</h3><p>Документ найден и действительно нужен.</p></article>
                <article class="card"><h3>False Positive, FP</h3><p>Документ найден, но оказался лишним — это шум в контексте.</p></article>
                <article class="card"><h3>False Negative, FN</h3><p>Нужный документ пропущен. Генератор уже не сможет на него опереться.</p></article>
                <article class="card"><h3>True Negative, TN</h3><p>Нерелевантный документ правильно не выбран.</p></article>
              </div>
              <div class="example"><p class="kicker">Пример</p><p>В базе есть 100 инструкций. Для вопроса подходят 4. Поиск вернул 5 документов, среди которых 3 правильных. Значит: TP = 3, FP = 2, FN = 1. Остальные документы — TN.</p></div>
            </section>
            <section class="lesson-section" id="precision-recall"><span class="section-number">03</span><h2>Precision и Recall отвечают на <em>разные вопросы</em></h2>
              <div class="formula">Precision = TP / (TP + FP)</div>
              <p><strong>Precision</strong> показывает, какая доля найденного действительно полезна. В примере выше это 3 / 5 = 0,6. Высокий Precision особенно важен, когда ложная рекомендация опасна или дорогá.</p>
              <div class="formula">Recall = TP / (TP + FN)</div>
              <p><strong>Recall</strong> показывает, какую долю всех нужных документов система сумела найти. В примере это 3 / 4 = 0,75. Высокий Recall важен, когда критично ничего не пропустить.</p>
              <div class="plain"><p class="kicker">Как запомнить</p><p><strong>Precision:</strong> «Из того, что мы принесли, сколько годится?» <strong>Recall:</strong> «Из всего полезного, что существовало, сколько мы принесли?»</p></div>
              <div class="quiz" data-quiz data-answer="recall"><h3>Поиск вернул только один документ, он правильный, но пропустил ещё девять правильных. Какая метрика низкая?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-pr" value="precision"><span>Precision</span></label><label class="quiz-option"><input type="radio" name="q-pr" value="recall"><span>Recall</span></label><label class="quiz-option"><input type="radio" name="q-pr" value="latency"><span>Latency</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Найденный документ правильный, поэтому Precision высок. Но найден лишь 1 из 10 нужных — Recall равен 0,1."></span></div></div>
            </section>
            <section class="lesson-section" id="at-k"><span class="section-number">04</span><h2>Что означает <em>@k</em></h2>
              <p>Поисковая система возвращает ранжированный список. Запись <strong>Precision@5</strong> означает качество только первых пяти результатов, а <strong>Recall@5</strong> — какая доля всех релевантных документов попала в эти пять.</p>
              <div class="example"><p class="kicker">Почему k должно соответствовать продукту</p><p>Если в prompt передаются пять chunks, измеряйте хотя бы Recall@5. Recall@100 может выглядеть отлично, но не поможет LLM, если нужный фрагмент занимает 76‑е место и никогда не попадает в контекст.</p></div>
              <p>Увеличение k обычно повышает Recall, но может ухудшить Precision, увеличить стоимость и забить контекст шумом. Поэтому k — не просто параметр метрики, а часть архитектуры продукта.</p>
            </section>
            <section class="lesson-section" id="ranking-metrics"><span class="section-number">05</span><h2>Когда важен не только факт находки, но и <em>позиция</em></h2>
              <div class="card-grid">
                <article class="card"><h3>MRR</h3><p><strong>Mean Reciprocal Rank</strong> смотрит, насколько высоко расположен первый правильный результат. Если он на позициях 1, 2 и 4, reciprocal ranks равны 1, 1/2 и 1/4, затем их усредняют.</p></article>
                <article class="card"><h3>MAP@k</h3><p><strong>Mean Average Precision</strong> награждает систему, которая располагает все релевантные результаты ближе к началу, а не кучкует их внизу списка.</p></article>
                <article class="card wide accent"><h3>nDCG@k</h3><p>Учитывает позицию и степень полезности. Результат с релевантностью 5 должен стоять выше результата с релевантностью 2. Значение нормируется идеальной сортировкой и лежит от 0 до 1.</p></article>
              </div>
              <div class="plain"><p class="kicker">Как выбрать</p><p>Один правильный ответ — часто MRR. Несколько равнозначно релевантных документов — MAP. Разная степень релевантности, как в рекомендациях фильмов, — nDCG. Для базового задания курса достаточно начать с Recall@5.</p></div>
              <div class="quiz" data-quiz data-answer="mrr"><h3>Для каждого запроса существует один правильный документ. Нужно, чтобы он появлялся как можно выше. Что выбрать?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-rank" value="mrr"><span>MRR</span></label><label class="quiz-option"><input type="radio" name="q-rank" value="cost"><span>Только стоимость токенов</span></label><label class="quiz-option"><input type="radio" name="q-rank" value="tn"><span>Количество True Negative</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="MRR специально измеряет ранг первого релевантного результата и усредняет его по запросам."></span></div></div>
            </section>
            <section class="lesson-section" id="rag-triad"><span class="section-number">06</span><h2>Если эталона нет: проверяем <em>три связи</em></h2>
              <p>Во многих проектах готовой разметки нет. Тогда полезно разложить ответ на цепочку <strong>вопрос Q → найденный контекст C → ответ R</strong> и проверять три отношения.</p>
              <div class="card-grid"><article class="card"><h3>Context relevance</h3><p>Отвечают ли найденные chunks на вопрос Q?</p></article><article class="card"><h3>Faithfulness</h3><p>Следует ли ответ R из контекста C, или модель добавила неподтверждённое?</p></article><article class="card wide"><h3>Answer relevance</h3><p>Отвечает ли R именно на вопрос Q, а не просто пересказывает документ?</p></article></div>
              <p>Оценивать связи можно правилами, embedding-сходством, людьми или LLM-судьёй. Но автоматически сгенерированная оценка — приближение, а не новый абсолютный эталон.</p>
            </section>
            <section class="lesson-section" id="llm-judge"><span class="section-number">07</span><h2>LLM-as-a-judge — полезно, но <em>не достаточно</em></h2>
              <p>Модель-судья ускоряет массовую оценку, но может предпочитать длинные ответы, знакомый стиль или собственные формулировки. Калибруйте её на ручной разметке, фиксируйте рубрику и периодически проверяйте расхождения с людьми.</p>
              <div class="plain"><p class="kicker">Защита от самообмана</p><p>Скройте названия моделей, перемешивайте порядок вариантов, требуйте отдельную оценку по каждому критерию и храните объяснение судьи для аудита.</p></div>
              <div class="takeaway"><strong>Готовность к запуску</strong>Средняя метрика недостаточна. Нужны границы: где система работает, где должна отказаться и где результат обязательно проверяет человек.</div>
              <div class="quiz" data-quiz data-answer="retrieval,generation,system"><p class="kicker">Несколько ответов</p><h3>Какие уровни нужно измерять отдельно?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="retrieval"><span>Качество retrieval</span></label><label class="quiz-option"><input type="checkbox" value="generation"><span>Качество и faithfulness ответа</span></label><label class="quiz-option"><input type="checkbox" value="system"><span>Задержку, стоимость и безопасность системы</span></label><label class="quiz-option"><input type="checkbox" value="beauty"><span>Только визуальную красоту демо</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Иначе общая оценка скрывает причину ошибки: поиск, генерацию или эксплуатационный слой."></span></div></div>
            </section>
            <div class="source-box"><p>Полный разбор 30‑минутной видеолекции 4.4: confusion matrix, Precision@k, Recall@k, MAP, MRR, nDCG, RAG Triad и LLM‑as‑a‑judge.</p></div>
          `
        },
        {
          id: "rag-memory",
          title: "RAG как память диалога",
          deck: "Почему нельзя бесконечно пересылать модели всю переписку и как возвращать только релевантные фрагменты прошлых разговоров.",
          time: "18 мин",
          level: "Архитектура",
          body: `
            <section class="lesson-section" id="chat-history-cost"><span class="section-number">01</span><h2>Модель не помнит диалог <em>сама по себе</em></h2>
              <p class="lead">Каждый вызов LLM получает новую последовательность токенов. Чтобы продолжить беседу, приложение обычно снова отправляет system prompt, сообщения пользователя и ответы модели.</p>
              <div class="formula">system + user₁ + assistant₁ + … + новый user → LLM</div>
              <p>Чем длиннее история, тем больше токенов приходится читать при каждом запросе. Растут стоимость и задержка, а важные инструкции могут потеряться среди старого шума.</p>
            </section>
            <section class="lesson-section" id="memory-strategies"><span class="section-number">02</span><h2>Четыре стратегии управления <em>историей</em></h2>
              <div class="card-grid">
                <article class="card"><h3>Окно последних сообщений</h3><p>Оставить, например, три последних обмена. Дёшево и просто, но ранние важные факты исчезают.</p></article>
                <article class="card"><h3>Суммаризация</h3><p>Старые сообщения сжимаются в краткое резюме. Экономит токены, но детали могут исказиться или потеряться.</p></article>
                <article class="card wide accent"><h3>RAG по истории</h3><p>Сообщения архивируются, индексируются и возвращаются по смыслу нового вопроса — в том числе из других веток диалога.</p></article>
                <article class="card wide"><h3>Всё в контекст</h3><p>Большое окно позволяет передавать длинную историю, но это дорого; лишний текст не становится полезным только потому, что помещается.</p></article>
              </div>
            </section>
            <section class="lesson-section" id="memory-rag-flow"><span class="section-number">03</span><h2>Как работает память через <em>retrieval</em></h2>
              <div class="diagram"><div class="flow"><div class="flow-node"><strong>Archive</strong><span>сохранить диалоги</span></div><div class="flow-node"><strong>Index</strong><span>embeddings / BM25</span></div><div class="flow-node"><strong>New query</strong><span>новый вопрос</span></div><div class="flow-node"><strong>Retrieve</strong><span>нужные воспоминания</span></div><div class="flow-node"><strong>Answer</strong><span>контекст + ответ</span></div></div></div>
              <div class="example"><p class="kicker">Пример</p><p>Месяц назад пользователь сказал: «Я не ем орехи». Сегодня он просит составить меню. Система ищет связанные с питанием факты в архиве и добавляет именно это ограничение, а не всю месячную переписку.</p></div>
              <p>Память требует правил доступа и удаления. Нельзя бездумно извлекать чужие диалоги, чувствительные данные или устаревшие предпочтения. Полезно хранить источник, дату и уровень доверия к каждому факту.</p>
              <div class="quiz" data-quiz data-answer="retrieve"><h3>Какой подход сохраняет старую историю, но добавляет в новый prompt только связанные фрагменты?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-memory" value="retrieve"><span>RAG по архиву сообщений</span></label><label class="quiz-option"><input type="radio" name="q-memory" value="all"><span>Всегда отправлять всю переписку</span></label><label class="quiz-option"><input type="radio" name="q-memory" value="weights"><span>После каждого сообщения переобучать веса LLM</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Архив остаётся внешним хранилищем, а retrieval выбирает релевантные фрагменты под текущий запрос."></span></div></div>
            </section>
            <div class="source-box"><p>По заключительной части видеолекции 4.4: обрезание истории, суммаризация, retrieval по прошлым веткам и компромисс больших контекстных окон.</p></div>
          `
        }
      ]
    },
    {
      number: "05",
      title: "ИИ-агенты",
      lessons: [
        {
          id: "assistant-training",
          title: "Как базовую LLM превращают в чат‑ассистента",
          deck: "Предобучение, SFT, разметка предпочтений и RLHF — что даёт каждый этап и почему «приятный ответ» не равен истинному.",
          time: "29 мин",
          level: "Углубление",
          body: `
            <section class="lesson-section" id="assistant-base">
              <span class="section-number">01</span><h2>Этап 1. Базовая <em>языковая модель</em></h2>
              <p class="lead">После предобучения модель умеет продолжать тексты разных жанров, но не обязана быть помощником. На вопрос она может продолжить форумную дискуссию, написать следующий вопрос анкеты или сымитировать статью.</p>
              <div class="formula">web + books + code → next-token pretraining → base model</div>
              <p>Этот этап самый дорогой и даёт язык, общие навыки и широкие ассоциации. Он не задаёт устойчивую роль, правила безопасности и формат диалога.</p>
            </section>
            <section class="lesson-section" id="assistant-sft">
              <span class="section-number">02</span><h2>Этап 2. Supervised Fine-Tuning</h2>
              <p>Разметчики создают пары «инструкция → хороший ответ». Модель видит, как объяснять, суммировать, отказывать, форматировать код и задавать уточняющий вопрос.</p>
              <div class="plain"><p class="kicker">Что меняет SFT</p><p>Не добавляет отдельный поисковик и не проверяет каждый факт. Он повышает вероятность поведения, похожего на демонстрации, и формирует привычный стиль ассистента.</p></div>
              <p>Разнообразие примеров критично: если все эталоны длинные и формальные, модель научится быть длинной и формальной даже там, где нужен короткий ответ.</p>
            </section>
            <section class="lesson-section" id="assistant-preferences">
              <span class="section-number">03</span><h2>Этап 3. Человеческие <em>предпочтения</em></h2>
              <p>На один запрос получают несколько ответов и просят людей выбрать лучший. Так появляется набор сравнений: ответ A предпочтительнее B.</p>
              <div class="diagram"><div class="flow">
                <div class="flow-node"><strong>Prompt</strong><span>один запрос</span></div>
                <div class="flow-node"><strong>Candidates</strong><span>несколько ответов</span></div>
                <div class="flow-node"><strong>Human ranking</strong><span>что лучше</span></div>
                <div class="flow-node"><strong>Preference model</strong><span>предсказывает выбор</span></div>
              </div></div>
              <p>В классическом RLHF по сравнениям обучают reward model, затем политику LLM оптимизируют на высокий reward с ограничением, чтобы она не слишком ушла от SFT-модели. В современных вариантах, например DPO, предпочтения используют более напрямую, без отдельного RL-цикла.</p>
            </section>
            <section class="lesson-section" id="assistant-alignment-limits">
              <span class="section-number">04</span><h2>Что означает <em>alignment</em></h2>
              <p>Alignment — попытка согласовать поведение модели с человеческими инструкциями, предпочтениями и ограничениями. Это не доказательство истинности, объективности или универсальной морали.</p>
              <div class="card-grid">
                <article class="card"><h3>Reward hacking</h3><p>Модель может находить поверхностные признаки, которые нравятся судье, не улучшая реальное решение.</p></article>
                <article class="card"><h3>Sycophancy</h3><p>Поддакивание пользователю: предпочтительный «приятный» ответ вытесняет честное несогласие.</p></article>
                <article class="card"><h3>Labeler bias</h3><p>Состав и инструкции разметчиков влияют на то, какое поведение считается хорошим.</p></article>
              </div>
              <div class="plain"><p class="kicker">Практический вывод</p><p>В важных задачах просите модель искать контраргументы, отделять факты от предположений и ссылаться на проверяемые источники. Но внешняя валидация всё равно обязательна.</p></div>
            </section>
            <section class="lesson-section" id="assistant-agent-bridge">
              <span class="section-number">05</span><h2>Почему ассистент ещё не <em>агент</em></h2>
              <p>Instruction-following модель умеет выбирать текстовый ответ. Агентная система добавляет инструменты, состояние, цикл наблюдений, условия остановки и права на действия.</p>
              <div class="quiz" data-quiz data-answer="sft,preferences">
                <p class="kicker">Несколько ответов</p><h3>Какие этапы формируют поведение чат‑ассистента после базового pretraining?</h3>
                <div class="quiz-options">
                  <label class="quiz-option"><input type="checkbox" value="sft"><span>SFT на примерах инструкций и ответов</span></label>
                  <label class="quiz-option"><input type="checkbox" value="preferences"><span>Обучение по человеческим предпочтениям</span></label>
                  <label class="quiz-option"><input type="checkbox" value="database"><span>Обязательная запись всех фактов в SQL внутри весов</span></label>
                  <label class="quiz-option"><input type="checkbox" value="tools"><span>Автоматическое получение доступа ко всем инструментам</span></label>
                </div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="SFT и предпочтения меняют стиль и реакцию на запрос. Инструменты и внешние знания относятся уже к системе вокруг модели."></span></div>
              </div>
            </section>
            <div class="source-box"><p>Полный самостоятельный разбор 21‑минутной видеолекции 6.1 о pretraining, SFT, human feedback и ограничениях preference alignment.</p></div>
          `
        },
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
          id: "agent-loop-tool-calling",
          title: "ReAct, tool calling и устройство агентного цикла",
          deck: "Как модель выбирает инструмент, получает observation, решает продолжать или остановиться — и почему описания функций являются частью поведения.",
          time: "27 мин",
          level: "Механика",
          body: `
            <section class="lesson-section" id="workflow-agent"><span class="section-number">01</span><h2>Workflow заранее знает путь, агент выбирает <em>следующий шаг</em></h2>
              <p>Для вопроса «Какой сегодня день недели в Токио?» обычный workflow мог бы жёстко распознать город, вызвать заранее выбранную функцию времени и отформатировать ответ. Агенту дают список доступных инструментов, а решение вызвать <code>get_time(city="Tokyo")</code> принимает модель.</p>
              <div class="takeaway"><strong>Автономность — это не магия</strong>Модель выбирает лишь из интерфейсов, которые ей предоставила программа. Исполняет функцию обычный код, а результат снова передаётся модели как observation.</div>
            </section>
            <section class="lesson-section" id="react-loop"><span class="section-number">02</span><h2>ReAct: reasoning + <em>acting</em></h2>
              <div class="diagram"><div class="flow"><div class="flow-node"><strong>Goal</strong><span>запрос</span></div><div class="flow-node"><strong>Decide</strong><span>что нужно</span></div><div class="flow-node"><strong>Action</strong><span>tool + arguments</span></div><div class="flow-node"><strong>Observation</strong><span>результат функции</span></div><div class="flow-node"><strong>Answer / loop</strong><span>стоп или новый шаг</span></div></div></div>
              <p><strong>ReAct</strong> — исторический шаблон, где модель чередует рассуждение и действие. Если observation недостаточно, цикл повторяется до готового ответа или ограничения: числа шагов, времени, токенов или стоимости.</p>
              <p>В production внутренние рассуждения не обязаны показываться пользователю. Для отладки полезнее сохранять проверяемую трассу: какой инструмент вызван, с какими аргументами, что вернул и почему система остановилась.</p>
            </section>
            <section class="lesson-section" id="tool-contract"><span class="section-number">03</span><h2>Инструмент — это <em>контракт</em></h2>
              <p>Описание инструмента содержит имя, назначение, схему аргументов и ожидаемый результат. По этому описанию модель решает, подходит ли функция к текущей цели.</p>
              <div class="card-grid"><article class="card"><h3>Модель обязуется</h3><p>Выбрать существующий tool и сформировать аргументы по схеме.</p></article><article class="card"><h3>Программа обязуется</h3><p>Проверить аргументы, безопасно выполнить действие и вернуть структурированный результат или понятную ошибку.</p></article></div>
              <div class="plain"><p class="kicker">Почему одного имени мало</p><p><code>search</code> не объясняет, ищет ли функция по интернету, внутренней базе или товарам. Хорошее описание указывает назначение, ограничения и момент, когда инструмент использовать не следует.</p></div>
            </section>
            <section class="lesson-section" id="tool-training"><span class="section-number">04</span><h2>Как модель учится <em>tool calling</em></h2>
              <p>Раньше список инструментов и формат действий подробно объясняли в prompt и показывали few-shot примеры. Это работало, но легко ломалось при изменении формата.</p>
              <p>Современные tool-capable модели дополнительно обучены на диалогах, где правильным продолжением является структурированный вызов функции. Затем preference-обучение поощряет корректную последовательность действий. Поэтому API может возвращать tool call отдельным объектом, а не текстом, который нужно хрупко парсить регулярным выражением.</p>
              <div class="quiz" data-quiz data-answer="model,code"><p class="kicker">Несколько ответов</p><h3>Кто участвует в одном вызове инструмента?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="model"><span>Модель выбирает tool и предлагает аргументы</span></label><label class="quiz-option"><input type="checkbox" value="code"><span>Обычный код проверяет и исполняет функцию</span></label><label class="quiz-option"><input type="checkbox" value="weights"><span>Веса модели напрямую делают перевод денег</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="LLM формирует решение, а реальное действие делает контролируемый программный слой."></span></div></div>
            </section>
            <section class="lesson-section" id="agent-business"><span class="section-number">05</span><h2>Проектирование начинается с <em>должностной инструкции</em></h2>
              <p>Хороший исходник для бизнес-агента — инструкция реального сотрудника: роль, цель, допустимые действия, критерии готовности и случаи передачи человеку. Сложную работу разбивают на более узкие способности и для каждой задают инструменты.</p>
              <div class="example"><p class="kicker">Неоднозначность</p><p>«Поставь встречу с Сергеем на 16» — с каким Сергеем, в какой день, часовой пояс, календарь и длительность? Надёжный агент уточняет недостающее, а не придумывает.</p></div>
              <p>Если задачу можно описать детерминированным workflow с жёсткими проверками, он обычно надёжнее. Агентная свобода нужна там, где путь действительно зависит от содержания наблюдений.</p>
            </section>
            <section class="lesson-section" id="agent-safety-loop"><span class="section-number">06</span><h2>Границы, подтверждение и <em>остановка</em></h2>
              <ul><li>Ограничьте число шагов, время и бюджет.</li><li>Разделите read-only инструменты и действия, меняющие внешний мир.</li><li>Перед оплатой, удалением, отправкой или бронированием требуйте подтверждение человека.</li><li>Проверяйте аргументы независимо от уверенности модели.</li><li>Задайте инструмент эскалации, если данных или прав не хватает.</li></ul>
              <p>Критерий завершения тоже нужно формализовать. «Ответ выглядит нормально» хуже, чем «получены обязательные поля, источник проверен, действие подтверждено».</p>
            </section>
            <section class="lesson-section" id="multi-agent"><span class="section-number">07</span><h2>Другой агент тоже может быть <em>инструментом</em></h2>
              <p>В мультиагентной системе один компонент вызывает другого как специализированного эксперта. Общая память, последовательный обмен или голосование помогают объединить результаты.</p>
              <div class="plain"><p class="kicker">Ограничение</p><p>Три одинаковые модели не становятся тремя независимыми экспертами автоматически. Разделение оправдано, когда роли, данные, инструменты или критерии проверки действительно различаются.</p></div>
            </section>
            <div class="source-box"><p>Полный разбор 23‑минутной видеолекции 6.2: workflow против агента, ReAct, tool calling, обучение вызову функций, контракты инструментов, human‑in‑the‑loop, corner cases, agent harness и мультиагентность.</p></div>
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
          id: "agent-production-future",
          title: "Агенты в production: ценность, протоколы и ограничения",
          deck: "Почему эффектное демо часто не окупается, как MCP уменьшает перегрузку инструментами и что проверять перед ростом автономности.",
          time: "34 мин",
          level: "Стратегия",
          body: `
            <section class="lesson-section" id="agent-hype"><span class="section-number">01</span><h2>Прогноз — не то же самое, что <em>результат</em></h2>
              <p class="lead">Вокруг агентов много громких оценок автоматизации. Они могут быть полезны как сценарии будущего, но решение о внедрении нужно принимать по собственным данным, ограничениям и экономике процесса.</p>
              <div class="plain"><p class="kicker">Правило чтения прогнозов</p><p>Проверьте, кто заказал исследование, как определён «успех», на каких организациях собраны данные и измеряли ли реальную прибыль, а не число пилотов или сэкономленные минуты.</p></div>
            </section>
            <section class="lesson-section" id="agent-failures"><span class="section-number">02</span><h2>Почему пилоты не становятся <em>production</em></h2>
              <div class="card-grid"><article class="card"><h3>Нет бизнес-метрики</h3><p>«Ответ быстрее на 20%» не означает автоматически +20% прибыли.</p></article><article class="card"><h3>Перенос bottleneck</h3><p>Черновики ускорились, но согласующий сотрудник получает вдвое больше материалов и становится новым узким местом.</p></article><article class="card"><h3>Нет эксплуатации</h3><p>Контекст, память, инструменты и документы меняются, а regression-evals и ответственный за обновление не назначены.</p></article><article class="card"><h3>Игнорируется человек</h3><p>Сотрудники не доверяют системе, боятся сокращений или не понимают, когда её результат можно использовать.</p></article></div>
              <p>Перед автоматизацией нарисуйте процесс целиком и определите, где именно появится измеримая ценность: меньше ошибок, короче цикл, больше обработанных заявок или ниже риск.</p>
            </section>
            <section class="lesson-section" id="agent-rollout"><span class="section-number">03</span><h2>Автономность добавляют <em>ступенями</em></h2>
              <ol><li>Тестовый набор без реальных действий.</li><li>Read-only инструменты и песочница.</li><li>Рекомендации, которые подтверждает человек.</li><li>Ограниченные операции с малыми лимитами.</li><li>Расширение прав только после стабильных evals и аудита.</li></ol>
              <p>Для мультиагентной системы нужны тесты каждого участника и интегральные сценарии всей цепочки. Иначе два компонента могут по отдельности быть хорошими, но передавать друг другу несовместимые данные.</p>
            </section>
            <section class="lesson-section" id="mcp-deep"><span class="section-number">04</span><h2>MCP и динамический выбор <em>контекста</em></h2>
              <p>Если передавать модели описания сотен инструментов на каждом шаге, они занимают контекст и повышают вероятность неверного выбора. Протокол подключения контекста позволяет приложению обнаруживать доступные серверы и подгружать релевантные инструменты по необходимости.</p>
              <div class="diagram"><div class="flow"><div class="flow-node"><strong>Agent</strong><span>цель</span></div><div class="flow-node"><strong>Discover</strong><span>какие серверы есть</span></div><div class="flow-node"><strong>Select</strong><span>нужные tools</span></div><div class="flow-node"><strong>Call</strong><span>структурированный запрос</span></div><div class="flow-node"><strong>Observe</strong><span>ответ</span></div></div></div>
              <p>MCP стандартизирует интерфейс, но не делает сервер безопасным. Клиент всё равно должен проверять происхождение сервера, разрешения, аргументы и последствия вызова.</p>
            </section>
            <section class="lesson-section" id="agent-protocols"><span class="section-number">05</span><h2>Agent-to-agent и платежи — возможный <em>следующий слой</em></h2>
              <p>Открытые протоколы пытаются стандартизировать обмен задачами между агентами: личный помощник может обратиться к агенту магазина, согласовать товар и подготовить транзакцию.</p>
              <div class="takeaway"><strong>Самая опасная граница</strong>Поиск товара и перевод денег — разные уровни риска. Платёжный инструмент должен иметь строгую авторизацию, лимит суммы, idempotency и явное подтверждение пользователя.</div>
            </section>
            <section class="lesson-section" id="agent-stack"><span class="section-number">06</span><h2>Как выбирать <em>стек</em></h2>
              <div class="card-grid"><article class="card"><h3>Простой workflow</h3><p>Визуальная автоматизация или небольшой собственный код. Чем меньше магии, тем легче отладка.</p></article><article class="card"><h3>Сложное состояние</h3><p>Графовый оркестратор полезен для веток, циклов, checkpoint и human-in-the-loop.</p></article><article class="card wide"><h3>Мультиагентность</h3><p>Фреймворк нужен только после ясного разделения ролей, общей схемы данных и интегральных тестов.</p></article></div>
              <p>Лекция перечисляет CrewAI, LangChain/LangGraph, n8n, Langflow, smolagents и LlamaIndex как возможные инструменты. Названия меняются быстрее принципов: выбирайте по наблюдаемости, контролю состояния, поддерживаемости и возможности выйти из фреймворка.</p>
              <div class="quiz" data-quiz data-answer="metric,owner,evals"><p class="kicker">Несколько ответов</p><h3>Что нужно определить до расширения пилота?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="metric"><span>Бизнес-метрику процесса целиком</span></label><label class="quiz-option"><input type="checkbox" value="owner"><span>Ответственного за эксплуатацию и обновления</span></label><label class="quiz-option"><input type="checkbox" value="evals"><span>Regression-evals и план безопасного роста прав</span></label><label class="quiz-option"><input type="checkbox" value="hype"><span>Только красивую презентацию с прогнозами</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Без метрики, владельца и регрессионных проверок демо быстро деградирует и не превращается в устойчивый продукт."></span></div></div>
            </section>
            <div class="source-box"><p>Структурированная версия 36‑минутной видеолекции 6.3: хайп и провалы пилотов, bottleneck процесса, человеческий фактор, постепенная автономность, MCP, agent-to-agent протоколы, платёжные инструменты и обзор фреймворков.</p></div>
          `
        },
        {
          id: "agent-practice",
          title: "Проектируем собственного агента",
          deck: "Собираем агента поддержки в LangGraph: инструменты, граф переходов, tool calls, изменение данных, трассировка и evals.",
          time: "32 мин",
          level: "Проект",
          body: `
            <section class="lesson-section" id="agent-practice-case"><span class="section-number">01</span><h2>Почему пример — <em>поддержка клиентов</em></h2>
              <p class="lead">В практике строится агент интернет-магазина: он сообщает статус заказа, объясняет правила возврата, отменяет заказ или передаёт случай человеку. У поддержки есть повторяемые операции и измеримая экономика, поэтому это более реалистичный старт, чем «универсальный сотрудник».</p>
              <div class="formula">сообщение → решение LLM → tool → результат → новый шаг или ответ</div>
              <p>Модель вызывается через OpenAI-совместимый API. Провайдера можно заменить, поменяв base URL, ключ и model id. Секрет хранится отдельно от ноутбука.</p>
              <div class="plain"><p class="kicker">Почему temperature = 0 во время разработки</p><p>Ответы становятся воспроизводимее: легче понять, вызвано ли изменение новым prompt/tool или случайной выборкой токенов. Нулевая температура не гарантирует абсолютную детерминированность и иногда усиливает повторяющиеся циклы.</p></div>
            </section>
            <section class="lesson-section" id="agent-practice-tools"><span class="section-number">02</span><h2>Tool — обычная функция с <em>контрактом</em></h2>
              <p>В демонстрации база заказов — простой Python-словарь. В настоящем сервисе функцию можно подключить к SQL или внутреннему API, не меняя логику агента. Tool-декоратор превращает функцию в доступный модели инструмент.</p>
              <div class="card-grid"><article class="card"><h3>lookup_order</h3><p>Принимает order id, возвращает статус и дату доставки.</p></article><article class="card"><h3>cancel_order</h3><p>Изменяет статус заказа — это уже действие с побочным эффектом.</p></article><article class="card"><h3>return_policy</h3><p>Возвращает актуальные правила. В production их можно получать через RAG.</p></article><article class="card"><h3>escalate_to_human</h3><p>Передаёт спорный или опасный случай сотруднику.</p></article></div>
              <p>Аннотации типов, имена аргументов, возвращаемое значение и особенно <strong>docstring</strong> попадают в описание, которое читает модель. Docstring должен объяснять бизнес-смысл: когда tool применять, когда нельзя и какие ограничения действуют.</p>
              <div class="quiz" data-quiz data-answer="schema,docstring,boundary"><p class="kicker">Несколько ответов</p><h3>Что входит в хороший контракт инструмента?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="schema"><span>Типы и схема аргументов</span></label><label class="quiz-option"><input type="checkbox" value="docstring"><span>Понятное описание результата и применения</span></label><label class="quiz-option"><input type="checkbox" value="boundary"><span>Ограничения и ситуации запрета</span></label><label class="quiz-option"><input type="checkbox" value="secret"><span>API-ключ прямо в docstring</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Модель выбирает tool по его схеме и описанию. Секреты никогда не должны попадать в доступный ей контекст."></span></div></div>
            </section>
            <section class="lesson-section" id="agent-practice-graph"><span class="section-number">03</span><h2>LangGraph делает цикл <em>явным графом</em></h2>
              <div class="diagram"><div class="flow"><div class="flow-node"><strong>START</strong><span>вопрос</span></div><div class="flow-node"><strong>Agent node</strong><span>ответ или tool call</span></div><div class="flow-node"><strong>Condition</strong><span>нужен tool?</span></div><div class="flow-node"><strong>Tool node</strong><span>выполнить функцию</span></div><div class="flow-node"><strong>END</strong><span>финальный ответ</span></div></div></div>
              <p><strong>Node</strong> — шаг вычисления, <strong>edge</strong> — переход между шагами. Условное ребро после agent node проверяет: модель уже ответила или запросила инструмент. После tool node результат возвращается агенту, поэтому цикл может повториться.</p>
              <div class="example"><p class="kicker">Запрос из практики</p><p>«Можно вернуть заказ 17?» Агент сначала вызывает <code>lookup_order(17)</code>, затем отдельно получает <code>return_policy</code> и только после двух наблюдений формирует ответ.</p></div>
              <div class="quiz" data-quiz data-answer="condition"><h3>Какой элемент графа решает, завершить ответ или перейти к Tool node?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-graph-route" value="condition"><span>Условное ребро</span></label><label class="quiz-option"><input type="radio" name="q-graph-route" value="database"><span>Сама база данных</span></label><label class="quiz-option"><input type="radio" name="q-graph-route" value="css"><span>Стили интерфейса</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Роутер читает состояние: при наличии tool call ведёт к инструментам, иначе — к завершению."></span></div></div>
            </section>
            <section class="lesson-section" id="agent-practice-protocol"><span class="section-number">04</span><h2>Что реально происходит при <em>tool calling</em></h2>
              <ol><li>Модели передают system prompt и JSON-схемы доступных tools.</li><li>Она возвращает не результат функции, а структурированный запрос: имя tool, arguments и call id.</li><li>Внешняя программа проверяет запрос и запускает нужную Python-функцию.</li><li>Результат добавляется в историю как <code>ToolMessage</code>.</li><li>Модель видит наблюдение и формирует ответ либо просит следующий tool.</li></ol>
              <div class="takeaway"><strong>LLM не запускает код сама</strong>Она предлагает действие. Реальные права, проверку аргументов, выполнение и аудит контролирует приложение вокруг модели.</div>
              <div class="quiz" data-quiz data-answer="application"><h3>Кто фактически выполняет Python-функцию после tool call?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-tool-executor" value="model"><span>Сама LLM внутри своих весов</span></label><label class="quiz-option"><input type="radio" name="q-tool-executor" value="application"><span>Внешнее приложение-оркестратор</span></label><label class="quiz-option"><input type="radio" name="q-tool-executor" value="user"><span>Пользователь вручную при каждом вызове</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Модель возвращает JSON-намерение; приложение валидирует его, вызывает функцию и возвращает наблюдение модели."></span></div></div>
            </section>
            <section class="lesson-section" id="agent-practice-mutations"><span class="section-number">05</span><h2>Чтение данных и изменение данных — <em>разные уровни риска</em></h2>
              <p>Запрос статуса заказа только читает базу. <code>cancel_order</code> меняет её: в демонстрации статус действительно становится «отменён». Если несколько агентов или сервисов работают с одной записью, нужны транзакции, блокировки и защита от повторного выполнения.</p>
              <div class="card-grid"><article class="card"><h3>Read-only</h3><p>Можно разрешать шире, логировать и ограничивать объём данных.</p></article><article class="card"><h3>Reversible write</h3><p>Нужны idempotency key, контроль версии и возможность отката.</p></article><article class="card wide accent"><h3>Необратимое или дорогое действие</h3><p>Запрашивайте явное подтверждение человека и повторно показывайте точные параметры операции.</p></article></div>
              <div class="plain"><p class="kicker">Idempotency</p><p>Повтор одного и того же запроса не должен дважды отменить, оплатить или отправить заказ. Для действия сохраняют уникальный идентификатор операции и уже выданный результат.</p></div>
            </section>
            <section class="lesson-section" id="agent-practice-tracing"><span class="section-number">06</span><h2>Трасса объясняет <em>где сломался агент</em></h2>
              <p>В лекции для наблюдаемости используется Langfuse. Трасса показывает system/user/AI/tool messages, имя и аргументы tool, его результат, время и итоговый ответ. Это не скрытая цепочка мыслей модели, а журнал реально переданных структурированных сообщений.</p>
              <div class="example"><p class="kicker">Что можно диагностировать</p><p>Агент выбрал неверный tool? Передал неправильный order id? Tool вернул ошибку? После правильного результата LLM исказила ответ? Без трассы все четыре случая выглядят как «агент ошибся».</p></div>
              <p>Не записывайте секреты и персональные данные без необходимости. Настройте маскирование, сроки хранения и права доступа к журналам.</p>
            </section>
            <section class="lesson-section" id="agent-practice-evals"><span class="section-number">07</span><h2>Финальная проверка: <em>evals и эксплуатационные метрики</em></h2>
              <ol><li>Проверить обычные запросы и нужную последовательность tools.</li><li>Сломать API или вернуть timeout и проверить восстановление.</li><li>Дать неизвестный order id и противоречивые сведения.</li><li>Попытаться отменить чужой или уже отправленный заказ.</li><li>Проверить human escalation и лимит шагов.</li><li>Измерить success rate, tool accuracy, галлюцинации, время до первого токена, полную задержку и стоимость.</li></ol>
              <div class="quiz" data-quiz data-answer="trace,tools,latency,safety"><p class="kicker">Несколько ответов</p><h3>Что должно попасть в регрессионную проверку агента?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="trace"><span>Полная траектория по шагам</span></label><label class="quiz-option"><input type="checkbox" value="tools"><span>Правильность выбора и аргументов tools</span></label><label class="quiz-option"><input type="checkbox" value="latency"><span>Задержка и стоимость</span></label><label class="quiz-option"><input type="checkbox" value="safety"><span>Запрещённые действия и эскалация</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Один хороший финальный текст может скрывать опасный вызов, лишние циклы или слишком высокую стоимость — проверяется вся траектория."></span></div></div>
              <div class="takeaway"><strong>Вы закончили маршрут</strong>LLM предлагает следующий шаг, граф управляет циклом, инструменты взаимодействуют с миром, ограничения защищают данные, а трассы и evals показывают, можно ли системе доверять.</div>
            </section>
            <div class="source-box"><p>Полный разбор 31‑минутной практической видеолекции: агент поддержки на LangGraph, OpenAI‑совместимый API, temperature = 0, Python-tools и docstrings, nodes/edges, JSON tool calls, изменение базы, транзакционность, human escalation, Langfuse и evals. Материалы: <a href="https://stepik.org/lesson/2440335/step/2?unit=2477580" target="_blank" rel="noreferrer">урок Stepik</a> и <a href="https://colab.research.google.com/drive/1jCHFqaNWDxrWvJJF5g30qlwmuR1KgPlC?usp=sharing" target="_blank" rel="noreferrer">ноутбук</a>.</p></div>
          `
        }
      ]
    },
    {
      number: "06",
      title: "Практикум: перенос в работу",
      lessons: [
        {
          id: "work-problem-to-solution",
          title: "От рабочей проблемы к проверяемому решению",
          deck: "Выберем задачу, найдём простой baseline, определим цену ошибок и только затем решим, нужны ли классификатор, RAG или агент.",
          time: "35 мин + практика",
          level: "Рабочий навык",
          body: `
            <section class="lesson-section" id="work-observation"><span class="section-number">01</span><h2>Начинайте не с LLM, а с <em>наблюдения за процессом</em></h2>
              <p class="lead">Полезный AI-проект убирает конкретное узкое место: ручную сортировку обращений, долгий поиск инструкции, повторяющийся черновик или переключение между несколькими системами.</p>
              <div class="example"><p class="kicker">Рабочий пример</p><p>Сотрудник поддержки тратит 25 минут на обращение: 3 минуты понимает тему, 12 минут ищет регламент, 7 минут пишет ответ и 3 минуты меняет статус заказа. Это не «задача для одного чат-бота», а четыре шага с разными требованиями.</p></div>
              <div class="card-grid"><article class="card"><h3>Понять тему</h3><p>Классификатор или простой набор правил.</p></article><article class="card"><h3>Найти регламент</h3><p>Поиск или RAG по версии документов.</p></article><article class="card"><h3>Написать черновик</h3><p>Instruct-LLM с найденным контекстом.</p></article><article class="card accent"><h3>Изменить заказ</h3><p>Tool с проверкой прав и подтверждением человека.</p></article></div>
            </section>
            <section class="lesson-section" id="work-baseline"><span class="section-number">02</span><h2>Baseline показывает, приносит ли сложность <em>ценность</em></h2>
              <p>Сначала измерьте текущий процесс и самое простое улучшение. Regex может извлекать номер заказа, TF-IDF — искать точные термины, шаблон — собирать стандартный ответ. Если сложная система не превосходит baseline по нужной метрике, внедрять её рано.</p>
              <div class="plain"><p class="kicker">Минимальная таблица эксперимента</p><p><strong>Версия → данные → метрика качества → задержка → стоимость → типичные ошибки.</strong> Без этой записи команда легко сравнивает разные тестовые наборы и принимает случайное улучшение за прогресс.</p></div>
              <div class="quiz" data-quiz data-answer="baseline,metric,testset"><p class="kicker">Несколько ответов</p><h3>Что зафиксировать до первого эксперимента с LLM?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="baseline"><span>Простой baseline или текущий процесс</span></label><label class="quiz-option"><input type="checkbox" value="metric"><span>Критерий успеха и цену ошибок</span></label><label class="quiz-option"><input type="checkbox" value="testset"><span>Небольшой неизменный тестовый набор</span></label><label class="quiz-option"><input type="checkbox" value="brand"><span>Название самой популярной модели</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Baseline, метрика и одинаковый test/eval-набор позволяют честно определить, стало ли решение лучше."></span></div></div>
            </section>
            <section class="lesson-section" id="work-tech-choice"><span class="section-number">03</span><h2>Выбирайте технологию по <em>форме результата</em></h2>
              <div class="card-grid"><article class="card"><h3>Нужна метка</h3><p>Классификация: тема, риск, приоритет, тональность. Начните с TF-IDF, затем сравните с encoder-моделью.</p></article><article class="card"><h3>Нужен документ</h3><p>Sparse, dense или hybrid retrieval. Генерация может быть вообще не нужна.</p></article><article class="card"><h3>Нужен ответ по документам</h3><p>RAG: retrieval, answerability gate, prompt и ссылки на источники.</p></article><article class="card accent"><h3>Нужно действие</h3><p>Workflow или агент с tools. Начните с минимальных прав и подтверждаемого черновика.</p></article></div>
              <div class="quiz" data-quiz data-answer="search"><h3>Юристу нужен список пяти похожих судебных актов, а не пересказ. Что является лучшим первым решением?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-work-choice" value="search"><span>Поиск и ранжирование документов</span></label><label class="quiz-option"><input type="radio" name="q-work-choice" value="agent"><span>Полностью автономный агент</span></label><label class="quiz-option"><input type="radio" name="q-work-choice" value="finetune"><span>Дообучение генеративной модели на всех актах</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Если продуктовый результат — список документов, сначала решается retrieval-задача без лишней генерации."></span></div></div>
            </section>
            <section class="lesson-section" id="work-project-brief"><span class="section-number">04</span><h2>Практика: заполните карточку <em>своего проекта</em></h2>
              <ol><li>Возьмите одну повторяющуюся задачу, которую реально выполняете.</li><li>Опишите вход, готовый результат и текущие затраты времени.</li><li>Разбейте процесс на решения: понять, найти, написать, проверить, выполнить.</li><li>Для каждого шага укажите простейший baseline.</li><li>Определите ошибки, которые нельзя допускать, и место человеческой проверки.</li><li>Соберите 20–50 обезличенных реальных примеров.</li></ol>
              <div class="source-box"><p><a href="practice/project_brief.md" download>Скачать шаблон карточки рабочего проекта</a>. Заполняйте её до выбора модели: документ станет контрактом эксперимента и защитит от бесконечного «давайте попробуем ещё одну LLM».</p></div>
              <div class="takeaway"><strong>Результат практики</strong>У вас должна появиться не идея «сделать AI», а проверяемая гипотеза: какой этап улучшается, на каких примерах, по какой метрике и при каких ограничениях.</div>
            </section>
          `
        },
        {
          id: "prompting-workbench",
          title: "Лаборатория промптов для рабочих задач",
          deck: "Превратим удачный запрос в воспроизводимый рабочий процесс: шаблон, примеры, критерии, версия и проверка.",
          time: "40 мин + практика",
          level: "Практика",
          body: `
            <section class="lesson-section" id="prompt-contract"><span class="section-number">01</span><h2>Промпт — это маленькое <em>техническое задание</em></h2>
              <div class="formula">роль и цель → входные данные → ограничения → формат → критерии → примеры</div>
              <div class="example"><p class="kicker">До</p><p>«Сделай краткое резюме обращения».</p><p class="kicker">После</p><p>«Ты помощник первой линии. По тексту обращения верни JSON с полями <code>topic</code>, <code>urgency</code>, <code>order_id</code>, <code>summary</code>. Не придумывай отсутствующие значения: используй <code>null</code>. Summary — одно предложение до 25 слов».</p></div>
              <p>Вторая версия проверяема автоматически: известны поля, допустимое поведение при нехватке данных и ограничение длины.</p>
            </section>
            <section class="lesson-section" id="prompt-test-table"><span class="section-number">02</span><h2>Один красивый ответ не заменяет <em>набор примеров</em></h2>
              <p>Соберите таблицу: вход, ожидаемые обязательные факты, запрещённые утверждения, допустимый формат и фактический ответ. Добавьте короткие, длинные, противоречивые и неполные запросы.</p>
              <div class="card-grid"><article class="card"><h3>Обычный случай</h3><p>Все данные есть, формулировка понятна.</p></article><article class="card"><h3>Нет обязательного поля</h3><p>Модель должна вернуть null или задать вопрос.</p></article><article class="card"><h3>Конфликт</h3><p>В разных местах указаны разные даты или суммы.</p></article><article class="card accent"><h3>Попытка обойти правило</h3><p>В пользовательском тексте есть команда игнорировать системные ограничения.</p></article></div>
              <div class="quiz" data-quiz data-answer="missing"><h3>В обращении нет номера заказа, а формат требует order_id. Какое поведение легче проверять?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-prompt-missing" value="missing"><span>Вернуть null и указать, что поле отсутствует</span></label><label class="quiz-option"><input type="radio" name="q-prompt-missing" value="guess"><span>Придумать правдоподобный номер</span></label><label class="quiz-option"><input type="radio" name="q-prompt-missing" value="omit"><span>Каждый раз случайно менять формат</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Явный null или уточнение можно проверить программно; выдуманный идентификатор опасен."></span></div></div>
            </section>
            <section class="lesson-section" id="prompt-versioning"><span class="section-number">03</span><h2>Меняйте одну вещь и сохраняйте <em>версию</em></h2>
              <ol><li>Зафиксируйте модель, температуру и prompt v1.</li><li>Прогоните один и тот же eval-набор.</li><li>Запишите ошибки по категориям.</li><li>Измените только одну инструкцию или пример.</li><li>Получите v2 и повторите тест.</li><li>Сравните качество, стоимость и длину ответа.</li></ol>
              <div class="plain"><p class="kicker">Почему это важно</p><p>Если одновременно сменить модель, prompt, документы и температуру, улучшение нельзя объяснить и трудно воспроизвести.</p></div>
            </section>
            <section class="lesson-section" id="prompt-work-task"><span class="section-number">04</span><h2>Практика: создайте <em>три версии</em></h2>
              <p>Возьмите рабочий текст: письмо, обращение, отчёт или описание задачи. Сделайте v1 с целью и форматом, v2 — с критериями и поведением при нехватке данных, v3 — с двумя короткими примерами. Прогоните минимум 10 разных входов и отметьте ошибки.</p>
              <div class="source-box"><p><a href="practice/prompt_template.md" download>Скачать каркас промпта</a> · <a href="practice/prompt_eval.csv" download>Скачать таблицу из 10 eval-примеров</a>. Скопируйте файлы, замените учебные поля своей задачей и сохраняйте результат каждой версии в новой колонке.</p></div>
              <div class="quiz" data-quiz data-answer="format,missing,examples"><p class="kicker">Несколько ответов</p><h3>Что делает промпт пригодным для рабочего процесса?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="format"><span>Однозначный формат результата</span></label><label class="quiz-option"><input type="checkbox" value="missing"><span>Правило для отсутствующих данных</span></label><label class="quiz-option"><input type="checkbox" value="examples"><span>Примеры сложных случаев</span></label><label class="quiz-option"><input type="checkbox" value="polite"><span>Максимально длинная вежливая прелюдия</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Формат, обработка пропусков и примеры превращают пожелание в проверяемую инструкцию."></span></div></div>
            </section>
          `
        },
        {
          id: "classifier-mini-project",
          title: "Мини-проект: классификатор обращений",
          deck: "Построим дешёвый TF-IDF baseline, прочитаем confusion matrix и решим, нужен ли более сложный encoder.",
          time: "60–90 мин",
          level: "Код + анализ",
          body: `
            <section class="lesson-section" id="classifier-goal"><span class="section-number">01</span><h2>Задача: отправить обращение в <em>правильную очередь</em></h2>
              <p class="lead">На входе текст пользователя, на выходе одна из четырёх тем: доставка, возврат, качество или аккаунт. Это классификация, а не генерация.</p>
              <div class="plain"><p class="kicker">Почему начинаем с TF-IDF</p><p>Baseline обучается быстро, работает на CPU и показывает, насколько задача решается по словам и коротким фразам. BERT имеет смысл подключать после измеренного провала baseline, а не из-за моды.</p></div>
              <div class="source-box"><p><a href="practice/tickets.csv" download>Учебные обращения</a> · <a href="practice/ticket_classifier.py" download>Готовый Python-скрипт</a> · <a href="practice/requirements.txt" download>Зависимости</a></p></div>
            </section>
            <section class="lesson-section" id="classifier-run"><span class="section-number">02</span><h2>Что делает <em>скрипт</em></h2>
              <div class="example"><div class="example-steps"><div class="example-step"><span>1</span><p>Читает 32 размеченных обращения.</p></div><div class="example-step"><span>2</span><p>Делит данные на train и test со стратификацией.</p></div><div class="example-step"><span>3</span><p>Строит unigram/bigram TF-IDF признаки.</p></div><div class="example-step"><span>4</span><p>Обучает Logistic Regression с балансировкой классов.</p></div><div class="example-step"><span>5</span><p>Печатает precision, recall, F1 и confusion matrix.</p></div></div></div>
              <pre class="formula">python ticket_classifier.py</pre>
              <p>На таком маленьком наборе конкретная цифра нестабильна — цель практики не рекорд, а правильный эксперимент. Добавьте реальные обезличенные примеры и сохраните test неизменным.</p>
            </section>
            <section class="lesson-section" id="classifier-errors"><span class="section-number">03</span><h2>Смотрите не только на среднее, а на <em>ошибки</em></h2>
              <p>Если «повреждённая доставка» путается между quality и delivery, это может быть не ошибка модели, а неоднозначная разметка. Сначала уточните правило: маршрут определяется причиной претензии или ответственным отделом?</p>
              <div class="card-grid"><article class="card"><h3>Низкий recall класса</h3><p>Модель пропускает много обращений этой темы. Добавьте разнообразные примеры и проверьте формулировки.</p></article><article class="card"><h3>Низкий precision класса</h3><p>В очередь приходит много чужих обращений. Найдите класс, с которым происходит путаница.</p></article><article class="card wide accent"><h3>Хорошие метрики, плохой продукт</h3><p>Проверьте новые периоды, каналы, короткие сообщения, опечатки и цену неправильной маршрутизации.</p></article></div>
              <div class="quiz" data-quiz data-answer="labels"><h3>Модель постоянно путает два класса, а эксперты тоже спорят о правильной метке. Что проверить первым?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-classifier-labels" value="labels"><span>Определение классов и согласованность разметки</span></label><label class="quiz-option"><input type="radio" name="q-classifier-labels" value="bigger"><span>Сразу взять модель в десять раз больше</span></label><label class="quiz-option"><input type="radio" name="q-classifier-labels" value="accuracy"><span>Скрыть классы и оставить только accuracy</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Модель не может устойчиво выучить правило, о котором не договорились сами разметчики."></span></div></div>
            </section>
            <section class="lesson-section" id="classifier-next"><span class="section-number">04</span><h2>Лестница улучшений</h2>
              <ol><li>Добавьте по 30–50 реальных примеров каждого класса.</li><li>Уберите дубликаты и утечки между train и test.</li><li>Посмотрите ошибки по классам и уточните инструкцию разметки.</li><li>Сравните word и character n-grams.</li><li>Только затем попробуйте sentence embeddings или fine-tuning encoder.</li><li>Сравните прирост с задержкой и стоимостью.</li></ol>
              <div class="quiz" data-quiz data-answer="same-test"><h3>Как честно сравнить TF-IDF и BERT?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-classifier-compare" value="same-test"><span>Использовать один и тот же отложенный test</span></label><label class="quiz-option"><input type="radio" name="q-classifier-compare" value="different"><span>Для каждой модели подобрать удобные примеры</span></label><label class="quiz-option"><input type="radio" name="q-classifier-compare" value="demo"><span>Выбрать по одному красивому ответу</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Одинаковый test отделяет изменение модели от изменения сложности примеров."></span></div></div>
            </section>
          `
        },
        {
          id: "search-rag-mini-project",
          title: "Мини-проект: поиск и RAG по рабочим документам",
          deck: "Соберём смысловой поиск, проверим Recall@k, добавим порог отказа и подготовим контекст для генератора.",
          time: "90–120 мин",
          level: "Код + система",
          body: `
            <section class="lesson-section" id="search-first"><span class="section-number">01</span><h2>Сначала докажите, что система умеет <em>находить</em></h2>
              <p class="lead">Если правильного документа нет в top-k, генератор не сможет сослаться на него. Поэтому первый готовый продукт этой практики — поиск, а не чат.</p>
              <div class="source-box"><p><a href="practice/semantic_search.py" download>Смысловой поиск</a> · <a href="practice/knowledge_base.json" download>Учебная база знаний</a> · <a href="practice/eval_cases.jsonl" download>Eval-набор</a></p></div>
              <pre class="formula">python semantic_search.py</pre>
              <p>Пример использует мультиязычную sentence-transformer модель и cosine similarity через нормированные векторы. Замените пять документов своими короткими обезличенными инструкциями.</p>
            </section>
            <section class="lesson-section" id="search-eval"><span class="section-number">02</span><h2>Измерьте Recall@k и <em>отказы</em></h2>
              <ol><li>Для каждого вопроса отметьте правильный document id.</li><li>Запустите retrieval и сохраните top-1, top-3 и scores.</li><li>Посчитайте долю вопросов, где эталон попал в top-k.</li><li>Отдельно возьмите вопросы, ответа на которые в базе нет.</li><li>Подберите порог, который не пропускает опасные догадки и не создаёт слишком много лишних отказов.</li></ol>
              <div class="quiz" data-quiz data-answer="retrieval"><h3>Правильный документ не попадает даже в top-5. Что улучшать до prompt?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-practice-rag-layer" value="retrieval"><span>Chunking, embeddings, sparse/hybrid search и reranking</span></label><label class="quiz-option"><input type="radio" name="q-practice-rag-layer" value="temperature"><span>Температуру генератора</span></label><label class="quiz-option"><input type="radio" name="q-practice-rag-layer" value="tone"><span>Тон финального ответа</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Prompt не восстановит отсутствующее доказательство. Сначала чинят retrieval."></span></div></div>
            </section>
            <section class="lesson-section" id="rag-prompt-build"><span class="section-number">03</span><h2>Затем соберите <em>контекст и prompt</em></h2>
              <div class="source-box"><p><a href="practice/rag_minimal.py" download>Скачать минимальный RAG-скрипт</a>. Он выполняет retrieval, показывает scores, применяет answerability gate и печатает готовый prompt. Платный API и секреты для упражнения не нужны.</p></div>
              <pre class="formula">python rag_minimal.py</pre>
              <p>Когда два ручных вопроса отработали, выполните <code>python rag_minimal.py --eval</code>: скрипт прогонит весь набор <code>eval_cases.jsonl</code> и покажет Recall@3 и точность решения «ответить или отказаться».</p>
              <div class="plain"><p class="kicker">Два контрольных вопроса</p><p>Введите «Когда вернут деньги на карту?» — скрипт должен найти <code>refund-card</code>. Затем введите «Какая гарантия на холодильник?» — правильное поведение учебной системы: отказ, потому что такого знания в базе нет.</p></div>
              <div class="quiz" data-quiz data-answer="calibrate"><h3>Можно ли перенести порог similarity 0,45 в другой проект без проверки?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-rag-threshold" value="calibrate"><span>Нет, его нужно калибровать на своём корпусе и eval-наборе</span></label><label class="quiz-option"><input type="radio" name="q-rag-threshold" value="universal"><span>Да, cosine similarity везде означает одно и то же качество</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Распределение scores зависит от модели, документов, chunking и запросов. Универсального порога нет."></span></div></div>
            </section>
            <section class="lesson-section" id="rag-work-adaptation"><span class="section-number">04</span><h2>Как заменить учебные данные <em>рабочими</em></h2>
              <ol><li>Возьмите 5–20 документов с понятным владельцем и версией.</li><li>Удалите персональные данные и секреты до внешних API.</li><li>Сохраните title, source, page/section и дату обновления.</li><li>Разбейте документы по смысловым разделам, а не только по числу символов.</li><li>Соберите минимум 30 реальных вопросов и эталонные источники.</li><li>Проверьте retrieval отдельно, затем ответы и цитаты.</li></ol>
              <div class="takeaway"><strong>Готовый результат</strong>Не «чат отвечает», а измеренный поиск, понятный отказ при отсутствии знания и ответ, каждое важное утверждение которого можно открыть в источнике.</div>
              <div class="source-box"><p>Техническая основа примера проверена по <a href="https://huggingface.co/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2" target="_blank" rel="noreferrer">карточке модели</a> и <a href="https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html" target="_blank" rel="noreferrer">документации Sentence Transformers</a>.</p></div>
            </section>
          `
        },
        {
          id: "safe-agent-mini-project",
          title: "Мини-проект: агент с безопасными инструментами",
          deck: "Отделим решение модели от исполнения: контракт tools, проверка прав, подтверждение изменений и тестирование траектории.",
          time: "75–100 мин",
          level: "Код + безопасность",
          body: `
            <section class="lesson-section" id="agent-separation"><span class="section-number">01</span><h2>LLM предлагает вызов, программа решает, <em>можно ли выполнять</em></h2>
              <p class="lead">Модель не должна напрямую менять заказ, отправлять письмо или проводить оплату. Она формирует структурированное предложение: имя tool и аргументы. Обычный код валидирует его, проверяет пользователя и запрашивает подтверждение.</p>
              <div class="diagram"><div class="flow"><div class="flow-node"><strong>Запрос</strong><span>цель пользователя</span></div><div class="flow-node"><strong>LLM</strong><span>предлагает tool call</span></div><div class="flow-node"><strong>Policy</strong><span>права, схема, лимиты</span></div><div class="flow-node"><strong>Подтверждение</strong><span>для изменений</span></div><div class="flow-node"><strong>Tool</strong><span>точное действие</span></div></div></div>
              <div class="source-box"><p><a href="practice/agent_safe.py" download>Скачать безопасный пример tools</a>. Он работает без API и показывает разницу между чтением статуса и отменой заказа.</p></div>
            </section>
            <section class="lesson-section" id="agent-tool-contract"><span class="section-number">02</span><h2>Контракт инструмента должен быть уже, чем <em>возможности системы</em></h2>
              <div class="card-grid"><article class="card"><h3>Явные аргументы</h3><p><code>order_id</code> и <code>user_id</code>, а не свободная строка «сделай что-нибудь с заказом».</p></article><article class="card"><h3>Проверка владельца</h3><p>Права проверяет backend, а не утверждение модели.</p></article><article class="card"><h3>Допустимые состояния</h3><p>Отменять можно processing, но нельзя уже отправленный заказ.</p></article><article class="card accent"><h3>Идемпотентность</h3><p>Повторный вызов не должен дважды списать деньги или повторить необратимое действие.</p></article></div>
              <div class="quiz" data-quiz data-answer="backend"><h3>Модель уверенно пишет: «Пользователь — владелец заказа». Где должна выполняться настоящая проверка?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-agent-owner" value="backend"><span>В коде инструмента по данным авторизации</span></label><label class="quiz-option"><input type="radio" name="q-agent-owner" value="prompt"><span>Только в системном промпте</span></label><label class="quiz-option"><input type="radio" name="q-agent-owner" value="confidence"><span>По уверенности формулировки модели</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Модель передаёт намерение, но права и бизнес-правила обязан проверять доверенный код."></span></div></div>
            </section>
            <section class="lesson-section" id="agent-run"><span class="section-number">03</span><h2>Запустите и прочитайте <em>три результата</em></h2>
              <pre class="formula">python agent_safe.py</pre>
              <ol><li>Read-only tool возвращает статус без подтверждения.</li><li>Отмена без подтверждения возвращает <code>confirmation_required</code>.</li><li>Тот же вызов после подтверждения меняет состояние.</li><li>Попробуйте заменить <code>A-100</code> на чужой или несуществующий заказ.</li><li>Попробуйте отменить <code>A-101</code>, который уже отправлен.</li></ol>
              <div class="plain"><p class="kicker">Следующий шаг</p><p>Подключая LLM, замените только создание словаря <code>{name, arguments}</code>. Функцию проверки и исполнения оставьте независимой от модели.</p></div>
            </section>
            <section class="lesson-section" id="agent-evals"><span class="section-number">04</span><h2>Проверяйте не текст, а <em>траекторию</em></h2>
              <ul><li>Выбран ли правильный tool.</li><li>Не потеряны ли обязательные аргументы.</li><li>Не вызван ли write-tool без подтверждения.</li><li>Остановился ли цикл после ошибки.</li><li>Передана ли задача человеку, когда прав или данных нет.</li><li>Сколько шагов, времени и денег потребовалось.</li></ul>
              <div class="quiz" data-quiz data-answer="tool,arguments,confirmation,recovery"><p class="kicker">Несколько ответов</p><h3>Что включить в eval агента?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="tool"><span>Выбор инструмента</span></label><label class="quiz-option"><input type="checkbox" value="arguments"><span>Корректность аргументов</span></label><label class="quiz-option"><input type="checkbox" value="confirmation"><span>Соблюдение подтверждений</span></label><label class="quiz-option"><input type="checkbox" value="recovery"><span>Восстановление после ошибки</span></label><label class="quiz-option"><input type="checkbox" value="style"><span>Только красоту финального текста</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="У агента оценивается весь путь: решение, параметры, разрешения, реакция на ошибку и завершение."></span></div></div>
            </section>
          `
        },
        {
          id: "production-pilot-playbook",
          title: "Из ноутбука в рабочий пилот",
          deck: "Четырёхнедельный маршрут: данные, baseline, evals, наблюдаемость, ограниченный запуск и решение о масштабировании.",
          time: "45 мин + проект",
          level: "Внедрение",
          body: `
            <section class="lesson-section" id="pilot-week-one"><span class="section-number">01</span><h2>Неделя 1: задача, данные и <em>границы</em></h2>
              <ol><li>Выберите один узкий сценарий и владельца процесса.</li><li>Соберите 30–100 обезличенных реальных примеров.</li><li>Опишите правильный результат и категории ошибок.</li><li>Зафиксируйте текущие время, качество и стоимость.</li><li>Определите данные, которые нельзя отправлять внешнему API.</li></ol>
              <div class="takeaway"><strong>Выход недели</strong>Заполненная карточка проекта, eval-набор и простой baseline.</div>
            </section>
            <section class="lesson-section" id="pilot-week-two"><span class="section-number">02</span><h2>Неделя 2: минимальный <em>вертикальный срез</em></h2>
              <p>Соберите путь от реального входа до результата, но оставьте человека перед финальным действием. Для RAG сохраните источники и scores; для агента — tool calls и observations; для классификатора — вероятности и ошибочные примеры.</p>
              <div class="plain"><p class="kicker">Не оптимизируйте всё сразу</p><p>Добейтесь воспроизводимого запуска одной версии. Зафиксируйте model id, prompt, параметры, версию данных и кода.</p></div>
            </section>
            <section class="lesson-section" id="pilot-week-three"><span class="section-number">03</span><h2>Неделя 3: ошибки, защита и <em>стоимость</em></h2>
              <div class="card-grid"><article class="card"><h3>Качество</h3><p>Метрики по категориям, ручной разбор провалов, вопросы без ответа.</p></article><article class="card"><h3>Надёжность</h3><p>Timeout, недоступный API, пустой поиск, неверный формат.</p></article><article class="card"><h3>Безопасность</h3><p>Права, prompt injection, персональные данные, подтверждение действий.</p></article><article class="card accent"><h3>Экономика</h3><p>Токены, число вызовов, задержка, цена проверки человеком.</p></article></div>
            </section>
            <section class="lesson-section" id="pilot-week-four"><span class="section-number">04</span><h2>Неделя 4: ограниченный <em>пилот</em></h2>
              <ol><li>Дайте доступ небольшой группе и объясните границы системы.</li><li>Начните с режима черновика или read-only.</li><li>Логируйте согласованные данные без секретов и лишних персональных сведений.</li><li>Собирайте исправления пользователей как кандидаты в eval-набор.</li><li>Определите условия остановки и возврата к ручному процессу.</li><li>Сравните итог с baseline и решите: улучшать, масштабировать или закрыть.</li></ol>
              <div class="quiz" data-quiz data-answer="draft,read-only,small"><p class="kicker">Несколько ответов</p><h3>Как безопаснее начать пилот?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="draft"><span>Черновики с проверкой человеком</span></label><label class="quiz-option"><input type="checkbox" value="read-only"><span>Read-only инструменты</span></label><label class="quiz-option"><input type="checkbox" value="small"><span>Небольшая группа пользователей</span></label><label class="quiz-option"><input type="checkbox" value="full"><span>Сразу полная автономность для всех</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Ограниченная аудитория, черновики и read-only уменьшают последствия неизвестных ошибок."></span></div></div>
            </section>
            <section class="lesson-section" id="pilot-definition-done"><span class="section-number">05</span><h2>Definition of Done для <em>рабочего AI</em></h2>
              <ul><li>Решение превосходит baseline на зафиксированном eval-наборе.</li><li>Известны слабые категории и корректное поведение вне области применимости.</li><li>Можно проследить источник ответа или траекторию действий.</li><li>Стоимость и задержка укладываются в ограничения процесса.</li><li>Секреты, права и персональные данные защищены вне prompt.</li><li>Есть владелец, мониторинг, версия, план обновления и отката.</li></ul>
              <div class="quiz" data-quiz data-answer="no"><h3>Система отвечает красиво в демо, но нет eval-набора, логов и плана отката. Готова ли она к production?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-production-ready" value="no"><span>Нет, демонстрация не доказывает надёжность</span></label><label class="quiz-option"><input type="radio" name="q-production-ready" value="yes"><span>Да, если ответ понравился руководителю</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Production требует повторяемой оценки, наблюдаемости и безопасного восстановления, а не только удачного примера."></span></div></div>
              <div class="takeaway"><strong>Главный результат курса</strong>Вы умеете не просто вызвать модель, а выбрать правильный уровень решения, принести ей нужные данные, измерить каждый этап и ограничить риск реального действия.</div>
            </section>
            <div class="source-box"><p><a href="practice/README.md" target="_blank">Открыть весь практикум</a> · <a href="practice/project_brief.md" download>Скачать карточку проекта</a></p></div>
          `
        }
      ]
    }
  ]
};

// В интерфейсе урок по метрикам завершает вводный модуль — так же, как в исходном курсе.
{
  const introLessons = window.COURSE.modules.find((module) => module.number === "01").lessons;
  const metricsIndex = introLessons.findIndex((lesson) => lesson.id === "classification-metrics");
  introLessons.push(...introLessons.splice(metricsIndex, 1));
}
