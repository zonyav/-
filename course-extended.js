(() => {
  const course = window.COURSE;
  const caseDetails = (items) => items.map((item, index) => `
    <details>
      <summary>${String(index + 1).padStart(2, "0")}. ${item.title}</summary>
      <div><p><strong>Подумайте:</strong> ${item.question}</p><p><strong>Разбор:</strong> ${item.answer}</p></div>
    </details>`).join("");

  const competencyLesson = {
    id: "competency-map",
    title: "Карта навыков и входная диагностика",
    deck: "Не просто список тем: отмечаем, что вы можете понять, объяснить и сделать самостоятельно, а затем возвращаемся к карте после проекта.",
    time: "25–35 мин",
    level: "Диагностика",
    body: `
      <section class="lesson-section" id="competency-result"><span class="section-number">01</span><h2>Три уровня настоящего <em>понимания</em></h2>
        <div class="card-grid"><article class="card"><h3>Понимаю</h3><p>Узнаю понятие, вижу его место в системе и понимаю ограничения.</p></article><article class="card"><h3>Объясняю</h3><p>Могу рассказать своими словами, привести пример и ответить на уточнение.</p></article><article class="card wide accent"><h3>Создаю</h3><p>Могу выбрать подход, собрать прототип, измерить качество и объяснить ошибки.</p></article></div>
        <p>Отмечайте навык только если можете выполнить действие без подсказки. Отметки сохраняются на этом устройстве.</p>
      </section>
      <section class="lesson-section" id="competency-checklist"><span class="section-number">02</span><h2>Что вы будете уметь <em>к концу</em></h2>
        <p class="skill-progress" data-skill-progress></p>
        <div class="skill-checklist">
          <label class="skill-item"><input type="checkbox" data-skill="map"><span><strong>Карта решений</strong>Отличить классификацию, поиск, генерацию, RAG, fine-tuning и агента.</span></label>
          <label class="skill-item"><input type="checkbox" data-skill="tokens"><span><strong>Механика LLM</strong>Объяснить токены, embeddings, attention, контекст и генерацию.</span></label>
          <label class="skill-item"><input type="checkbox" data-skill="models"><span><strong>Работа с моделями</strong>Найти model card, запустить pipeline и сравнить модели честно.</span></label>
          <label class="skill-item"><input type="checkbox" data-skill="metrics"><span><strong>Метрики</strong>Выбрать метрику по цене ошибки и прочитать confusion matrix.</span></label>
          <label class="skill-item"><input type="checkbox" data-skill="prompts"><span><strong>Промпты</strong>Создать версионируемый prompt и eval-набор, а не оценивать один ответ.</span></label>
          <label class="skill-item"><input type="checkbox" data-skill="rag"><span><strong>RAG</strong>Собрать ingestion, chunking, retrieval, ответ со ссылками и отказ.</span></label>
          <label class="skill-item"><input type="checkbox" data-skill="agents"><span><strong>Агенты</strong>Спроектировать tools, permissions, подтверждения и eval траектории.</span></label>
          <label class="skill-item"><input type="checkbox" data-skill="production"><span><strong>Production</strong>Оценить стоимость, задержку, безопасность, мониторинг и откат.</span></label>
          <label class="skill-item"><input type="checkbox" data-skill="explain"><span><strong>Коммуникация</strong>Объяснить решение специалисту, руководителю и пользователю.</span></label>
          <label class="skill-item"><input type="checkbox" data-skill="portfolio"><span><strong>Проект</strong>Опубликовать работающий прототип, README, метрики и демонстрацию.</span></label>
        </div>
      </section>
      <section class="lesson-section" id="competency-diagnostic"><span class="section-number">03</span><h2>Входная <em>диагностика</em></h2>
        <div class="quiz" data-quiz data-answer="rag"><h3>Документы меняются каждую неделю, а ответ должен содержать источник. Какой подход проверить первым?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-entry-1" value="rag"><span>RAG по актуальным документам</span></label><label class="quiz-option"><input type="radio" name="q-entry-1" value="finetune"><span>Fine-tuning для запоминания фактов</span></label><label class="quiz-option"><input type="radio" name="q-entry-1" value="agent"><span>Автономный агент с правом изменять документы</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="RAG отделяет знания от параметров модели и позволяет показать актуальный источник."></span></div></div>
        <div class="quiz" data-quiz data-answer="baseline,testset,metric"><p class="kicker">Несколько ответов</p><h3>Что необходимо до усложнения решения?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="baseline"><span>Baseline</span></label><label class="quiz-option"><input type="checkbox" value="testset"><span>Фиксированный test/eval-набор</span></label><label class="quiz-option"><input type="checkbox" value="metric"><span>Критерий успеха</span></label><label class="quiz-option"><input type="checkbox" value="brand"><span>Самая известная модель</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Без исходной точки и одинаковой проверки невозможно доказать улучшение."></span></div></div>
        <div class="workbook"><p class="kicker">Зафиксируйте старт</p><h3>Что я уже умею и что хочу научиться делать?</h3><textarea data-note="entry-goal" placeholder="Например: понимаю общую идею RAG, но не умею оценивать retrieval и публиковать проект..."></textarea><span class="note-status" data-note-status></span></div>
      </section>`
  };

  const startModule = course.modules.find((module) => module.number === "00");
  if (startModule && !startModule.lessons.some((lesson) => lesson.id === competencyLesson.id)) {
    startModule.lessons.splice(1, 0, competencyLesson);
  }

  course.modules.push({
    number: "07",
    title: "Закрепление и экспертное мышление",
    lessons: [
      {
        id: "teach-back-workshop",
        title: "Научитесь объяснять сложное простыми словами",
        deck: "Метод teach-back: сформулировать идею без жаргона, привести аналогию, назвать границы аналогии и ответить на возражение.",
        time: "60–90 мин",
        level: "Объяснение",
        body: `
          <section class="lesson-section" id="teach-back-method"><span class="section-number">01</span><h2>Формула сильного <em>объяснения</em></h2>
            <div class="formula">зачем нужно → как работает → простой пример → где ломается → как проверить</div>
            <p class="lead">Если объяснение держится только на терминах, знание ещё хрупкое. Аналогия помогает начать, но специалист обязан назвать место, где она перестаёт быть точной.</p>
            <div class="example"><p class="kicker">Пример</p><p><strong>Embedding</strong> похож на координаты объектов на карте смыслов: близкие по употреблению объекты часто оказываются рядом. Но это не готовое человеческое понимание — геометрия зависит от данных и способа обучения.</p></div>
          </section>
          <section class="lesson-section" id="teach-back-practice"><span class="section-number">02</span><h2>Шесть обязательных <em>объяснений</em></h2>
            <div class="workbook"><h3>1. Почему LLM не является базой фактов?</h3><textarea data-note="explain-llm" placeholder="Объясните коллеге за 5–7 предложений..."></textarea><span class="note-status" data-note-status></span><details><summary>Критерии сильного ответа</summary><div>Есть вероятностное предсказание токена, влияние данных и контекста, риск уверенной ошибки и способ проверки через источники или инструменты.</div></details></div>
            <div class="workbook"><h3>2. Чем BERT отличается от GPT?</h3><textarea data-note="explain-bert-gpt" placeholder="Сравните архитектуру, обучение и типичные задачи..."></textarea><span class="note-status" data-note-status></span><details><summary>Критерии сильного ответа</summary><div>Encoder и двунаправленный контекст против causal decoder; понимание/представления против генерации следующего токена; без утверждения, что одна модель всегда лучше.</div></details></div>
            <div class="workbook"><h3>3. Как attention выбирает полезный контекст?</h3><textarea data-note="explain-attention" placeholder="Используйте Query, Key, Value и один бытовой пример..."></textarea><span class="note-status" data-note-status></span><details><summary>Критерии сильного ответа</summary><div>Similarity Q и K, нормализация весов, взвешенная сумма V, несколько голов и ограничение: attention показывает вычислительную связь, а не гарантированное объяснение решения.</div></details></div>
            <div class="workbook"><h3>4. Почему RAG — не fine-tuning?</h3><textarea data-note="explain-rag-ft" placeholder="Объясните руководителю, который выбирает бюджет проекта..."></textarea><span class="note-status" data-note-status></span><details><summary>Критерии сильного ответа</summary><div>RAG приносит знания во время запроса и обновляется заменой индекса; fine-tuning меняет поведение или навык модели. Возможна комбинация.</div></details></div>
            <div class="workbook"><h3>5. Чем агент отличается от чат-бота?</h3><textarea data-note="explain-agent" placeholder="Назовите цикл, инструменты и риски..."></textarea><span class="note-status" data-note-status></span><details><summary>Критерии сильного ответа</summary><div>Цель, планирование, tool calls, observation, повторение и остановка; исполнение делает приложение; опасные действия требуют policy и подтверждения.</div></details></div>
            <div class="workbook"><h3>6. Почему высокая accuracy может обманывать?</h3><textarea data-note="explain-accuracy" placeholder="Приведите пример редкого, но дорогого класса..."></textarea><span class="note-status" data-note-status></span><details><summary>Критерии сильного ответа</summary><div>Дисбаланс классов, цена FP/FN, precision/recall/F1 по классам и сравнение с простым baseline.</div></details></div>
            <div class="source-box"><p><a href="practice/explain_cards.md" download>Скачать 12 карточек для устной тренировки</a>. Запишите ответы голосом, переслушайте и сократите каждое объяснение до двух минут.</p></div>
          </section>
          <section class="lesson-section" id="teach-back-check"><span class="section-number">03</span><h2>Проверьте не красоту, а <em>понимание</em></h2>
            <div class="quiz" data-quiz data-answer="boundary"><h3>Что обязательно добавить к хорошей аналогии?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-teach-boundary" value="boundary"><span>Границу, где аналогия перестаёт быть точной</span></label><label class="quiz-option"><input type="radio" name="q-teach-boundary" value="terms"><span>Как можно больше терминов</span></label><label class="quiz-option"><input type="radio" name="q-teach-boundary" value="confidence"><span>Уверенный тон без оговорок</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Граница защищает от ложного переноса свойств аналогии на реальный механизм."></span></div></div>
          </section>`
      },
      {
        id: "cases-choose-architecture",
        title: "Кейсы: выбрать правильную архитектуру",
        deck: "Шесть рабочих ситуаций, где ценность создаёт не самая большая модель, а правильная форма решения.",
        time: "45–60 мин",
        level: "Решения",
        body: `
          <section class="lesson-section" id="cases-choice-rule"><span class="section-number">01</span><h2>Начинайте с формы <em>результата</em></h2>
            <p>Список документов требует поиска; фиксированная метка — классификации; ответ по изменяемым знаниям — RAG; изменение поведения — prompt или fine-tuning; последовательность действий — агента.</p>
          </section>
          <section class="lesson-section" id="cases-choice-six"><span class="section-number">02</span><h2>Шесть ситуаций с <em>разбором</em></h2>
            ${caseDetails([
              {title:"Маршрутизация 200 тысяч обращений",question:"На выходе одна из 12 очередей. Что будет baseline?",answer:"Размеченная классификация: сначала TF-IDF + Logistic Regression, затем encoder при доказанном разрыве. Генерация лишняя."},
              {title:"Помощник по внутренним регламентам",question:"Документы меняются, нужны ссылки. Что строить?",answer:"RAG: ingestion, версии, retrieval, reranking при необходимости, grounded answer и отказ без источника."},
              {title:"Единый стиль ответов операторов",question:"Знания уже приходят в prompt, но тон нестабилен. Что пробовать?",answer:"Сначала строгий шаблон и примеры; затем supervised fine-tuning или LoRA, если eval показывает устойчивый пробел поведения."},
              {title:"Пять похожих договоров",question:"Пользователю нужен список, а не пересказ. Нужна ли генерация?",answer:"Нет. Semantic или hybrid search с фильтрами и reranking решает продуктовую задачу напрямую."},
              {title:"Сверка счёта с заказом",question:"Поля известны и правила точные. Нужна ли LLM?",answer:"Сначала обычный парсер, OCR и детерминированные проверки. LLM можно оставить для неструктурированных исключений."},
              {title:"Перенести встречу и уведомить участников",question:"Нужно несколько действий во внешних системах. Что добавить?",answer:"Agent loop с узкими tools, правами, подтверждением изменения календаря, идемпотентностью и журналом вызовов."}
            ])}
            <div class="quiz" data-quiz data-answer="classification"><h3>Выход всегда одна фиксированная категория. Какой первый baseline?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-case-choice-1" value="classification"><span>Классический классификатор</span></label><label class="quiz-option"><input type="radio" name="q-case-choice-1" value="rag"><span>RAG</span></label><label class="quiz-option"><input type="radio" name="q-case-choice-1" value="agent"><span>Автономный агент</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Форма ответа — метка, значит сначала проверяют самый простой классификационный baseline."></span></div></div>
            <div class="quiz" data-quiz data-answer="search"><h3>Пользователь просит список релевантных документов. Какой компонент создаёт ценность?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-case-choice-2" value="search"><span>Retrieval и ранжирование</span></label><label class="quiz-option"><input type="radio" name="q-case-choice-2" value="generation"><span>Только красивый генератор</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Не добавляйте генерацию, если продуктовый результат уже является списком источников."></span></div></div>
          </section>`
      },
      {
        id: "cases-diagnose-system",
        title: "Кейсы: найти слой, где сломалась система",
        deck: "Ещё шесть ситуаций: отделяем проблему данных, retrieval, prompt, генерации и инструментов.",
        time: "45–60 мин",
        level: "Диагностика",
        body: `
          <section class="lesson-section" id="cases-diagnose-rule"><span class="section-number">01</span><h2>Меняйте компонент только после <em>локализации ошибки</em></h2>
            <div class="formula">вход → данные → retrieval/model → prompt → output parser → tool → пользовательский результат</div>
          </section>
          <section class="lesson-section" id="cases-diagnose-six"><span class="section-number">02</span><h2>Шесть разборов <em>ошибок</em></h2>
            ${caseDetails([
              {title:"RAG уверенно отвечает не по теме",question:"Нужного документа нет даже в top-10. Что чинить?",answer:"Корпус, chunking, metadata filters, embeddings, hybrid search или reranker. Prompt не вернёт отсутствующий контекст."},
              {title:"Документ найден, но ответ противоречит ему",question:"Retrieval верный. Где искать?",answer:"Проверить сборку контекста, порядок фрагментов, системную инструкцию, цитаты и groundedness ответа."},
              {title:"Классификатор хорош на тесте и плох через месяц",question:"Почему?",answer:"Возможен data drift, случайный split вместо временного или утечка. Нужен time-based test и мониторинг распределений."},
              {title:"Агент дважды отправляет письмо",question:"Что отсутствует?",answer:"Идемпотентный ключ, состояние выполнения и защита от повторного tool call. Prompt сам по себе не гарантирует exactly-once."},
              {title:"JSON периодически не разбирается",question:"Как снизить ошибку?",answer:"Structured output/schema, низкая вариативность, строгий parser, retry с лимитом и eval доли валидных результатов."},
              {title:"Ответ хороший, но пользователи не применяют его",question:"Это ошибка модели?",answer:"Возможно, нет. Проверяются место в процессе, доверие, объяснимость, задержка и цена человеческой проверки."}
            ])}
            <div class="quiz" data-quiz data-answer="retrieval"><h3>Эталонного документа нет в top-k. Какой слой не прошёл проверку?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-case-debug-1" value="retrieval"><span>Retrieval</span></label><label class="quiz-option"><input type="radio" name="q-case-debug-1" value="tone"><span>Тон ответа</span></label><label class="quiz-option"><input type="radio" name="q-case-debug-1" value="ui"><span>Цвет интерфейса</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Генератор не может надёжно сослаться на доказательство, которое ему не передали."></span></div></div>
            <div class="quiz" data-quiz data-answer="time-split,drift"><p class="kicker">Несколько ответов</p><h3>Что проверить, если качество упало на новых данных?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="time-split"><span>Временной split</span></label><label class="quiz-option"><input type="checkbox" value="drift"><span>Изменение входных данных</span></label><label class="quiz-option"><input type="checkbox" value="demo"><span>Только старые удачные примеры</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Случайный test может скрыть изменение языка, продукта или источников во времени."></span></div></div>
          </section>`
      },
      {
        id: "cases-production-decisions",
        title: "Кейсы: качество, риск и экономика",
        deck: "Последние шесть ситуаций учат принимать production-решения, а не выбирать модель по впечатлению от демо.",
        time: "45–60 мин",
        level: "Production",
        body: `
          <section class="lesson-section" id="cases-production-six"><span class="section-number">01</span><h2>Шесть решений с реальными <em>ограничениями</em></h2>
            ${caseDetails([
              {title:"Точность выросла на 2%, цена — в 12 раз",question:"Как принять решение?",answer:"Перевести прирост в бизнес-эффект, учесть latency и объём. Возможен routing: дешёвая модель для простых случаев, дорогая — для сложных."},
              {title:"Медицинский черновик",question:"Можно ли сразу показывать пациенту?",answer:"Нет. Ограниченный сценарий, проверка специалистом, источники, приватность, логирование и ясное распределение ответственности."},
              {title:"Внешний API получает договоры",question:"Какой вопрос раньше качества?",answer:"Разрешено ли передавать эти данные: договор, регион хранения, retention, обезличивание, доступ и альтернатива локального развёртывания."},
              {title:"Агент может возвращать деньги",question:"Как начать пилот?",answer:"Read-only или draft mode; лимит суммы; проверка владельца на backend; явное подтверждение; audit log и rollback, где возможен."},
              {title:"Провайдер изменил модель",question:"Что должно сработать?",answer:"Версионирование, регрессионный eval, canary, мониторинг метрик и возможность быстро вернуть прежнюю конфигурацию."},
              {title:"Редкая ошибка стоит очень дорого",question:"Оптимизировать среднее качество?",answer:"Нет. Выделить критический slice, измерять его отдельно, использовать conservative threshold и передавать сомнительные случаи человеку."}
            ])}
            <div class="quiz" data-quiz data-answer="business"><h3>Модель стала точнее, но дороже. Что решает вопрос о внедрении?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-case-prod-1" value="business"><span>Бизнес-эффект с учётом стоимости и риска</span></label><label class="quiz-option"><input type="radio" name="q-case-prod-1" value="leaderboard"><span>Только место модели в рейтинге</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Нужна ценность на реальном объёме, а не изолированная цифра качества."></span></div></div>
            <div class="quiz" data-quiz data-answer="human,limit,log"><p class="kicker">Несколько ответов</p><h3>Что снижает риск дорогой редкой ошибки?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="human"><span>Передача сомнительного случая человеку</span></label><label class="quiz-option"><input type="checkbox" value="limit"><span>Лимиты и консервативный порог</span></label><label class="quiz-option"><input type="checkbox" value="log"><span>Журнал и отдельная метрика критического slice</span></label><label class="quiz-option"><input type="checkbox" value="average"><span>Скрыть редкий класс внутри среднего</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Критические случаи оценивают и ограничивают отдельно."></span></div></div>
          </section>`
      },
      {
        id: "error-atlas",
        title: "Атлас ошибок AI-систем",
        deck: "Справочник, который помогает не крутить случайные параметры, а найти причину и выбрать следующий эксперимент.",
        time: "50–70 мин",
        level: "Диагностика",
        body: `
          <section class="lesson-section" id="error-atlas-map"><span class="section-number">01</span><h2>Ошибка всегда принадлежит <em>слою</em></h2>
            <table class="rubric"><thead><tr><th>Симптом</th><th>Проверить сначала</th><th>Не делать вслепую</th></tr></thead><tbody>
              <tr><td>Классы путаются</td><td>Правило разметки, confusion matrix, примеры пары классов</td><td>Брать модель больше</td></tr>
              <tr><td>Низкий Recall@k</td><td>Корпус, chunking, filters, query, embeddings</td><td>Переписывать ответный prompt</td></tr>
              <tr><td>Источник найден, ответ неверный</td><td>Контекст, instruction hierarchy, groundedness</td><td>Менять индекс без причины</td></tr>
              <tr><td>Неустойчивый JSON</td><td>Schema, parser, decoding, retry policy</td><td>Разбирать ответ регуляркой без тестов</td></tr>
              <tr><td>Агент зациклился</td><td>Stop condition, max steps, observation, tool errors</td><td>Разрешать бесконечные повторы</td></tr>
              <tr><td>Рост стоимости</td><td>Токены, число calls, cache, routing, контекст</td><td>Смотреть только цену одного запроса</td></tr>
              <tr><td>Падение после релиза</td><td>Версии модели/prompt/данных, slices, drift</td><td>Сравнивать с другим eval-набором</td></tr>
            </tbody></table>
          </section>
          <section class="lesson-section" id="error-log"><span class="section-number">02</span><h2>Ведите журнал <em>ошибок</em></h2>
            <div class="formula">case_id → expected → actual → error_layer → severity → hypothesis → experiment → result</div>
            <div class="source-box"><p><a href="practice/error_log.csv" download>Скачать журнал ошибок</a>. Одна строка — один воспроизводимый провал, а не общее впечатление.</p></div>
            <div class="quiz" data-quiz data-answer="one"><h3>Сколько компонентов лучше менять в одном диагностическом эксперименте?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-error-one" value="one"><span>Один</span></label><label class="quiz-option"><input type="radio" name="q-error-one" value="all"><span>Все сразу</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Иначе нельзя связать изменение с результатом."></span></div></div>
          </section>`
      },
      {
        id: "lab-roadmap-and-oral-exam",
        title: "Семь лабораторных и устный экзамен",
        deck: "Каждый большой раздел заканчивается артефактом, который можно показать, проверить и включить в итоговый проект.",
        time: "7 × 1–3 часа",
        level: "Практика",
        body: `
          <section class="lesson-section" id="lab-roadmap"><span class="section-number">01</span><h2>Лестница <em>артефактов</em></h2>
            <div class="example"><div class="example-steps">
              <div class="example-step"><span>1</span><p><strong>Классификация:</strong> baseline, split, метрики и пять разобранных ошибок.</p></div>
              <div class="example-step"><span>2</span><p><strong>Embeddings:</strong> semantic search, десять запросов и Recall@k.</p></div>
              <div class="example-step"><span>3</span><p><strong>Hugging Face:</strong> сравнение двух model cards и воспроизводимый запуск.</p></div>
              <div class="example-step"><span>4</span><p><strong>Prompting:</strong> v1–v3, фиксированный eval и журнал изменений.</p></div>
              <div class="example-step"><span>5</span><p><strong>RAG:</strong> ingestion, retrieval, ссылки и корректный отказ.</p></div>
              <div class="example-step"><span>6</span><p><strong>Agent:</strong> два tools, schema, permissions, confirm и trajectory tests.</p></div>
              <div class="example-step"><span>7</span><p><strong>Production:</strong> стоимость, latency, угрозы, мониторинг и rollback.</p></div>
            </div></div>
            <div class="source-box"><p><a href="practice/lab_checklist.md" download>Скачать чек-листы лабораторных</a> · <a href="practice/lab_report.md" download>Скачать шаблон отчёта</a></p></div>
          </section>
          <section class="lesson-section" id="oral-exam"><span class="section-number">02</span><h2>Устный экзамен без <em>заучивания</em></h2>
            <ol><li>Случайно выберите пять карточек.</li><li>На подготовку к каждой — 30 секунд.</li><li>Объяснение — до двух минут.</li><li>Обязательно приведите пример и ограничение.</li><li>Ответьте на один вопрос «почему не альтернативный подход?».</li></ol>
            <div class="workbook"><h3>Мой самый слабый ответ и план улучшения</h3><textarea data-note="oral-gap" placeholder="Какая тема рассыпалась на уточняющих вопросах? Что перечитать и какой пример собрать?"></textarea><span class="note-status" data-note-status></span></div>
            <div class="quiz" data-quiz data-answer="example,boundary,choice"><p class="kicker">Несколько ответов</p><h3>Что делает устный ответ убедительным?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="example"><span>Конкретный пример</span></label><label class="quiz-option"><input type="checkbox" value="boundary"><span>Ограничение подхода</span></label><label class="quiz-option"><input type="checkbox" value="choice"><span>Обоснование выбора</span></label><label class="quiz-option"><input type="checkbox" value="jargon"><span>Максимум жаргона</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Понимание видно по причинной связи, примеру, границе и сравнению альтернатив."></span></div></div>
          </section>`
      }
    ]
  });

  course.modules.push({
    number: "08",
    title: "Итоговый проект: рабочий RAG",
    lessons: [
      {
        id: "capstone-brief",
        title: "Проект, который можно показать",
        deck: "Соберём ассистента по базе знаний: документы, смысловой поиск, ответ со ссылками, корректный отказ, метрики, интерфейс и отчёт.",
        time: "45–60 мин",
        level: "Capstone",
        body: `
          <section class="lesson-section" id="capstone-result"><span class="section-number">01</span><h2>Definition of Done <em>до кода</em></h2>
            <ul><li>Есть владелец задачи и понятный пользователь.</li><li>Документы имеют источник и дату обновления.</li><li>Эталонный документ попадает в top-k на измеренном наборе.</li><li>Ответ содержит ссылки на найденные фрагменты.</li><li>Вопрос вне базы приводит к отказу.</li><li>Известны latency, примерная стоимость и слабые случаи.</li><li>Секреты не находятся в репозитории.</li><li>Проект запускается по README другим человеком.</li></ul>
            <div class="source-box"><p><a href="practice/capstone/README.md" target="_blank">Открыть комплект итогового проекта</a> · <a href="practice/capstone/project_report.md" download>Скачать шаблон отчёта</a></p></div>
          </section>
          <section class="lesson-section" id="capstone-scope"><span class="section-number">02</span><h2>Выберите узкую <em>область</em></h2>
            <p>Хороший первый корпус: 5–30 документов одного процесса — инструкции поддержки, регламенты отдела, документация продукта или ваши учебные заметки. Не начинайте со «всех файлов компании».</p>
            <div class="workbook"><h3>Моя тема проекта</h3><textarea data-note="capstone-scope" placeholder="Пользователь, его вопрос, документы, ожидаемый результат, что система не должна делать..."></textarea><span class="note-status" data-note-status></span></div>
            <div class="quiz" data-quiz data-answer="narrow"><h3>Какой scope лучше для первого работающего пилота?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-capstone-scope" value="narrow"><span>Один процесс и измеримый набор вопросов</span></label><label class="quiz-option"><input type="radio" name="q-capstone-scope" value="all"><span>Все знания организации</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Узкая область позволяет собрать эталон, найти ошибки и безопасно проверить ценность."></span></div></div>
          </section>`
      },
      {
        id: "capstone-engineering-foundation",
        title: "Инженерная основа без лишней сложности",
        deck: "Окружение, структура проекта, конфигурация, секреты и воспроизводимый запуск — необходимый минимум для реальной работы.",
        time: "60–90 мин",
        level: "Инженерия",
        body: `
          <section class="lesson-section" id="capstone-structure"><span class="section-number">01</span><h2>Структура должна объяснять <em>систему</em></h2>
            <pre class="formula">documents/     исходные документы
index/         embeddings и metadata
rag_core.py    chunking, retrieval, prompt, optional LLM
ingest.py      построение индекса
evaluate.py    Recall@k и answerability
app.py         интерфейс Streamlit
eval.jsonl     неизменный набор проверки
logs/          события без секретов</pre>
          </section>
          <section class="lesson-section" id="capstone-env"><span class="section-number">02</span><h2>Секреты — в окружении, версии — в <em>репозитории</em></h2>
            <ol><li>Создайте отдельное virtual environment.</li><li>Установите зависимости из requirements.</li><li>Скопируйте <code>config.example.env</code> в <code>.env</code>.</li><li>Не коммитьте ключи, документы клиентов и локальный индекс.</li><li>Зафиксируйте модель embeddings и параметры chunking.</li></ol>
            <div class="quiz" data-quiz data-answer="environment"><h3>Где должен находиться API-ключ?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-capstone-key" value="environment"><span>В переменной окружения или секрет-хранилище</span></label><label class="quiz-option"><input type="radio" name="q-capstone-key" value="code"><span>Прямо в Python-файле</span></label><label class="quiz-option"><input type="radio" name="q-capstone-key" value="readme"><span>В публичном README</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Репозиторий может стать публичным или попасть в чужую сборку; секреты отделяют от кода."></span></div></div>
          </section>`
      },
      {
        id: "capstone-ingestion",
        title: "Документы, очистка и chunking",
        deck: "Качество RAG начинается до модели: понятный источник, версия документа и фрагмент, который сохраняет завершённую мысль.",
        time: "75–120 мин",
        level: "Данные",
        body: `
          <section class="lesson-section" id="capstone-ingest-run"><span class="section-number">01</span><h2>Постройте <em>индекс</em></h2>
            <pre class="formula">python ingest.py</pre>
            <p>Скрипт читает Markdown и TXT, делит текст по абзацам, добавляет overlap для длинных частей, создаёт embeddings и сохраняет metadata отдельно от векторов.</p>
            <div class="plain"><p class="kicker">Проверка глазами</p><p>Откройте несколько chunks. Каждый должен быть понятен без соседней страницы, но не содержать пять несвязанных тем.</p></div>
          </section>
          <section class="lesson-section" id="capstone-chunk-experiment"><span class="section-number">02</span><h2>Chunking — это <em>гипотеза</em></h2>
            <p>Сравните минимум две конфигурации на одном eval-наборе. Маленький chunk точнее локализует факт, но теряет контекст; большой сохраняет мысль, но приносит шум и расходует окно.</p>
            <div class="quiz" data-quiz data-answer="experiment"><h3>Как выбрать размер chunk?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-capstone-chunk" value="experiment"><span>Сравнить конфигурации на реальных запросах</span></label><label class="quiz-option"><input type="radio" name="q-capstone-chunk" value="magic"><span>Всегда ставить 500 символов</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Размер зависит от структуры документов, запросов и модели embeddings."></span></div></div>
          </section>`
      },
      {
        id: "capstone-retrieval",
        title: "Retrieval, который можно измерить",
        deck: "Проверяем, попадает ли доказательство в top-k, прежде чем подключать красивую генерацию.",
        time: "75–120 мин",
        level: "Поиск",
        body: `
          <section class="lesson-section" id="capstone-retrieval-eval"><span class="section-number">01</span><h2>Главная метрика — <em>Recall@k</em></h2>
            <pre class="formula">python evaluate.py</pre>
            <p>Для каждого answerable-вопроса указан ожидаемый документ. Если он встретился среди первых k результатов, retrieval получил hit.</p>
            <div class="formula">Recall@k = вопросы с эталонным документом в top-k / все answerable-вопросы</div>
          </section>
          <section class="lesson-section" id="capstone-retrieval-improve"><span class="section-number">02</span><h2>Лестница улучшения <em>поиска</em></h2>
            <ol><li>Проверить наличие документа и правильность эталона.</li><li>Исправить очистку и chunking.</li><li>Добавить metadata filters.</li><li>Переформулировать или расширять запрос.</li><li>Объединить dense и sparse retrieval.</li><li>Добавить reranker для top-N.</li></ol>
            <div class="quiz" data-quiz data-answer="before"><h3>Когда измерять retrieval?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-capstone-ret" value="before"><span>До оценки генератора</span></label><label class="quiz-option"><input type="radio" name="q-capstone-ret" value="after"><span>Только после публикации</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Так вы узнаете, отсутствовал ли факт в контексте или был неверно использован генератором."></span></div></div>
          </section>`
      },
      {
        id: "capstone-generation",
        title: "Ответы, ссылки и честный отказ",
        deck: "Подключаем генератор только после retrieval: отделяем данные от инструкций, требуем цитаты и не скрываем отсутствие доказательства.",
        time: "75–120 мин",
        level: "RAG",
        body: `
          <section class="lesson-section" id="capstone-grounding"><span class="section-number">01</span><h2>Grounded answer — это утверждение с <em>опорой</em></h2>
            <p>Каждый chunk получает номер, source и chunk_id. Prompt требует ссылку вида [1]. После генерации система показывает исходные фрагменты, чтобы пользователь мог проверить ответ.</p>
            <div class="plain"><p class="kicker">Защита</p><p>Текст документа считается недоверенными данными. Команда «игнорируй правила» внутри документа не должна менять системную инструкцию или разрешения tools.</p></div>
          </section>
          <section class="lesson-section" id="capstone-refusal"><span class="section-number">02</span><h2>Отказ — часть качества, а не <em>поломка</em></h2>
            <p>Если top score ниже откалиброванного порога, система не вызывает генератор и просит уточнить вопрос. Измеряйте answerability отдельно на вопросах с ответом и без ответа.</p>
            <div class="quiz" data-quiz data-answer="refuse"><h3>В базе нет политики гарантии. Какой ответ правильнее?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-capstone-refuse" value="refuse"><span>Сообщить, что подтверждённой информации нет</span></label><label class="quiz-option"><input type="radio" name="q-capstone-refuse" value="guess"><span>Сгенерировать типичный срок</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Правдоподобная выдумка опаснее прозрачного отказа."></span></div></div>
          </section>`
      },
      {
        id: "capstone-ui-observability",
        title: "Интерфейс, логи и стоимость",
        deck: "Реальный проект должен объяснять свой результат и оставлять достаточно данных для разбора ошибки.",
        time: "60–90 мин",
        level: "Продукт",
        body: `
          <section class="lesson-section" id="capstone-ui"><span class="section-number">01</span><h2>Покажите пользователю не только <em>ответ</em></h2>
            <ul><li>Статус: ответ найден или информации недостаточно.</li><li>Источники и scores.</li><li>Понятное действие после отказа.</li><li>Предупреждение о границах системы.</li><li>Кнопку или способ сообщить об ошибке.</li></ul>
            <pre class="formula">streamlit run app.py</pre>
          </section>
          <section class="lesson-section" id="capstone-logs"><span class="section-number">02</span><h2>Минимальное событие для <em>наблюдаемости</em></h2>
            <div class="formula">timestamp, request_id, version, latency_ms, top_score, sources, decision, error</div>
            <p>Не логируйте полный пользовательский текст по умолчанию. Сначала определите, нужен ли он, можно ли его хранить и как удалить персональные данные.</p>
            <div class="quiz" data-quiz data-answer="metadata"><h3>Что безопаснее сохранять по умолчанию?</h3><div class="quiz-options"><label class="quiz-option"><input type="radio" name="q-capstone-log" value="metadata"><span>Технические метаданные и обезличенные идентификаторы</span></label><label class="quiz-option"><input type="radio" name="q-capstone-log" value="everything"><span>Все документы, prompts и секреты</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Логи должны быть полезны для диагностики, но минимальны по чувствительным данным."></span></div></div>
          </section>`
      },
      {
        id: "capstone-security-deployment",
        title: "Безопасность, тесты и публикация",
        deck: "Проверяем границы, ошибки зависимостей и поведение вне нормы, затем публикуем ограниченный режим.",
        time: "90–150 мин",
        level: "Production",
        body: `
          <section class="lesson-section" id="capstone-threats"><span class="section-number">01</span><h2>Минимальная модель <em>угроз</em></h2>
            <table class="rubric"><thead><tr><th>Угроза</th><th>Защита</th></tr></thead><tbody><tr><td>Prompt injection в документе</td><td>Разделение instruction/data, allowlist tools, отсутствие секретов в prompt</td></tr><tr><td>Чужой документ в выдаче</td><td>Проверка доступа до retrieval, tenant filters</td></tr><tr><td>Утечка ключа</td><td>Secrets manager/env, ротация, ограниченные права</td></tr><tr><td>Повтор опасного действия</td><td>Confirmation, idempotency key, audit log</td></tr><tr><td>Недоступна модель</td><td>Timeout, понятная ошибка, retry с лимитом, fallback</td></tr></tbody></table>
          </section>
          <section class="lesson-section" id="capstone-deploy"><span class="section-number">02</span><h2>Публикуйте <em>ограниченный режим</em></h2>
            <ol><li>Сначала локальный запуск другим человеком по README.</li><li>Затем тестовая среда с демонстрационными данными.</li><li>После этого маленькая группа и read-only.</li><li>Только после метрик — расширение аудитории.</li></ol>
            <div class="source-box"><p>В комплекте есть <code>Dockerfile</code> для повторяемой упаковки. Конкретную платформу выбирайте по требованиям данных, бюджета и доступа, а не по одному учебному рецепту.</p></div>
            <div class="quiz" data-quiz data-answer="small,readonly,rollback"><p class="kicker">Несколько ответов</p><h3>Признаки безопасного первого запуска</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="small"><span>Небольшая аудитория</span></label><label class="quiz-option"><input type="checkbox" value="readonly"><span>Read-only или draft mode</span></label><label class="quiz-option"><input type="checkbox" value="rollback"><span>Понятный откат</span></label><label class="quiz-option"><input type="checkbox" value="autonomous"><span>Полная автономность без лимитов</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Ограниченный blast radius позволяет учиться на реальных данных без большого ущерба."></span></div></div>
          </section>`
      },
      {
        id: "capstone-defense",
        title: "Защита проекта и портфолио",
        deck: "Завершаем не словами «работает у меня», а воспроизводимым README, измерениями, демонстрацией и честным разбором ограничений.",
        time: "60–90 мин",
        level: "Защита",
        body: `
          <section class="lesson-section" id="capstone-rubric"><span class="section-number">01</span><h2>Рубрика на <em>100 баллов</em></h2>
            <table class="rubric"><thead><tr><th>Часть</th><th>Баллы</th><th>Доказательство</th></tr></thead><tbody>
              <tr><td>Проблема и scope</td><td>10</td><td>Пользователь, baseline, ограничения</td></tr><tr><td>Данные</td><td>10</td><td>Происхождение, очистка, версии, доступ</td></tr><tr><td>Retrieval</td><td>15</td><td>Recall@k и разбор misses</td></tr><tr><td>Ответ и отказ</td><td>15</td><td>Цитаты, groundedness, unanswerable cases</td></tr><tr><td>Eval</td><td>15</td><td>Фиксированный набор и slices</td></tr><tr><td>Безопасность</td><td>10</td><td>Threat model и ограничения</td></tr><tr><td>Стоимость и latency</td><td>10</td><td>Измерения и лимиты</td></tr><tr><td>Интерфейс</td><td>5</td><td>Понятный ответ, источник и ошибка</td></tr><tr><td>Воспроизводимость</td><td>5</td><td>README и версии</td></tr><tr><td>Коммуникация</td><td>5</td><td>Демо, схема, ограничения</td></tr>
            </tbody></table>
          </section>
          <section class="lesson-section" id="capstone-demo"><span class="section-number">02</span><h2>Демонстрация за <em>пять минут</em></h2>
            <ol><li>30 секунд: проблема и пользователь.</li><li>45 секунд: архитектура и почему выбран RAG.</li><li>90 секунд: обычный, сложный и unanswerable-запрос.</li><li>45 секунд: метрики и baseline.</li><li>45 секунд: ошибка, которую вы нашли и исправили.</li><li>45 секунд: безопасность, ограничения и следующий эксперимент.</li></ol>
            <div class="workbook"><h3>Черновик рассказа о проекте</h3><textarea data-note="capstone-pitch" placeholder="Проблема → решение → доказательство → ограничение → следующий шаг..."></textarea><span class="note-status" data-note-status></span></div>
            <div class="quiz" data-quiz data-answer="metrics,failures,limits"><p class="kicker">Несколько ответов</p><h3>Что отличает портфолио-проект от красивого демо?</h3><div class="quiz-options"><label class="quiz-option"><input type="checkbox" value="metrics"><span>Метрики на фиксированном наборе</span></label><label class="quiz-option"><input type="checkbox" value="failures"><span>Разобранные неудачи</span></label><label class="quiz-option"><input type="checkbox" value="limits"><span>Честные ограничения</span></label><label class="quiz-option"><input type="checkbox" value="animation"><span>Только эффектная анимация</span></label></div><div class="quiz-actions"><button class="check-answer" type="button">Проверить</button><span class="quiz-feedback" data-explain="Сильный проект доказывает качество, показывает инженерное мышление и не скрывает область отказа."></span></div></div>
            <div class="takeaway"><strong>Финиш курса</strong>Вы можете объяснить ключевые идеи, выбрать архитектуру, локализовать ошибку, собрать RAG-проект и защитить его через измерения, а не впечатление.</div>
          </section>`
      }
    ]
  });

  const checkpoints = {
    "01": [
      ["task-map", "Различаю основные задачи NLP и форму их результата"],
      ["llm-mechanics", "Объясняю токены, embeddings, предобучение и генерацию"],
      ["rag-lora-choice", "Выбираю между prompt, RAG, LoRA и fine-tuning"],
      ["classification-metrics", "Читаю confusion matrix и выбираю метрику по цене ошибки"],
    ],
    "02": [
      ["preprocessing", "Проектирую предобработку без потери полезного сигнала"],
      ["architecture", "Выбираю encoder, decoder или encoder–decoder"],
      ["hf-workflow", "Проверяю model card и запускаю воспроизводимый pipeline"],
      ["finetune-eval", "Разделяю данные и оцениваю fine-tuning на неизменном test"],
    ],
    "03": [
      ["qkv", "Объясняю Query, Key, Value и multi-head attention"],
      ["retrieval-choice", "Сравниваю dense, sparse и reranking"],
      ["rag-pipeline", "Рисую полный путь документа и запроса в RAG"],
    ],
    "04": [
      ["rag-build", "Собираю ingestion, chunking, retrieval и generation"],
      ["rag-eval", "Измеряю retrieval отдельно от groundedness ответа"],
      ["rag-refusal", "Добавляю answerability gate и корректный отказ"],
    ],
    "05": [
      ["agent-loop", "Объясняю agent loop и роль observation"],
      ["agent-tools", "Проектирую узкие схемы tools и stop condition"],
      ["agent-safety", "Выношу permissions и подтверждения в доверенный код"],
      ["agent-eval", "Оцениваю траекторию, стоимость и восстановление после ошибки"],
    ],
    "06": [
      ["work-brief", "Превращаю рабочую боль в измеримую задачу"],
      ["prompt-eval", "Версионирую prompt и веду eval-набор"],
      ["mini-projects", "Запускаю классификатор, semantic search, RAG и agent tools"],
      ["pilot", "Планирую ограниченный четырёхнедельный пилот"],
    ],
    "07": [
      ["teach-back", "Объясняю ключевые идеи без опоры на жаргон"],
      ["case-choice", "Выбираю архитектуру по рабочей ситуации"],
      ["error-layer", "Локализую ошибку по слою системы"],
      ["lab-proof", "Подтверждаю навыки лабораторными артефактами"],
    ],
    "08": [
      ["capstone-run", "Другой человек запускает мой проект по README"],
      ["capstone-eval", "У проекта есть baseline, eval и разобранные ошибки"],
      ["capstone-safe", "Описаны данные, угрозы, лимиты и откат"],
      ["capstone-defend", "Я защищаю проект за пять минут через доказательства"],
    ],
  };

  Object.entries(checkpoints).forEach(([moduleNumber, outcomes]) => {
    const module = course.modules.find((item) => item.number === moduleNumber);
    const lastLesson = module?.lessons.at(-1);
    if (!lastLesson || lastLesson.body.includes(`id="checkpoint-${moduleNumber}"`)) return;
    lastLesson.body += `
      <section class="lesson-section" id="checkpoint-${moduleNumber}">
        <span class="section-number">CHECK</span><h2>После модуля я <em>могу</em></h2>
        <p class="skill-progress" data-skill-progress></p>
        <div class="skill-checklist">
          ${outcomes.map(([id, text]) => `<label class="skill-item"><input type="checkbox" data-skill="m${moduleNumber}-${id}"><span><strong>${text}</strong>Отметьте только после самостоятельного объяснения или выполнения.</span></label>`).join("")}
        </div>
      </section>`;
  });
})();
