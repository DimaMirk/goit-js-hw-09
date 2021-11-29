const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.btnStart.addEventListener('click', startColorChange);
refs.btnStop.addEventListener('click', stopColorChange);

let timerId = null;

function startColorChange() {
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.body.style.backgroundColor = `${randomColor}`;
  }, 1000);

  refs.btnStart.setAttribute('disabled', 'disabled');
  refs.btnStop.removeAttribute('disabled', 'disabled');
}

function stopColorChange() {
  clearInterval(timerId);

  refs.btnStart.removeAttribute('disabled', 'disabled');
  refs.btnStop.setAttribute('disabled', 'disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
