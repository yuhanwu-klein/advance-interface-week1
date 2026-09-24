const COLS = 8;
const ROWS = 8;
const CYCLE_MS = 4000;
const SIGMA = 0.85; // controls how many cells the blob covers

const gridEl = document.getElementById('grid');
const cells = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const el = document.createElement('div');
    el.className = 'cell';
    gridEl.appendChild(el);
    cells.push({ el, c, r });
  }
}

function render(t) {
  const progress = (t % CYCLE_MS) / CYCLE_MS;
  const px = -2 + progress * (COLS + 4);
  const py = -2 + progress * (ROWS + 4);
  for (const cell of cells) {
    const dx = cell.c - px;
    const dy = cell.r - py;
    const intensity = Math.exp(-(dx * dx + dy * dy) / (2 * SIGMA * SIGMA));
    const v = Math.round(255 - intensity * 150);
    cell.el.style.backgroundColor = `rgb(${v},${v},${v})`;
  }
}

let start = null;
function loop(ts) {
  if (start === null) start = ts;
  render(ts - start);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

window.__render = render;
