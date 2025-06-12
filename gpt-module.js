(async () => {
  const question = document.querySelector('.question')?.innerText || prompt("Вопрос:");

  if (!question) return alert("Вопрос не найден");

  const res = await fetch("https://<твоё-имя>.repl.co/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const data = await res.json();

  const bubble = document.createElement("div");
  bubble.textContent = "Ответ: " + data.answer;
  Object.assign(bubble.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#222",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "10px",
    fontSize: "20px",
    fontFamily: "monospace",
    zIndex: 9999
  });
  document.body.appendChild(bubble);
})();