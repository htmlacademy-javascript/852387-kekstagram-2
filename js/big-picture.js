import { getComments } from './comments.js';

const COMMENT_COUNT_LOADER = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesСount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentShownCount = commentsCount.querySelector('.social__comment-shown-count');
const commentsSown = bigPicture.querySelectorAll('.social__comments li');
const commentTotalCount = commentsCount.querySelector('.social__comment-total-count');
const captionPicture = bigPicture.querySelector('.social__caption');

const renderBigPicture = function ({url, description, likes, comments}) {

  bigPictureImg.src = url;
  likesСount.textContent = likes;
  commentShownCount.textContent = commentsSown.length;
  commentTotalCount.textContent = comments.length;
  captionPicture.textContent = description;
  bigPicture.classList.remove('hidden');

  getComments(comments, COMMENT_COUNT_LOADER);
};

export { renderBigPicture };

доработайте код по выводу списка комментариев таким образом,
чтобы список показывался не полностью, а по 5 элементов,
и следующие 5 элементов добавлялись бы по нажатию на
кнопку «Загрузить ещё».
Не забудьте реализовать обновление числа показанных
комментариев в блоке .social__comment-count.
