import { TextOnButtonSubmit } from './const.js';
import { pristine } from './validate.js';
import { isEscapeKey, showErrorMessage } from './util.js';
import { onEffectChange, resetEffects } from './effects.js';
import { onScaleClick, resetScale } from './scale-photo.js';
import { upLoadFile } from './loadPhoto.js';
import { sendData } from './api.js';

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
  submitButton.textContent = TextOnButtonSubmit.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = TextOnButtonSubmit.IDLE;
};

const closeUploadModal = () => {

  resetEffects();
  pristine.reset();
  resetScale();
  form.reset();

  unblockSubmitButton();

  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');

  buttonClose.removeEventListener('click', () => {
    closeUploadModal();
  });
  uploadScale.removeEventListener('click', onScaleClick);
  imgUploadEffects.removeEventListener('change', onEffectChange);

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

const onFileUpload = (evt) => {
  evt.preventDefault();

  upLoadFile();

  imgUploadEffectLevel.classList.add('hidden');

  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  buttonClose.addEventListener('click', () => {
    closeUploadModal();
  });
  uploadScale.addEventListener('click', onScaleClick);
  imgUploadEffects.addEventListener('change', onEffectChange);
};

const sendFormData = async (formElement) => {
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();

    try {
      await sendData(new FormData (formElement));
      showErrorMessage('success', () => {
        closeUploadModal();
        document.removeEventListener('keydown', onDocumentKeydown);
      });
    } catch (error) {
      showErrorMessage('error');
    } finally {
      unblockSubmitButton();
    }
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

uploadFile.addEventListener('change', onFileUpload);
form.addEventListener('reset', () => {
  uploadModal.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  pristine.reset();
  resetScale();
  resetEffects();
});
form.addEventListener('submit', onFormSubmit);

export { form, closeUploadModal };
