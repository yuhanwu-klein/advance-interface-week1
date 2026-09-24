const track = document.getElementById('reelTrack');

const ITEM_HEIGHT = 8.8; // px, must match .reel-item height (0.55rem)
const CENTER_PAD = 2;    // blank rows before 0% and after 100%

function makeItem(text) {
  const div = document.createElement('div');
  div.className = 'reel-item';
  div.textContent = text;
  return div;
}

function buildReel() {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < CENTER_PAD; i++) frag.appendChild(makeItem(''));
  for (let p = 0; p <= 100; p++) frag.appendChild(makeItem(p + '%'));
  for (let i = 0; i < CENTER_PAD; i++) frag.appendChild(makeItem(''));
  track.appendChild(frag);
}

function setStep(step) {
  track.style.transform = `translateY(-${step * ITEM_HEIGHT}px)`;
}

buildReel();
setStep(0);

// Real progress bars rarely move at a constant rate — they start brisk
// and slow down as they approach completion, so the delay between
// steps grows with the percentage instead of staying fixed.
function delayForPercent(percent) {
  return 90 + percent * 3.2;
}

function runCycle() {
  let percent = 0;
  function step() {
    percent++;
    setStep(percent);
    if (percent < 100) {
      setTimeout(step, delayForPercent(percent));
    } else {
      setTimeout(() => {
        setStep(0);
        setTimeout(runCycle, 900);
      }, 700);
    }
  }
  setTimeout(step, delayForPercent(0));
}

setTimeout(runCycle, 600);
