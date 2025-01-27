const ALERT_SHOW_TIME = 5000;

const extractNumber = (text) => {
  const normalizeText = String(text);
  let result = '';
  for (let i = 0; i < normalizeText.length; i++) {
    if (!isNaN(parseInt(normalizeText[i], 10))) {
      result += normalizeText[i];
    }
  }
  return parseInt(result, 10);
};

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

const showMessageError = (value) => {

  const errorTemplate = document.querySelector(`#${value}`)
    .content
    .querySelector(`.${value}`);
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

const showMessage = (value) => {
  const MessageTemplate = document.querySelector(`#${value}`)
    .content
    .querySelector(`.${value}`);
  const MessageElement = MessageTemplate.cloneNode(true);
  document.body.append(MessageElement);
};

export {extractNumber, getRandomArrayElement, getRandomInteger,
  createIdGenerator, isEscapeKey, createCountCommentsLoader,
  showMessageError, showMessage};
