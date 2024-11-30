const SIMILAR_PHOTOS_COUNT = 25;
const SIMILAR_COMMENT_COUNT = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const SIMILAR_AVATAR_COUNT = 6;

const DESCRIPTION = [
  'Солнечный пляж, песчаные дюны.',
  'Лесная тропа, шорох листьев.',
  'Капли дождя, окно дождливого дня.',
  'Горы, тающий снег, свежий воздух.',
  'Цветочный букет, яркие лепестки.',
  'Звёздное небо, молчаливые мечты.',
  'Уютный камин, мерцающий огонь.',
  'Старый мост, рекой века.',
  'Ночной город, огни и тени.',
  'Красный закат, прощание солнца.',
  'Летняя гроза, серебристые молнии.',
  'Американский динер, шумный завтрак.',
  'Бурное море, солёный ветер.',
  'Радуга, после дождя.',
  'Улыбающийся ребёнок, мир беззаботства.',
  'Мягкий ковёр, уютные тапочки.',
  'Старины архитектура, величие истории.',
  'Весенний сад, расцвет нежности.',
  'Зимний пейзаж, снежная тишина.',
  'Гитара, мелодия покоя.',
  'Кофейная чашка, утренний ритуал.',
  'Праздничный салют, радуга огней.',
  'Лунный свет, нежная сказка.',
  'Молоко, свежая булка.',
  'Старинная книга, загадочные страницы.'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Александр',
  'Мария',
  'Дмитрий',
  'Елена',
  'Константин',
  'Анна',
  'Сергей',
  'Наталья',
  'Виктор',
  'Ольга',
  'Илья',
  'Татьяна'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generatePhotoId = createIdGenerator();
const generateUrlId = createIdGenerator();
const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, SIMILAR_AVATAR_COUNT) }.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const similarComments = () => Array.from({length: getRandomInteger(0, SIMILAR_COMMENT_COUNT)}, createComment);

const createPhotos = () => ({
  id: generatePhotoId(),
  url: `photos/${ generateUrlId() }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: similarComments(),
});

const similarPhotos = Array.from({length: SIMILAR_PHOTOS_COUNT}, createPhotos);

JSON.stringify(similarPhotos, null, 2);
