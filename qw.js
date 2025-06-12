let gptAnswer = "?";
let gptBox = null;

// Загружаем ответ от DeepSeek API
(async () => {
  const question = document.querySelector('.question')?.innerText;
  if (!question) return alert("❌ Вопрос не найден (.question)");

  const res = await fetch("https://deepseek-server.psiblame.repl.co/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const data = await res.json();
  gptAnswer = data.answer || "?";
})();

// Слушаем Ctrl+Z — показываем/убираем окно
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'z') {
    if (gptBox) {
      gptBox.remove();
      gptBox = null;
    } else {
      gptBox = document.createElement('div');
      gptBox.textContent = `Ответ: ${gptAnswer}`;
      Object.assign(gptBox.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '8px',
        fontSize: '20px',
        zIndex: 9999,
        fontFamily: 'monospace'
      });
      document.body.appendChild(gptBox);
    }
  }
});
