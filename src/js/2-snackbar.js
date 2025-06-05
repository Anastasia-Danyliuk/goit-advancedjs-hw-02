import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(result => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight',
        icon: null,
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
        icon: null,
      });
    });
});
