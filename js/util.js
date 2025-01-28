const MESSATE_ERROR_SHOW_TIME = 5000;

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

const errorLoadTemplate = document.querySelector('#data-error').content;
const body = document.body;

const showMessageError = () => {

  const errorElement = errorLoadTemplate.cloneNode(true);

  body.append(errorElement);

  const errorLoadDataElement = body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataElement.remove();
  }, MESSATE_ERROR_SHOW_TIME);
};

const closeMessage = (evt) => {
  // закрытие по клавише ESC
  // по кнопке
  // по пространству вне блока
  evt.stopPropagation();

  const currentElement = document.querySelector('.success') || document.querySelector('.error');

  const closeButton = currentElement.querySelector('button');

  if (evt.target === currentElement || evt.target === closeButton || isEscapeKey(evt)) {
    currentElement.remove();
    body.removeEventListener('click', closeMessage);
    body.removeEventListener('keydown', closeMessage);
  }
};

const showMessage = (value, trigger = null) => {
  trigger?.();
  const MessageTemplate = document.querySelector(`#${value}`)
    .content
    .querySelector(`.${value}`);
  const MessageElement = MessageTemplate.cloneNode(true);
  body.append(MessageElement);
  body.addEventListener('click', closeMessage);
  body.addEventListener('keydown', closeMessage);
};

export {extractNumber, getRandomArrayElement, getRandomInteger,
  createIdGenerator, isEscapeKey, createCountCommentsLoader,
  showMessageError, showMessage, closeMessage};
