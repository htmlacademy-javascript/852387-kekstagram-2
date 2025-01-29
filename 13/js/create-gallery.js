const listPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesTitle = listPictures.querySelector('.pictures__title');
picturesTitle.classList.remove('visually-hidden');

const createGallery = (dataPhotos) => {

  const simularListFragment = document.createDocumentFragment();

  dataPhotos.forEach(({id, url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.id = id;

    const imgPictureElement = pictureElement.querySelector('.picture__img');
    imgPictureElement.src = url;
    imgPictureElement.alt = description;

    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    simularListFragment.appendChild(pictureElement);
  });

  listPictures.querySelectorAll('.picture').forEach((item) => item.remove());
  listPictures.appendChild(simularListFragment);

};

export { createGallery };
