//import { isEscapeKey, isEnterKey } from './util.js';
import { renderBigPicture } from './big-picture.js';
import { gallery } from './gallery.js';

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

function onClickPicture (evt) {

  if (evt.target.closest('.picture')) {
    const choosePhoto = gallery.find((item) => item.id === Number(evt.target.parentElement.id));

    bigPicture.classList.remove('hidden');

    const body = document.querySelector('body');
    body.classList.add('modal-open');

    renderBigPicture(choosePhoto);
  }
}

picturesContainer.addEventListener('click', onClickPicture);


/*
import {renderSimilarList, clearSimilarList} from './similar-list.js';

const userModalElement = document.querySelector('.setup');
const userModalOpenElement = document.querySelector('.setup-open');
const userModalCloseElement = userModalElement.querySelector('.setup-close');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal () {
  userModalElement.classList.remove('hidden');
  renderSimilarList();

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal () {
  userModalElement.classList.add('hidden');
  clearSimilarList();

  document.removeEventListener('keydown', onDocumentKeydown);
}

userModalOpenElement.addEventListener('click', () => {
  openUserModal();
});

userModalOpenElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openUserModal();
  }
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

userModalCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});
 */
