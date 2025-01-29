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

function debounce (callback, timeoutDelay = 500) {
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
}


function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

const getSizeComments = (item) => item.comments.length;

const comparePhotos = (photoA, photoB) => {
  const rankA = getSizeComments(photoA);
  const rankB = getSizeComments(photoB);

  return rankB - rankA;
};


export {extractNumber, getRandomArrayElement, getRandomInteger,
  createIdGenerator, isEscapeKey, createCountCommentsLoader,
  showMessageError, showMessage, closeMessage, debounce, throttle,
  comparePhotos};
