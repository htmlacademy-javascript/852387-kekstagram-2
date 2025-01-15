import { getComments } from './comments.js';
import { createCountCommentsLoader } from './util.js';

const COMMENT_COUNT_LOADER = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesСount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentShownCount = commentsCount.querySelector('.social__comment-shown-count');
const commentTotalCount = commentsCount.querySelector('.social__comment-total-count');
const captionPicture = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');

const commentsLoader = bigPicture.querySelector('.comments-loader');


const renderBigPicture = function ({url, description, likes, comments}) {

  bigPictureImg.src = url;
  likesСount.textContent = likes;
  commentTotalCount.textContent = comments.length;
  captionPicture.textContent = description;
  bigPicture.classList.remove('hidden');

  const startIndexComment = createCountCommentsLoader();

  const onClickCommentsLoader = function (evt) {
    evt.preventDefault();
    getComments(comments, startIndexComment());
    commentShownCount.textContent = commentsList.children.length;
  };

  commentsLoader.addEventListener('click', onClickCommentsLoader);

  getComments(comments, COMMENT_COUNT_LOADER, startIndexComment());

  commentShownCount.textContent = commentsList.children.length;

};

export { renderBigPicture };
