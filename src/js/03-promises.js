function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', event => {
  event.preventDefault();
  submitButton.disabled = true;

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  const promises = [];

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const currentDelay = delay + (i - 1) * step;

    const promise = createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    promises.push(promise);
  }

  Promise.all(promises)
    .then(() => {
      console.log('All promises resolved');
    })
    .catch(() => {
      console.log('At least one promise rejected');
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});
