import { gallery } from './gallery.js';
import {isEscapeKey, isEnterKey} from './util.js';


//const picturesContainer = document.querySelector('.pictures');


const pictures = document.querySelectorAll('.picture');

const bigPicture = document.querySelector('.big-picture');

pictures.forEach((photo) => {

  photo.addEventListener('click', (evt) => {
    evt.preventDefault();

    const choosePhoto = gallery.find((item) => item.id === Number(photo.id));
console.log(choosePhoto);
    const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    bigPictureImg.src = choosePhoto.url;

    const likesСount = bigPicture.querySelector('.likes-count');
    likesСount.textContent = choosePhoto.likes;



    const commentsCount = bigPicture.querySelector('.social__comment-count');
    const commentShownCount = commentsCount.querySelector('.social__comment-shown-count');
    const commentsSown = bigPicture.querySelectorAll('.social__comments li');
    commentShownCount.textContent = commentsSown.length;

    const commentTotalCount = commentsCount.querySelector('.social__comment-total-count');
    commentTotalCount.textContent = choosePhoto.comments.length;

    commentsCount.classList.add('hidden');

    const captionPicture = bigPicture.querySelector('.social__caption');
    captionPicture.textContent = choosePhoto.description;

    bigPicture.classList.remove('hidden');

    const commentsLoader = bigPicture.querySelector('.comments-loader');
    commentsLoader.classList.add('hidden');

    const body = document.querySelector('body');
    body.classList.add('modal-open');

  });
});
