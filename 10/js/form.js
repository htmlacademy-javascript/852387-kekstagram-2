import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('.img-upload__input');
const uploadModal = form.querySelector('.img-upload__overlay');
const buttonClose = uploadModal.querySelector('.img-upload__cancel');
const effectLevel = form.querySelector('.effect-level__value');
const hashtagsField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const effectsList = form.querySelectorAll('input[type="radio"]');

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
  effectsList.forEach((effect) => {
    if (effect.id['effect-none']) {
      effect.checked = true;
    } else {
      effect.checked = false;
    }
  });

  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
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

