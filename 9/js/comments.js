import { createCountCommentsLoader } from './util.js';

const commentContainer = document.querySelector('.social__comments');
const commentSample = commentContainer.querySelector('.social__comment');


const renderCommit = function ({avatar, message, name}) {
  const commentElement = commentSample.cloneNode(true);
  const img = commentElement.querySelector('.social__picture');
  img.src = `${avatar}`;
  img.alt = `${name}`;
  const text = commentElement.querySelector('.social__text');
  text.textContent = `${message}`;

  return commentElement;
};

const getComments = function (comments, count) {

  const commentsListFragment = document.createDocumentFragment();
  const startIndexComment = createCountCommentsLoader();
  const showComment = comments.slice(startIndexComment, count);

  if (comments.length < count || showComment.length < count) {
    count = comments.length;
  }

  showComment.forEach((comment) => {
    const renderCommitElement = renderCommit(comment);
    commentsListFragment.appendChild(renderCommitElement);
  });

  commentContainer.innerHTML = '';
  commentContainer.appendChild(commentsListFragment);
};

export { getComments };
