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

//const buttonSubmit = form.querySelector('.img-upload__submit');

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

// const onDescriptionField = (evt) => {
//   evt.stopPropagation();
// };

// descriptionField.addEventListener('cklick', onDescriptionField);

// const onHashtagsField = (evt) => {
//   evt.stopPropagation();
// };

// hashtagsField.addEventListener('cklick', onHashtagsField);


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

  // descriptionField.removeEventListener('change', onDescriptionField);
  // hashtagsField.removeEventListener('change', onHashtagsField);
  document.removeEventListener('keydown', onDocumentKeydown);
}

buttonClose.addEventListener('click', () => {
  closeUploadModal();
});

//-------------ВАЛИДАЦИЯ------------------------

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const textErrors = {
  getTestOne: 'введён невалидный хэштег',
  getTestTwo: 'превышено количество хэштегов',
  getTestThree: 'хэштеги повторяются'
};

let currentError = '';

function validateHashtags (value) {
  const pattern = /^(#[a-zа-я0-9]{1,19})*$/i;
  const hashtags = value.split(' ');

  const tests = {
    getTestOne: function() {
      return hashtags === '' || hashtags.every((hashtag) => pattern.test(hashtag));
    },
    getTestTwo: function() {
      return hashtags.length <= 5;
    },
    getTestThree: function() {
      return !hashtags.some((item, index) => hashtags.indexOf(item) < index);
    },
  };

  for (const key in tests) {
    if (!tests[key]()) {
      currentError = textErrors[key];
      return false;
    } else {
      currentError = '';
    }
  }
  return true;
}

function getHashtagsErrorMessage () {
  return currentError;
}

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  getHashtagsErrorMessage
);

function validateDescription (value) {
  return value.length < 140;
}

pristine.addValidator(
  descriptionField,
  validateDescription,
  'длина комментария больше 140 символов'
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

