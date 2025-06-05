import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { Faroese } from 'flatpickr/dist/l10n/fo.js';

let deadline = new Date('2025-06-06T00:00:00');
let btn = document.querySelector('.start-button');
let datetimePicker = document.querySelector('.datetime-picker');


flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selected = selectedDates[0];
    if (selected <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      btn.disabled = true;
    } else {
      deadline = selected;
      btn.disabled = false;

    }
  },
});

const timer = {
  interval: null,
  days: document.querySelector('.js-timer__days'),
  hours: document.querySelector('.js-timer__hours'),
  minutes: document.querySelector('.js-timer__minutes'),
  seconds: document.querySelector('.js-timer__seconds'),

  start(deadline) {
    this.interval = setInterval(() => {
      const diff = deadline - new Date();

      if (diff < 0) {
        this.stop();
        btn.disabled = false;
        datetimePicker.disabled = false;

        return;
      }
      const timeComponents = convertMs(diff);

      this.days.textContent = this.pad(timeComponents.days);
      this.hours.textContent = this.pad(timeComponents.hours);
      this.minutes.textContent = this.pad(timeComponents.minutes);
      this.seconds.textContent = this.pad(timeComponents.seconds);
    }, 1000);

  },
  stop() {
    clearInterval(this.interval);
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

btn.addEventListener('click', () => {
  if (deadline) {
    timer.start(deadline);
    btn.disabled = true;
    datetimePicker.disabled = true;
  }
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

