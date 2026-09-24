const FILL_MIN = 21;  // px, fill width at 0% (just the bare knob circle)
const FILL_MAX = 280; // px, fill width at 100% (298 - 9 left pad - 9 right pad)
const DASH_W = 12;
const DASH_GAP = 3;
const DASH_PAD = 3;
const CYCLE_MS = 3500;
const HOLD_MS = 900; // pause at 100% before resetting

const fillEl = document.getElementById('fill');
const dashesEl = document.getElementById('dashes');
const markerEl = document.getElementById('marker');
const labelEl = document.getElementById('label');

const DASH_SVG = '<svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<circle cx="1" cy="1" r="1" fill="#FF874F"/>' +
  '<circle cx="6" cy="1" r="1" fill="#FF874F"/>' +
  '<circle cx="11" cy="1" r="1" fill="#FF874F"/>' +
  '</svg>';

function setProgress(percent) {
  const fillWidth = FILL_MIN + (FILL_MAX - FILL_MIN) * (percent / 100);
  fillEl.style.width = `${fillWidth}px`;

  const innerWidth = fillWidth - DASH_PAD * 2;
  const dashCount = Math.max(0, Math.floor((innerWidth + DASH_GAP) / (DASH_W + DASH_GAP)));
  dashesEl.innerHTML = DASH_SVG.repeat(dashCount);

  markerEl.style.left = `${fillWidth - 1.5}px`;
  labelEl.textContent = `${Math.round(percent)}%`;
}

setProgress(0);

function runCycle() {
  const start = performance.now();
  function step(now) {
    const percent = Math.min(100, ((now - start) / CYCLE_MS) * 100);
    setProgress(percent);
    if (percent < 100) {
      requestAnimationFrame(step);
    } else {
      setTimeout(() => {
        setProgress(0);
        setTimeout(runCycle, 500);
      }, HOLD_MS);
    }
  }
  requestAnimationFrame(step);
}

setTimeout(runCycle, 500);
