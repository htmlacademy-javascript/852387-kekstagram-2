import { Effects, StyleFilterByEffects } from './const.js';

const form = document.querySelector('.img-upload__form');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value'); // скрытое поле ввода
const effectsListInput = form.querySelectorAll('input[type="radio"]');
const imgUploadEffectLevel = form.querySelector('.img-upload__effect-level');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const img = imgUploadPreview.querySelector('img');

const getEffectSelector = (currentInputId) => {
  const selectors = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };
  return selectors[currentInputId];
};

const getUpdateSliderOptions = (effect, sliderElement) => {
  sliderElement.noUiSlider.updateOptions(Effects[effect]);
};

const resetFilter = () => {
  img.style.removeProperty('filter');
  imgUploadEffectLevel.classList.add('hidden');
  img.classList.remove('effects__preview--none');
};

const onChangeEffect = function (evt) {
  const currentButton = evt.target.closest('.effects__radio');
  if (currentButton) {
    const effectBtnValue = currentButton.value;
    img.classList.add(getEffectSelector(effectBtnValue));
    getUpdateSliderOptions(effectBtnValue, effectLevelSlider);
  }
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get(); // Получим актуальное значение слайдера
  effectsListInput.forEach((item) => {
    if (item.checked) {
      if (item.value !== 'none') {
        imgUploadEffectLevel.classList.remove('hidden');
        img.style.filter = StyleFilterByEffects[item.value](effectLevelValue.value);
      } else {
        resetFilter();
      }
    }
  });
});

export { onChangeEffect, resetFilter };
