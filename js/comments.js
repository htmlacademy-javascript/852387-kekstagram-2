import { createCountCommentsLoader } from './util.js';
import { COMMENT_COUNT_LOADER } from './const.js';

let listComments = [];
let startIndex = createCountCommentsLoader();

const commentContainer = document.querySelector('.social__comments');
const bigPicture = document.querySelector('.big-picture');
const commentLoad = bigPicture.querySelector('.comments-loader');
const commentSample = commentContainer.querySelector('.social__comment');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentShownCount = commentCount.querySelector('.social__comment-shown-count');

const renderCommit = function ({avatar, message, name}) {

  const commentElement = commentSample.cloneNode(true);
  const img = commentElement.querySelector('.social__picture');
  img.src = `${avatar}`;
  img.alt = `${name}`;
  const text = commentElement.querySelector('.social__text');
  text.textContent = `${message}`;
  return commentElement;

};

const onCommentLoadClick = function () {

  const commentsListFragment = document.createDocumentFragment();
  const start = startIndex();
  let count = COMMENT_COUNT_LOADER + start;
  const сomments = listComments.slice(start, count);

  if (listComments.length < count || сomments.length < count) {
    count = listComments.length;
  }

  сomments.forEach((comment) => {
    const renderCommitElement = renderCommit(comment);
    commentsListFragment.appendChild(renderCommitElement);

  });

  commentContainer.appendChild(commentsListFragment);
  commentShownCount.textContent = commentContainer.children.length;

  if (listComments.length === commentContainer.children.length) {
    commentLoad.classList.add('hidden');
  }
};

const getComments = (currntComments) => {

  commentContainer.innerHTML = '';
  listComments = currntComments;
  onCommentLoadClick();
  commentLoad.addEventListener('click', onCommentLoadClick);

};

const clearComments = function () {

  startIndex = createCountCommentsLoader();
  commentLoad.classList.add('hidden');
  commentLoad.removeEventListener('click', onCommentLoadClick);

};

export { getComments, clearComments };
