const MESSATE_ERROR_SHOW_TIME = 5000;

const errorLoadTemplate = document.querySelector('#data-error').content;
const body = document.body;

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

function createCountCommentsLoader () {
  let lastGeneratedCount = -5;

  return function () {
    lastGeneratedCount += 5;
    return lastGeneratedCount;
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';

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

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export {extractNumber, createCountCommentsLoader,
  debounce, isEscapeKey, showMessage, showMessageError,};
