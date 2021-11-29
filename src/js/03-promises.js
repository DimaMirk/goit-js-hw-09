import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  submitBtn: document.querySelector('button'),
};

refs.form.addEventListener('input', onFormSubmit);
refs.form.addEventListener('submit', addFirtTimeout);

const formData = {};

function onFormSubmit(evt) {
  formData[evt.target.name] = evt.target.value;
}

function addFirtTimeout(evt) {
  const delayForTimeout = Number(formData.delay);
  evt.preventDefault();
  setTimeout(() => {
    callCreatePromise();
  }, delayForTimeout);
}

function callCreatePromise() {
  const amount = formData.amount;
  let position = 0;
  const step = Number(formData.step);
  let delay = Number(formData.delay);

  const intervalIdOne = setInterval(() => {
    delay += step;
    position += 1;
    createPromise(position, delay)
      .then(result => {
        Notify.success(result, {
          timeout: 6000,
        });
      })
      .catch(result => {
        Notify.failure(result, {
          timeout: 6000,
        });
      });
    if (amount == position) {
      clearInterval(intervalIdOne);
    }
  }, step);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay} ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay} ms`);
    }
  });
}
