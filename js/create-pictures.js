import {createPhotos} from './create-photos.js';

const listPictures = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesTitle = listPictures.querySelector('.pictures__title');
picturesTitle.classList.remove('visually-hidden');

const similarPhotos = createPhotos();

const simularListFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const imgPictureElement = pictureElement.querySelector('.picture__img');
  imgPictureElement.src = url;
  imgPictureElement.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  simularListFragment.appendChild(pictureElement);
});

listPictures.appendChild(simularListFragment);
