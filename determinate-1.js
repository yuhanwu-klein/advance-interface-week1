const track = document.getElementById('reelTrack');

const ITEM_HEIGHT = 16.8; // px, must match .reel-item height (1.05rem)
const CENTER_PAD = 2;     // blank rows before 0% and after "Finished"

function makeItem(text, className) {
  const div = document.createElement('div');
  div.className = 'reel-item' + (className ? ' ' + className : '');
  div.textContent = text;
  return div;
}

function buildReel() {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < CENTER_PAD; i++) frag.appendChild(makeItem(''));
  for (let p = 0; p <= 100; p++) frag.appendChild(makeItem(p + '%'));
  frag.appendChild(makeItem('Finished', 'reel-item--finished'));
  for (let i = 0; i < CENTER_PAD; i++) frag.appendChild(makeItem(''));
  track.appendChild(frag);
}

function setStep(step) {
  track.style.transform = `translateY(-${step * ITEM_HEIGHT}px)`;
}

buildReel();
setStep(0);

function runCycle() {
  let percent = 0;
  const spin = setInterval(() => {
    percent++;
    setStep(percent);
    if (percent >= 100) {
      clearInterval(spin);
      setTimeout(() => {
        setStep(101); // reveal "Finished"
        setTimeout(() => {
          setStep(0);
          setTimeout(runCycle, 800);
        }, 1400);
      }, 200);
    }
  }, 45);
}

setTimeout(runCycle, 600);
