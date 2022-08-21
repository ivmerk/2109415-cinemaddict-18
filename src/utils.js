import dayjs from 'dayjs';

//dayjs.extend(duration);
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomFloat = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

const getRandomValue = (items) => items[getRandomInteger(0, items.length - 1)];

const formatStringToDateWithTime = (date) => dayjs(date).format('YYYY/MM hh:mm');

const formatStringToDate = (date) => dayjs(date).format('DD MMMM YYYY');

const formatStringToYear = (date) => dayjs(date).format('YYYY');

const formatMinutesToTime = (date) => dayjs(date).format('H[h] mm[m]');
// const formatMinutesToTime = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');


export { getRandomInteger, getRandomValue, getRandomFloat, formatStringToDateWithTime, formatStringToDate, formatStringToYear, formatMinutesToTime };
