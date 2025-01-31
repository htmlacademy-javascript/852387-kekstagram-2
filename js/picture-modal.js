import { isEscapeKey} from './util.js';
import { renderBigPicture } from './render-big-picture.js';
import { renderComments, clearComments } from './comments.js';

const body = document.body;
const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const resetElement = bigPicture.querySelector('.big-picture__cancel');

let photos = [];

const savePhotos = (dataPhotos) => {
  photos = dataPhotos;
  return photos;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const getPhotoById = (id) => photos.find((photo) => photo.id === id);

function openModal (evt) {

  if (evt.target.closest('.picture')) {
    const choosePhoto = getPhotoById(Number(evt.target.parentElement.id));
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    renderBigPicture(choosePhoto);
    renderComments(choosePhoto.comments);

    document.addEventListener('keydown', onDocumentKeydown);
  }
}

picturesContainer.addEventListener('click', openModal);

function closePictureModal () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  clearComments();
  document.removeEventListener('keydown', onDocumentKeydown);
}

resetElement.addEventListener('click', () => {
  closePictureModal();
});

export { openModal, savePhotos };
