function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let intervalId = null;

function changeBackgroundColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}

function handleStartClick() {
  startButton.disabled = true;
  intervalId = setInterval(changeBackgroundColor, 666);
}

function handleStopClick() {
  startButton.disabled = false;
  clearInterval(intervalId);
  document.body.style.backgroundColor = '';
}

startButton.addEventListener('click', handleStartClick);
stopButton.addEventListener('click', handleStopClick);
