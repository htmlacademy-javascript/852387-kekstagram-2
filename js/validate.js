import { MAX_HASHTAGS, PATTERN_HASHTAG } from './const.js';

const form = document.querySelector('.img-upload__form');
const hashtagsField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');

let errorMessage = '';

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});


const validateHashtags = (value) => {
  errorMessage = '';
  const inputValue = value.trim().toUpperCase();

  const hashtags = inputValue.split(' ').filter(Boolean);

  const rules = [
    {
      test: hashtags === '' || hashtags.every((hashtag) => PATTERN_HASHTAG.test(hashtag)),
      error: 'введён невалидный хэштег',
    },
    {
      test: hashtags.length <= MAX_HASHTAGS,
      error: 'превышено количество хэштегов',
    },
    {
      test: !hashtags.some((item, index) => hashtags.indexOf(item.toUpperCase()) < index),
      error: 'хэштеги повторяются'
    },
  ];

  return rules.every((rule) => {
    const isValid = rule.test;
    if(!isValid) {
      errorMessage = rule.error;
    }
    return isValid;
  });
};

const getHashtagsErrorMessage = () => errorMessage;

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  getHashtagsErrorMessage
);

const validateDescription = (value) => value.trim().length < 140;

pristine.addValidator(
  descriptionField,
  validateDescription,
  'длина комментария больше 140 символов'
);

export { pristine };
