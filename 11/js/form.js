import { isEscapeKey } from './util.js';
import { extractNumber } from './functions.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('.img-upload__input');
const uploadModal = form.querySelector('.img-upload__overlay');
const buttonClose = uploadModal.querySelector('.img-upload__cancel');
const effectLevel = form.querySelector('.effect-level__value');
const hashtagsField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const effectsListInput = form.querySelectorAll('input[type="radio"]');

const imgUploadPreview = form.querySelector('.img-upload__preview');
const img = imgUploadPreview.querySelector('img');
const uploadScale = form.querySelector('.img-upload__scale');
const scaleControlValue = uploadScale.querySelector('.scale__control--value');

const effectLevelSlider = form.querySelector('.effect-level__slider');
const imgUploadEffectLevel = form.querySelector('.img-upload__effect-level');
const imgUploadEffects = form.querySelector('.img-upload__effects');
const effectLevelValue = form.querySelector('.effect-level__value'); // скрытое поле ввода

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagsField || document.activeElement === descriptionField) {
      evt.stopPropagation();
    } else {
      form.reset();
      closeUploadModal();
    }
  }
};

const onChangeUploadFile = (evt) => {
  evt.preventDefault();

  imgUploadEffectLevel.classList.add('hidden');

  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

uploadFile.addEventListener('change', onChangeUploadFile);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const onFormSubmit = function (evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
};

form.addEventListener('submit', onFormSubmit);


function closeUploadModal () {

  uploadFile.value = null;
  effectLevel.value = null;
  hashtagsField.value = null;
  descriptionField.value = null;
  effectsListInput.forEach((effect) => {
    if (effect.id['effect-none']) {
      effect.checked = true;
    } else {
      effect.checked = false;
    }
    imgUploadPreview.style.transform = null;
  });

  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  uploadScale.removeEventListener('click', onClickScaleControl);
  imgUploadEffects.removeEventListener('change', onChangeEffect);
  form.removeEventListener('submit', onFormSubmit);
}

buttonClose.addEventListener('click', () => {
  closeUploadModal();
});

//-------------ВАЛИДАЦИЯ------------------------

const MAX_HASHTAGS = 5;
let errorMessage = '';

function validateHashtags (value) {
  errorMessage = '';
  const inputValue = value.trim();
  const pattern = /^(#[a-zа-я0-9]{1,19})*$/i;

  const hashtags = inputValue.split(' ');

  const rules = [
    {
      test: hashtags === '' || hashtags.every((hashtag) => pattern.test(hashtag)),
      error: 'введён невалидный хэштег',
    },
    {
      test: hashtags.length <= MAX_HASHTAGS,
      error: 'превышено количество хэштегов',
    },
    {
      test: !hashtags.some((item, index) => hashtags.indexOf(item) < index),
      error: 'хэштеги повторяются'
    },
  ];

  return rules.every((rule) => {
    const isValid = rule.test;
    if(!isValid) {
      errorMessage = rule.error;
    }
    return isValid;
  });
}

function getHashtagsErrorMessage () {
  return errorMessage;
}

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  getHashtagsErrorMessage
);

function validateDescription (value) {
  return value.trim().length < 140;
}

pristine.addValidator(
  descriptionField,
  validateDescription,
  'длина комментария больше 140 символов'
);

//-------------масштаб фото-------------------

// добавить удаление события при закрытии окна НЕ ЗАБЫТЬ!!!!!!!
function onClickScaleControl (evt) {
  let scaleValue = extractNumber(scaleControlValue.value);
  if (evt.target.closest('.scale__control--smaller') && scaleValue > 25){
    scaleValue -= 25;
  } else if (evt.target.closest('.scale__control--bigger') && scaleValue < 100) {
    scaleValue += 25;
  }
  scaleControlValue.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
}

uploadScale.addEventListener('click', onClickScaleControl);

//-----------noUiSlider + фильтры_для_фото--------------------

const options = [
  {
    id: 'effect-chrome',
    sliderOptions: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    },
    getFilter: function (value) {
      return `grayscale(${value})`;
    }
  },
  {
    id: 'effect-sepia',
    sliderOptions: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    },
    getFilter: function (value) {
      return `sepia(${value})`;
    }
  },
  {
    id: 'effect-marvin',
    sliderOptions: {
      range: {
        min: 0,
        max: 100//%
      },
      start: 100,
      step: 1,//%
    },
    getFilter: function (value) {
      return `invert(${value}%)`;
    }
  },
  {
    id: 'effect-phobos',
    sliderOptions: {
      range: {
        min: 0,
        max: 3//px
      },
      start: 3,
      step: 0.1,//px
    },
    getFilter: function (value) {
      return `blue(${value}px)`;
    }
  },
  {
    id: 'effect-heat',
    sliderOptions: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1,
    },
    getFilter: function (value) {
      return `brightness(${value})`;
    }
  }

];

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

function onChangeEffect (evt) {

  if (evt.target.checked){
    if (evt.target.id === 'effect-none') {
      imgUploadEffectLevel.classList.add('hidden');
      img.style.filter = null;
    } else {
      imgUploadEffectLevel.classList.remove('hidden');
      const currentOption = options.filter((option) => option.id === evt.target.id);
      effectLevelSlider.noUiSlider.updateOptions(currentOption[0].sliderOptions);
      effectLevelSlider.noUiSlider.on('update', () => {
        effectLevelValue.value = effectLevelSlider.noUiSlider.get(); // Получим актуальное значение слайдера
        img.style.filter = currentOption[0].getFilter(effectLevelValue.value);
      });
    }
  }
}

imgUploadEffects.addEventListener('change', onChangeEffect);
