import { isEscapeKey } from './util.js';
import { renderBigPicture } from './big-picture.js';
import { gallery } from './gallery.js';

const body = document.querySelector('body');
const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const resetElement = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

function onClickPicture (evt) {

  if (evt.target.closest('.picture')) {
    const choosePhoto = gallery.find((item) => item.id === Number(evt.target.parentElement.id));

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    renderBigPicture(choosePhoto);

    document.addEventListener('keydown', onDocumentKeydown);
  }
}

picturesContainer.addEventListener('click', onClickPicture);

function closePictureModal () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

resetElement.addEventListener('click', () => {
  closePictureModal();
});
