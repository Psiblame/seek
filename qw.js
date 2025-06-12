let gptAnswer = "?";
let gptBox = null;
let lastMouse = { x: 100, y: 100 };

// Следим за движением мыши
document.addEventListener('mousemove', (e) => {
  lastMouse = { x: e.clientX, y: e.clientY };
});

// Получаем ответ от GPT
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
  showBox(); // показать окно сразу
})();

// Функция для показа окна
function showBox() {
  if (gptBox) return;
  gptBox = document.createElement('div');
  gptBox.textContent = `Ответ: ${gptAnswer}`;
  Object.assign(gptBox.style, {
    position: 'fixed',
    left: `${lastMouse.x + 20}px`,
    top: `${lastMouse.y + 20}px`,
    background: 'rgba(0, 0, 0, 0.75)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '18px',
    zIndex: 9999,
    fontFamily: 'monospace',
    pointerEvents: 'none'
  });
  document.body.appendChild(gptBox);
}

// Ctrl+Z — скрыть / показать окно
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'z') {
    if (gptBox) {
      gptBox.remove();
      gptBox = null;
    } else {
      showBox();
    }
  }
});
