import { isEscapeKey, showMessage } from './util.js';
import { sendData } from './api.js';
import { onChangeEffect, resetSlider } from './effects.js';
import { onClickScaleControl, resetScale } from './scale-photo.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('.img-upload__input');
const uploadModal = form.querySelector('.img-upload__overlay');
const buttonClose = uploadModal.querySelector('.img-upload__cancel');
const uploadScale = form.querySelector('.img-upload__scale');
const hashtagsField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const imgUploadEffects = form.querySelector('.img-upload__effects');
const imgUploadEffectLevel = form.querySelector('.img-upload__effect-level');
const submitButton = form.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

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

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function closeUploadModal () {

  resetSlider();
  pristine.reset();
  resetScale();
  form.reset();

  unblockSubmitButton();

  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  uploadScale.removeEventListener('click', onClickScaleControl);
  imgUploadEffects.removeEventListener('change', onChangeEffect);

}

const onChangeUploadFile = (evt) => {
  evt.preventDefault();

  imgUploadEffectLevel.classList.add('hidden');

  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

uploadFile.addEventListener('change', onChangeUploadFile);

form.addEventListener('reset', () => {
  uploadModal.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  pristine.reset();
  resetScale();
  resetSlider();
});

const sendFormData = async (formElement) => {
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();

    try {
      await sendData(new FormData (formElement));
      showMessage('success', () => {
        closeUploadModal();
      });
    } catch (error) {
      showMessage('error');
    } finally {
      unblockSubmitButton();
    }
  }
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

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

uploadScale.addEventListener('click', onClickScaleControl);

//-----------noUiSlider + фильтры_для_фото--------------------

imgUploadEffects.addEventListener('change', onChangeEffect);

//======================

form.addEventListener('submit', formSubmitHandler);

export { form, closeUploadModal };
