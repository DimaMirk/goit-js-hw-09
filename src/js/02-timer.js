import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  spansValueEl: document.querySelectorAll('.value'),
};

refs.btnStart.setAttribute('disabled', 'disabled');
refs.btnStart.addEventListener('click', startTimer);

let choosedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkTime(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function checkTime(time) {
  const currentTime = Date.now();
  const checkTimeResult = time - currentTime;
  if (checkTimeResult < 0) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  choosedTime = checkTimeResult;
  refs.btnStart.removeAttribute('disabled', 'disabled');
}

const timer = {
  timerIsOn: false,

  start(choosedTime) {
    if (this.timerIsOn === true) {
      return;
    } else {
      this.timerIsOn = true;
      const startTime = Date.now();
      const timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = currentTime - startTime;
        const result = choosedTime - deltaTime;

        if (result < 0) {
          clearInterval(timerId);
        } else {
          let resultReverseTime = this.convertMs(result);
          this.addTimerToWindow(resultReverseTime);
        }
      }, 1000);
    }
  },

  addTimerToWindow(obj) {
    refs.spansValueEl[0].textContent = obj.days;
    refs.spansValueEl[1].textContent = obj.hours;
    refs.spansValueEl[2].textContent = obj.minutes;
    refs.spansValueEl[3].textContent = obj.seconds;
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

function startTimer() {
  timer.start(choosedTime);
}
