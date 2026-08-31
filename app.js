(() => {
  const course = window.COURSE;
  const lessons = course.modules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, module })));
  const lessonEl = document.querySelector("#lesson");
  const navEl = document.querySelector("#courseNav");
  const drawer = document.querySelector("#drawer");
  const scrim = document.querySelector("#drawerScrim");
  const menuButton = document.querySelector("#menuButton");
  const searchInput = document.querySelector("#courseSearch");
  const completeButton = document.querySelector("#completeLesson");
  const progressText = document.querySelector("#progressText");
  const remainingText = document.querySelector("#remainingText");
  const progressBar = document.querySelector("#progressBar");
  const toast = document.querySelector("#toast");
  const storeKey = "inside-llm-course-v1";
  let state = readState();
  let current = lessons[0];

  function readState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storeKey) || "{}");
      return { completed: Array.isArray(saved.completed) ? saved.completed : [], theme: saved.theme || null };
    } catch {
      return { completed: [], theme: null };
    }
  }

  function saveState() {
    localStorage.setItem(storeKey, JSON.stringify(state));
  }

  function labelNumber(index) {
    return String(index + 1).padStart(2, "0");
  }

  function renderNav(filter = "") {
    const query = filter.trim().toLocaleLowerCase("ru");
    navEl.innerHTML = course.modules.map((module) => {
      const moduleLessons = module.lessons.filter((lesson) => `${lesson.title} ${lesson.deck}`.toLocaleLowerCase("ru").includes(query));
      if (!moduleLessons.length) return "";
      return `<section class="nav-module">
        <p class="nav-module-title"><span>${module.number}</span>${module.title}</p>
        ${moduleLessons.map((lesson) => {
          const index = lessons.findIndex((item) => item.id === lesson.id);
          const done = state.completed.includes(lesson.id);
          return `<button class="nav-link ${lesson.id === current.id ? "active" : ""} ${done ? "done" : ""}" type="button" data-lesson="${lesson.id}" ${lesson.id === current.id ? 'aria-current="page"' : ""}>
            <small>${labelNumber(index)}</small><strong>${lesson.title}</strong><span class="nav-check" aria-hidden="true">✓</span>
          </button>`;
        }).join("")}
      </section>`;
    }).join("") || `<p class="nav-empty">Ничего не найдено. Попробуйте более короткий запрос.</p>`;
  }

  function headerFor(lesson) {
    const lessonIndex = lessons.findIndex((item) => item.id === lesson.id);
    return `<header class="lesson-header">
      <div class="lesson-path"><span>Модуль ${lesson.module.number}</span><span>${lesson.module.title}</span><span>Урок ${labelNumber(lessonIndex)}</span></div>
      <h1>${lesson.title.replace(/(LLM|RAG|Attention|Hugging Face|Fine-tuning|ИИ-агента)/i, "<em>$1</em>")}</h1>
      <p class="lesson-deck">${lesson.deck}</p>
      <div class="lesson-meta"><span class="meta-chip">${lesson.time}</span><span class="meta-chip">${lesson.level}</span><span class="meta-chip">${lessonIndex + 1} / ${lessons.length}</span></div>
    </header>`;
  }

  function renderLesson(id, pushHash = true) {
    const found = lessons.find((lesson) => lesson.id === id) || lessons[0];
    current = found;
    lessonEl.innerHTML = headerFor(found) + found.body;
    lessonEl.style.animation = "none";
    requestAnimationFrame(() => { lessonEl.style.animation = ""; });
    if (pushHash && location.hash.slice(1) !== found.id) history.pushState(null, "", `#${found.id}`);
    document.title = `${found.title} — Внутри LLM`;
    bindQuizzes();
    updateControls();
    renderNav(searchInput.value);
    closeDrawer();
    // A lesson switch is a navigation event: jumping to the new heading is less
    // disorienting than animating through the previous lesson's content.
    window.scrollTo({ top: 0, behavior: "auto" });
    setTimeout(() => lessonEl.focus({ preventScroll: true }), 80);
  }

  function updateControls() {
    const index = lessons.findIndex((lesson) => lesson.id === current.id);
    const prev = lessons[index - 1];
    const next = lessons[index + 1];
    const prevButton = document.querySelector("#prevLesson");
    const nextButton = document.querySelector("#nextLesson");
    prevButton.disabled = !prev;
    nextButton.disabled = !next;
    document.querySelector("#prevLabel").textContent = prev?.title || "Начало";
    document.querySelector("#nextLabel").textContent = next?.title || "Финиш";
    prevButton.dataset.target = prev?.id || "";
    nextButton.dataset.target = next?.id || "";
    const done = state.completed.includes(current.id);
    completeButton.classList.toggle("done", done);
    completeButton.querySelector("strong").textContent = done ? "Урок пройден" : "Отметить урок пройденным";
    updateProgress();
  }

  function updateProgress() {
    const count = state.completed.length;
    const percent = Math.round((count / lessons.length) * 100);
    progressText.textContent = `${percent}% пройдено`;
    remainingText.textContent = count === lessons.length ? "Маршрут завершён" : `Осталось ${lessons.length - count} уроков`;
    progressBar.style.width = `${percent}%`;
  }

  function normalize(value) {
    return value.toLocaleLowerCase("ru").trim().replace(/ё/g, "е").replace(/[^a-zа-я0-9]+/g, "");
  }

  function answersFor(quiz) {
    const checked = [...quiz.querySelectorAll("input:checked")].map((input) => input.value);
    const text = quiz.querySelector('input[type="text"]');
    return text ? [normalize(text.value)] : checked.sort();
  }

  function isCorrectQuiz(quiz) {
    const expected = quiz.dataset.answer.split(",").map(normalize).sort();
    const actual = answersFor(quiz).map(normalize).sort();
    if (expected[0] === "embedding" && ["эмбеддинг", "эмбединг", "embedding"].map(normalize).includes(actual[0])) return true;
    return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
  }

  function bindQuizzes() {
    lessonEl.querySelectorAll("[data-quiz]").forEach((quiz) => {
      const button = quiz.querySelector(".check-answer");
      const feedback = quiz.querySelector(".quiz-feedback");
      button?.addEventListener("click", () => {
        const actual = answersFor(quiz);
        if (!actual.length || actual.every((answer) => !answer)) {
          feedback.textContent = "Сначала выберите или введите ответ.";
          feedback.className = "quiz-feedback wrong";
          return;
        }
        const correct = isCorrectQuiz(quiz);
        feedback.textContent = `${correct ? "Верно. " : "Пока нет. "}${feedback.dataset.explain || ""}`;
        feedback.className = `quiz-feedback ${correct ? "correct" : "wrong"}`;
      });
    });
  }

  function openDrawer() {
    scrim.hidden = false;
    requestAnimationFrame(() => scrim.classList.add("visible"));
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    menuButton.setAttribute("aria-expanded", "true");
    setTimeout(() => searchInput.focus(), 180);
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    scrim.classList.remove("visible");
    drawer.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
    setTimeout(() => { if (!drawer.classList.contains("open")) scrim.hidden = true; }, 260);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 1700);
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#15120f" : "#f6f3ed";
  }

  menuButton.addEventListener("click", openDrawer);
  document.querySelector("#closeDrawer").addEventListener("click", closeDrawer);
  scrim.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeDrawer(); });
  searchInput.addEventListener("input", () => renderNav(searchInput.value));
  navEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-lesson]");
    if (button) renderLesson(button.dataset.lesson);
  });
  document.querySelector("#prevLesson").addEventListener("click", (event) => event.currentTarget.dataset.target && renderLesson(event.currentTarget.dataset.target));
  document.querySelector("#nextLesson").addEventListener("click", (event) => event.currentTarget.dataset.target && renderLesson(event.currentTarget.dataset.target));
  completeButton.addEventListener("click", () => {
    const isDone = state.completed.includes(current.id);
    state.completed = isDone ? state.completed.filter((id) => id !== current.id) : [...state.completed, current.id];
    saveState();
    updateControls();
    renderNav(searchInput.value);
    showToast(isDone ? "Отметка снята" : "Урок отмечен как пройденный");
  });
  document.querySelector("#themeButton").addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    state.theme = theme;
    applyTheme(theme);
    saveState();
  });
  window.addEventListener("popstate", () => renderLesson(location.hash.slice(1) || "welcome", false));

  const initialTheme = state.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(initialTheme);
  renderLesson(location.hash.slice(1) || "welcome", false);
})();
