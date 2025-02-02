import { isEscapeKey} from './util.js';
import { renderBigPicture } from './render-big-picture.js';
import { getComments, clearComments } from './comments.js';

const body = document.body;
const gallery = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const resetElement = bigPicture.querySelector('.big-picture__cancel');

let photos = [];

const savePhotos = (dataPhotos) => {
  photos = dataPhotos;
  return photos;
};

const closePictureModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  clearComments();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const getPhotoById = (id) => photos.find((photo) => photo.id === id);

const onGalleryClick = (evt) => {

  if (evt.target.closest('.picture')) {
    const choosePhoto = getPhotoById(Number(evt.target.parentElement.id));
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    renderBigPicture(choosePhoto);
    getComments(choosePhoto.comments);

    document.addEventListener('keydown', onDocumentKeydown);
  }
};

gallery.addEventListener('click', onGalleryClick);
resetElement.addEventListener('click', () => {
  closePictureModal();
  document.removeEventListener('keydown', onDocumentKeydown);
});

export { savePhotos };
