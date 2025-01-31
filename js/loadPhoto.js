const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('.img-upload__input');//
const imgUpload = document.querySelector('.img-upload');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
const preview = imgUploadPreview.querySelector('img');
const effectsList = form.querySelector('.effects__list');
const effectPreviews = effectsList.querySelectorAll('.effects__preview');

const upLoadFile = function () {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    preview.src = url;
    effectPreviews.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  }
};

export { upLoadFile };
