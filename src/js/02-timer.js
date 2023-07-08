import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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

const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const datetimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

let countdownIntervalId;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  const selectedDate = datetimePicker.selectedDates[0];

  function updateTimer() {
    const currentTime = new Date();
    const timeDifference = selectedDate - currentTime;

    if (timeDifference > 0) {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      daysValue.textContent = addLeadingZero(days);
      hoursValue.textContent = addLeadingZero(hours);
      minutesValue.textContent = addLeadingZero(minutes);
      secondsValue.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(countdownIntervalId);
    }
  }

  countdownIntervalId = setInterval(updateTimer, 1000);
});
