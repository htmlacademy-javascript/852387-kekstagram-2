import { isEscapeKey } from './util.js';
// форма находиться в <section class="pictures  container">

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('.img-upload__input');
const uploadModal = form.querySelector('.img-upload__overlay');

const buttonClose = uploadModal.querySelector('.img-upload__cancel');

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
  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

buttonClose.addEventListener('click', () => {
  closeUploadModal();
});

// Закрытие формы редактирования изображения производится либо нажатием на
// кнопку .img-upload__cancel, либо нажатием клавиши Esc. Элементу .img-upload__overlay
//  возвращается класс hidden. У элемента body удаляется класс modal-open.
