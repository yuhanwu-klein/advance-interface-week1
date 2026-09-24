const box = document.getElementById('box');
const trigger = document.getElementById('trigger');

trigger.addEventListener('click', () => {
  box.classList.toggle('spin');
});
