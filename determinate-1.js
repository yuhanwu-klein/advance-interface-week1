const track = document.getElementById('reelTrack');
const letterO = document.getElementById('letterO');

const ITEM_HEIGHT_EM = 1.71875; // must match .reel-item height in determinate-1.css
const CENTER_PAD = 2;          // blank rows before 0% and after 100%
const GROW_MS = 450;           // must match .letter-o transition duration

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

function setStep(step, animate) {
  track.style.transition = animate ? 'transform 0.08s linear' : 'none';
  track.style.transform = `translateY(-${step * ITEM_HEIGHT_EM}em)`;
}

buildReel();
setStep(0, false);

// Real progress bars rarely move at a constant rate — they start brisk
// and slow down as they approach completion, so the delay between
// steps grows with the percentage instead of staying fixed.
function delayForPercent(percent) {
  return 90 + percent * 3.2;
}

function runCycle() {
  letterO.classList.add('grown');

  setTimeout(() => {
    let percent = 0;
    function step() {
      percent++;
      setStep(percent, true);
      if (percent < 100) {
        setTimeout(step, delayForPercent(percent));
      } else {
        setTimeout(() => {
          letterO.classList.remove('grown');
          setTimeout(() => {
            setStep(0, false);
            setTimeout(runCycle, 700);
          }, GROW_MS + 300);
        }, 700);
      }
    }
    setTimeout(step, delayForPercent(0));
  }, GROW_MS + 150);
}

setTimeout(runCycle, 600);
