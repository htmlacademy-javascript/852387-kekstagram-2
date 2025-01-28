import { extractNumber } from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadScale = form.querySelector('.img-upload__scale');
const scaleControlValue = uploadScale.querySelector('.scale__control--value');
const imgUploadPreview = form.querySelector('.img-upload__preview');

const onClickScaleControl = function (evt) {
  let scaleValue = extractNumber(scaleControlValue.value);
  if (evt.target.closest('.scale__control--smaller') && scaleValue > 25){
    scaleValue -= 25;
  } else if (evt.target.closest('.scale__control--bigger') && scaleValue < 100) {
    scaleValue += 25;
  }
  scaleControlValue.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
};

const resetScale = function () {
  imgUploadPreview.style.transform = null;
};

export {onClickScaleControl, resetScale };
