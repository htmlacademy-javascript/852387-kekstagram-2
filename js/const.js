const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  [Method.POST]: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const COMMENT_COUNT_LOADER = 5;

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const MAX_HASHTAGS = 5;

const ScaleOptions = {
  max: 100,
  min: 25,
  step: 25,
};

const sliderOptionsMarvinDefault = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
};

const sliderOptionsChromeSepia = {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1
};

const sliderOptionsPhobos = {
  range: {
    min: 0,
    max: 3//px
  },
  start: 3,
  step: 0.1,//px
};

const sliderOptionsHeat = {
  range: {
    min: 1,
    max: 3
  },
  start: 3,
  step: 0.1,
};

const Effects = {
  none: sliderOptionsMarvinDefault,
  chrome: sliderOptionsChromeSepia,
  sepia: sliderOptionsChromeSepia,
  marvin: sliderOptionsMarvinDefault,
  phobos: sliderOptionsPhobos,
  heat: sliderOptionsHeat
};

const getCromeStyleFilter = (value) => `grayscale(${value})`;
const getSepiaStyleFilter = (value) => `sepia(${value})`;
const getMavinStyleFilter = (value) => `invert(${value}%)`;
const getPhobosStyleFilter = (value) => `blur(${value}px)`;
const getHeatStyleFilter = (value) => `brightness(${value})`;

const StyleFilterByEffects = {
  chrome: getCromeStyleFilter,
  sepia: getSepiaStyleFilter,
  marvin: getMavinStyleFilter,
  phobos: getPhobosStyleFilter,
  heat: getHeatStyleFilter
};

export { Effects, StyleFilterByEffects, ScaleOptions,
  FILE_TYPES, SubmitButtonText, MAX_HASHTAGS, COMMENT_COUNT_LOADER,
  BASE_URL, Route, Method, ErrorText };
