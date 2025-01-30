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

export { Effects, StyleFilterByEffects};
