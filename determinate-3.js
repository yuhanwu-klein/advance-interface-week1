const COLS = 8;
const ROWS = 8;
const MAX_D = (COLS - 1) + (ROWS - 1); // 14, highest diagonal index in the grid
const EDGE = 1.5; // how many diagonal steps the soft leading edge fades over
const RAMP_MS = 3000;
const HOLD_MS = 700;
const PAUSE_MS = 500;

const gridEl = document.getElementById('grid');
const labelEl = document.getElementById('label');
const cells = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const el = document.createElement('div');
    el.className = 'cell';
    gridEl.appendChild(el);
    cells.push({ el, d: c + r });
  }
}

function setProgress(percent) {
  const front = (percent / 100) * MAX_D;
  for (const cell of cells) {
    const intensity = cell.d <= front
      ? 1
      : Math.max(0, 1 - (cell.d - front) / EDGE);
    const v = Math.round(255 - intensity * 150);
    cell.el.style.backgroundColor = `rgb(${v},${v},${v})`;
  }
  labelEl.textContent = `${Math.round(percent)}%`;
}

setProgress(0);

function runCycle() {
  const start = performance.now();
  function step(now) {
    const percent = Math.min(100, ((now - start) / RAMP_MS) * 100);
    setProgress(percent);
    if (percent < 100) {
      requestAnimationFrame(step);
    } else {
      setTimeout(() => {
        setProgress(0);
        setTimeout(runCycle, PAUSE_MS);
      }, HOLD_MS);
    }
  }
  requestAnimationFrame(step);
}

setTimeout(runCycle, 500);
