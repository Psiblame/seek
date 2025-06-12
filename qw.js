<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Minimal LMS Resolver</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: sans-serif;
    }
  </style>
</head>
<body>
  <h1>Нажми Ctrl + Shift + A для активации</h1>
  <script type="module">
    const html2canvas = (await import('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')).default || window.html2canvas;

    const Z = 2147483647;
    let frame = null;
    let start = null;

    const createFrame = () => {
      frame = document.createElement('div');
      frame.style = `
        position:fixed; z-index:${Z}; pointer-events:none;
        border: 2px dashed rgba(0,0,0,0.4);
        background: rgba(0, 0, 0, 0.05);
      `;
      document.body.append(frame);
    };

    const removeFrame = () => {
      frame?.remove();
      frame = null;
    };

    const showAnswer = (text, x, y) => {
      const span = document.createElement('span');
      span.textContent = text;
      span.style = `
        position:fixed;
        left:${x + 8}px; top:${y + 8}px;
        z-index:${Z};
        font:12px monospace;
        color:#000;
        background:rgba(255,255,255,0.7);
        padding:4px 6px;
        border-radius:4px;
        pointer-events:none;
      `;
      document.body.append(span);
      setTimeout(() => span.remove(), 2500);
    };

    let captureMode = false;
    
    window.addEventListener('keydown', async (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        captureMode = true;
        alert('Выдели область мышкой для скриншота');
      }
    });

    window.addEventListener('mousedown', (e) => {
      if (!captureMode) return;
      removeFrame();
      start = [e.clientX, e.clientY];
      createFrame();
      Object.assign(frame.style, {
        left: `${start[0]}px`,
        top: `${start[1]}px`,
        width: `0px`,
        height: `0px`
      });
    });

    window.addEventListener('mousemove', (e) => {
      if (!captureMode || !frame || !start) return;
      const x = Math.min(e.clientX, start[0]);
      const y = Math.min(e.clientY, start[1]);
      const w = Math.abs(e.clientX - start[0]);
      const h = Math.abs(e.clientY - start[1]);
      Object.assign(frame.style, {
        left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px`
      });
    });

    window.addEventListener('mouseup', async (e) => {
      if (!captureMode || !frame || !start) return;
      captureMode = false;
      const [x1, y1] = start;
      const x2 = e.clientX;
      const y2 = e.clientY;
      removeFrame();
      const canvas = await html2canvas(document.body, {
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
        backgroundColor: '#fff',
        useCORS: true
      });
      showAnswer('✓ сохранено', x2, y2);
      // canvas.toBlob(...) можно отправить blob на сервер, если нужно
    });
  </script>
</body>
</html>
