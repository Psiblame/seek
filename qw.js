let gptBox = null;
let visible = false;

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'z') {
    if (visible && gptBox) {
      gptBox.remove();
      gptBox = null;
      visible = false;
    } else {
      gptBox = document.createElement('div');
      gptBox.textContent = `Ответ: ?`;
      Object.assign(gptBox.style, {
        position: 'fixed',
        top: `${window.innerHeight / 2}px`,
        left: `${window.innerWidth / 2}px`,
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 0, 0, 0.75)',
        color: '#fff',
        padding: '12px 18px',
        fontSize: '22px',
        borderRadius: '10px',
        fontFamily: 'monospace',
        zIndex: 9999,
        pointerEvents: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
      });
      document.body.appendChild(gptBox);
      visible = true;
    }
  }
});
