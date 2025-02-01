import { extractNumber } from './util.js';
import { ScaleOptions } from './const.js';

const form = document.querySelector('.img-upload__form');
const uploadScale = form.querySelector('.img-upload__scale');
const scaleControlValue = uploadScale.querySelector('.scale__control--value');
const imgUploadPreview = form.querySelector('.img-upload__preview');
const img = imgUploadPreview.querySelector('img');

const onClickScaleControl = function (evt) {
  let scaleValue = extractNumber(scaleControlValue.value);
  if (evt.target.closest('.scale__control--smaller') && scaleValue > ScaleOptions.min){
    scaleValue -= ScaleOptions.step;
  } else if (evt.target.closest('.scale__control--bigger') && scaleValue < ScaleOptions.max) {
    scaleValue += ScaleOptions.step;
  }
  scaleControlValue.value = `${scaleValue}%`;
  img.style.transform = `scale(${scaleValue / 100})`;
};

const resetScale = function () {
  img.style.transform = null;
};

export {onClickScaleControl, resetScale };
