
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

  if (comments.length < count) {
    count = comments.length;
  }

  for (let i = 0; i < count; i++) {
    const currentComent = comments[i];
    const renderCommitElement = renderCommit(currentComent);

    commentsListFragment.appendChild(renderCommitElement);
  }

  commentContainer.innerHTML = '';
  commentContainer.appendChild(commentsListFragment);
};

export { getComments };
