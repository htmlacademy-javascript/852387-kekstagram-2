import { getComments } from './comments.js';
import { createCountCommentsLoader } from './util.js';

const COMMENT_COUNT_LOADER = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesСount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentShownCount = commentsCount.querySelector('.social__comment-shown-count');
// const commentsSown = bigPicture.querySelectorAll('.social__comments li');
const commentTotalCount = commentsCount.querySelector('.social__comment-total-count');
const captionPicture = bigPicture.querySelector('.social__caption');

// const commentContainer = document.querySelector('.social__comments');
// const commentSample = commentContainer.querySelector('.social__comment');

const renderBigPicture = function ({url, description, likes, comments}) {

  bigPictureImg.src = url;
  likesСount.textContent = likes;
  const countTotal = comments.length;
  if (countTotal < COMMENT_COUNT_LOADER) {
    commentShownCount.textContent = countTotal;
  } else {
    commentShownCount.textContent = COMMENT_COUNT_LOADER;
  }
  commentTotalCount.textContent = comments.length;
  captionPicture.textContent = description;
  bigPicture.classList.remove('hidden');


//const countCommentsLoader = createCountCommentsLoader();

  getComments(comments, COMMENT_COUNT_LOADER);
};

export { renderBigPicture };

// доработайте код по выводу списка комментариев таким образом,
// чтобы список показывался не полностью, а по 5 элементов,
// и следующие 5 элементов добавлялись бы по нажатию на
// кнопку «Загрузить ещё».
// Не забудьте реализовать обновление числа показанных
// комментариев в блоке .social__comment-count.
