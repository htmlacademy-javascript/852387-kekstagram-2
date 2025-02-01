import { createCountCommentsLoader } from './util.js';
import { COMMENT_COUNT_LOADER } from './const.js';

let listComments = [];
let startIndex = createCountCommentsLoader();

const commentContainer = document.querySelector('.social__comments');
const bigPicture = document.querySelector('.big-picture');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentSample = commentContainer.querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentShownCount = commentsCount.querySelector('.social__comment-shown-count');

const renderCommit = function ({avatar, message, name}) {

  const commentElement = commentSample.cloneNode(true);
  const img = commentElement.querySelector('.social__picture');
  img.src = `${avatar}`;
  img.alt = `${name}`;
  const text = commentElement.querySelector('.social__text');
  text.textContent = `${message}`;
  return commentElement;

};

const getComments = function () {

  const commentsListFragment = document.createDocumentFragment();
  const start = startIndex();
  let count = COMMENT_COUNT_LOADER + start;
  const showComment = listComments.slice(start, count);

  if (listComments.length < count || showComment.length < count) {
    count = listComments.length;
  }

  showComment.forEach((comment) => {
    const renderCommitElement = renderCommit(comment);
    commentsListFragment.appendChild(renderCommitElement);

  });

  commentContainer.appendChild(commentsListFragment);
  commentShownCount.textContent = commentContainer.children.length;

  if (listComments.length === commentContainer.children.length) {
    commentsLoader.classList.add('hidden');
  }
};

const renderComments = (currntComments) => {

  commentContainer.innerHTML = '';
  listComments = currntComments;
  getComments();
  commentsLoader.addEventListener('click', getComments);

};

const clearComments = function () {

  startIndex = createCountCommentsLoader();
  commentsLoader.classList.add('hidden');
  commentsLoader.removeEventListener('click', getComments);

};

export { renderComments, clearComments };
