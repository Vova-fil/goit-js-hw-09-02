const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[ data-stop]'),
  body: document.querySelector('body'),
};

let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
  refs.startBtn.disabled = 'disabled';
  refs.stopBtn.disabled = '';
  intervalId = setInterval(() => {
    let colorBg = getRandomHexColor();
    refs.body.style.backgroundColor = colorBg;
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(intervalId);
  refs.startBtn.disabled = '';
  refs.stopBtn.disabled = 'disabled';
}
