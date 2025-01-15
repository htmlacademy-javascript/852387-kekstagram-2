
const commentContainer = document.querySelector('.social__comments');
const commentList = commentContainer.querySelectorAll('.social__comment');

const getComment = function (coments, count) {

  if (coments.length === 0) {
    count = 0;
    commentContainer.innerHTML = '';
  }

  for (let i = 0; i < count; i++) {
    const commentListItem = commentList[i];
    const currentComent = coments[i];

    const img = commentListItem.querySelector('.social__picture');
    img.src = `${currentComent.avatar}`;
    img.alt = `${currentComent.name}`;

    const text = commentListItem.querySelector('.social__text');
    text.textContent = `${currentComent.message}`;
  }
};

export { getComment };
