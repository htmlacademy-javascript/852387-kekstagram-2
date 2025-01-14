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

    const commentShowCount = bigPicture.querySelector('.social__comment-shown-count');
    const commentsSown = bigPicture.querySelectorAll('.social__comments li');
    commentShowCount.textContent = commentsSown.length;

    const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
    commentTotalCount.textContent = choosePhoto.comments.length;

    const captionPicture = bigPicture.querySelector('.social__caption');
    captionPicture.textContent = choosePhoto.description;

    bigPicture.classList.remove('hidden');


  });
});
