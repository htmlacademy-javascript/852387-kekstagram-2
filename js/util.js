const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

function createCountCommentsLoader () {
  let lastGeneratedCount = -5;

  return function () {
    lastGeneratedCount += 5;
    return lastGeneratedCount;
  };
}


const isEscapeKey = (evt) => evt.key === 'Escape';

const showMessageError = () => {
  //const arrContainer = document.createDocumentFragment();
  const errorTemplate = document.querySelector('#data-error')
    .content
    .querySelector('.data-error');

  const errorElement = errorTemplate.cloneNode(true);

  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomArrayElement, getRandomInteger,
  createIdGenerator, isEscapeKey, createCountCommentsLoader, showMessageError};
