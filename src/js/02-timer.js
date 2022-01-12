import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let futureDateTime;

refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', onBtnStart);
refs.datetimePicker.addEventListener('input', dateTimeInput);

function dateTimeInput(e) {
  futureDateTime = new Date(e.target.value).getTime();
}

function onBtnStart(e) {
  const timerId = setInterval(() => {
    const currentTime = Date.now();

    const { days, hours, minutes, seconds } = convertMs(futureDateTime - currentTime);

    refs.seconds.textContent = addLeadingZero(seconds);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.hours.textContent = addLeadingZero(hours);
    refs.days.textContent = addLeadingZero(days);

    refs.seconds.style.color = 'red';
    refs.minutes.style.color = 'red';
    refs.hours.style.color = 'red';
    refs.days.style.color = 'red';

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timerId);
      Notiflix.Notify.success('Happy New Year!!!');
    }
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0].getTime() - Date.now() < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.disabled = false;
  },
};

flatpickr(refs.datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// const refs = {
//   startBtn: document.querySelector('button[data-action-start]'),
//   stopBtn: document.querySelector('button[data-action-stop]'),
//   clockface: document.querySelector('.js-clockface'),
// };

// class Timer {
//   constructor({ onTick }) {
//     this.intervalId = null;
//     this.isActive = false;
//     this.onTick = onTick;

//     this.init();
//   }

//   init() {
//     const time = this.getTimeComponents(0);
//     this.onTick(time);
//   }

//   start() {
//     if (this.isActive) {
//       return;
//     }

//     const startTime = Date.now();
//     this.isActive = true;

//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = currentTime - startTime;
//       const time = this.getTimeComponents(deltaTime);

//       this.onTick(time);
//     }, 1000);
//   }

//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//     const time = this.getTimeComponents(0);
//     this.onTick(time);
//   }

//   /*
//    * - Принимает время в миллисекундах
//    * - Высчитывает сколько в них вмещается часов/минут/секунд
//    * - Возвращает обьект со свойствами hours, mins, secs
//    * - Адская копипаста со стека 💩
//    */
//   getTimeComponents(time) {
//     const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
//     const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//     const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

//     return { hours, mins, secs };
//   }

//   /*
//    * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
//    */
//   pad(value) {
//     return String(value).padStart(2, '0');
//   }
// }

// const timer = new Timer({
//   onTick: updateClockface,
// });

// refs.startBtn.addEventListener('click', timer.start.bind(timer));
// refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

// /*
//  * - Принимает время в миллисекундах
//  * - Высчитывает сколько в них вмещается часов/минут/секунд
//  * - Рисует интерфейс
//  */
// function updateClockface({ hours, mins, secs }) {
//   refs.clockface.textContent = `${hours}:${mins}:${secs}`;
// }
