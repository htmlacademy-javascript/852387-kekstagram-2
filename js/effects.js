
const form = document.querySelector('.img-upload__form');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value'); // скрытое поле ввода
const uploadFile = form.querySelector('.img-upload__input');
const effectLevel = form.querySelector('.effect-level__value');
const effectsListInput = form.querySelectorAll('input[type="radio"]');
const imgUploadEffectLevel = form.querySelector('.img-upload__effect-level');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const img = imgUploadPreview.querySelector('img');

const options = [
  {
    id: 'effect-chrome',
    sliderOptions: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    },
    getFilter: function (value) {
      return `grayscale(${value})`;
    }
  },
  {
    id: 'effect-sepia',
    sliderOptions: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    },
    getFilter: function (value) {
      return `sepia(${value})`;
    }
  },
  {
    id: 'effect-marvin',
    sliderOptions: {
      range: {
        min: 0,
        max: 100//%
      },
      start: 100,
      step: 1,//%
    },
    getFilter: function (value) {
      return `invert(${value}%)`;
    }
  },
  {
    id: 'effect-phobos',
    sliderOptions: {
      range: {
        min: 0,
        max: 3//px
      },
      start: 3,
      step: 0.1,//px
    },
    getFilter: function (value) {
      return `blue(${value}px)`;
    }
  },
  {
    id: 'effect-heat',
    sliderOptions: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1,
    },
    getFilter: function (value) {
      return `brightness(${value})`;
    }
  }

];

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
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

const onChangeEffect = function (evt) {

  if (evt.target.checked){
    if (evt.target.id === 'effect-none') {
      imgUploadEffectLevel.classList.add('hidden');
      img.style.filter = null;
    } else {
      imgUploadEffectLevel.classList.remove('hidden');
      const currentOption = options.filter((option) => option.id === evt.target.id);
      effectLevelSlider.noUiSlider.updateOptions(currentOption[0].sliderOptions);
      effectLevelSlider.noUiSlider.on('update', () => {
        effectLevelValue.value = effectLevelSlider.noUiSlider.get(); // Получим актуальное значение слайдера
        img.style.filter = currentOption[0].getFilter(effectLevelValue.value);
      });
    }
  }
};

const resetSlider = function () {
  uploadFile.value = null;
  effectLevel.value = null;
  effectsListInput.forEach((effect) => {
    if (effect.id['effect-none']) {
      effect.checked = true;
    } else {
      effect.checked = false;
    }
  });
};

export { onChangeEffect, resetSlider };
