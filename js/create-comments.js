import {SIMILAR_AVATAR_COUNT, COMMENTS, NAMES, SIMILAR_COMMENT_COUNT} from './data.js';
import {createIdGenerator, getRandomInteger, getRandomArrayElement} from './util.js';

const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, SIMILAR_AVATAR_COUNT) }.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const similarComments = () => Array.from({length: getRandomInteger(0, SIMILAR_COMMENT_COUNT)}, createComment);

export {similarComments};
