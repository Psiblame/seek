(async () => {
  // 🔹 Считываем текст вопроса с сайта
  const question = document.querySelector('.question')?.innerText;
  if (!question) return alert("❌ Вопрос не найден на странице");

  // 🔹 Отправляем на свой сервер
  const res = await fetch("https://ТВОЙ-СЕРВЕР.repl.co/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const data = await res.json();
  const answer = data.answer;

  // 🔹 Ищем варианты A/B/C/D и подсвечиваем правильный
  const answerOptions = document.querySelectorAll('.answer, .option, label');
  let found = false;

  answerOptions.forEach(option => {
    if (option.innerText.trim().startsWith(answer)) {
      option.style.background = "#4caf50";
      option.style.color = "white";
      option.style.borderRadius = "8px";
      option.style.padding = "4px";
      found = true;
    }
  });

  if (!found) {
    alert("✅ Ответ: " + answer);
  }
})();
