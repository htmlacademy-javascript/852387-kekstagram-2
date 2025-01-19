
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesСount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentTotalCount = commentsCount.querySelector('.social__comment-total-count');
const captionPicture = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const renderBigPicture = function ({url, description, likes, comments}) {

  bigPictureImg.src = url;
  likesСount.textContent = likes;
  commentTotalCount.textContent = comments.length;
  captionPicture.textContent = description;
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

};

export { renderBigPicture };
