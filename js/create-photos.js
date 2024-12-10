import {DESCRIPTION, MIN_LIKES, MAX_LIKES, SIMILAR_PHOTOS_COUNT} from './data.js';
import {createIdGenerator, getRandomArrayElement, getRandomInteger} from './util.js';
import {similarComments} from './create-comments.js';

const generatePhotoId = createIdGenerator();
const generateUrlId = createIdGenerator();

const createPhotos = () => ({
  id: generatePhotoId(),
  url: `photos/${ generateUrlId() }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: similarComments(),
});

const similarPhotos = Array.from({length: SIMILAR_PHOTOS_COUNT}, createPhotos);

export {similarPhotos};
