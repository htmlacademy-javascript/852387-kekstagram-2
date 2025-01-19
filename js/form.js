import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('.img-upload__input');
const uploadModal = form.querySelector('.img-upload__overlay');

const buttonClose = uploadModal.querySelector('.img-upload__cancel');

const effectLevel = form.querySelector('.effect-level__value');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const effectsList = form.querySelectorAll('input[type="radio"]');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const onChangeUploadFile = (evt) => {
  evt.preventDefault();
  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

uploadFile.addEventListener('change', onChangeUploadFile);

function closeUploadModal () {

  uploadFile.value = null;
  effectLevel.value = null;
  hashtags.value = null;
  description.value = null;
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
}

buttonClose.addEventListener('click', () => {
  closeUploadModal();
});
