//import { gallery } from "./gallery";

const commentContainer = document.querySelector('.social__comments');
const getComment = function (coments, count) {

  const commentList = commentContainer.querySelectorAll('.social__comment');

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

/* <li class="social__comment">
  <img
    class="social__picture"
    src="{{аватар}}"
    alt="{{имя комментатора}}"
    width="35" height="35">
  <p class="social__text">{{текст комментария}}</p>
</li> */

/* const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, SIMILAR_AVATAR_COUNT) }.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
}); */

/*
const userEmotions = [
  'smile',
  'crying',
];

const emojiContainer = document.querySelector('.emojis');
const emojiList = emojiContainer.querySelectorAll('.emoji');
const modifiers = userEmotions.map((userEmotion) => 'emoji--' + userEmotion);

emojiList.forEach((emojiListItem) => {
  const modifier = emojiListItem.classList[1]; // 1 - это индекс нужного класса в атрибуте class

  if (!modifiers.includes(modifier)) {
    emojiListItem.remove();
  }
});
 */
