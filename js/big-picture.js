import { getComment } from './comments.js';


const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesСount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentShownCount = commentsCount.querySelector('.social__comment-shown-count');
const commentsSown = bigPicture.querySelectorAll('.social__comments li');
const commentTotalCount = commentsCount.querySelector('.social__comment-total-count');
const captionPicture = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const renderBigPicture = function ({url, description, likes, comments}) {

  bigPictureImg.src = url;
  likesСount.textContent = likes;
  commentShownCount.textContent = commentsSown.length;
  commentTotalCount.textContent = comments.length;
  captionPicture.textContent = description;
  bigPicture.classList.remove('hidden');

  getComment(comments, commentsSown.length);
};

export { renderBigPicture };
