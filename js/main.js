//import { gallery } from './gallery.js';
import { createGallery } from './create-gallery.js';
import './picture-modal.js';
import { setUserForSubmit, closeUploadModal } from './form.js';
import { showMessageError } from './util.js';
import { showMessageSuccess, showMessageFail } from './showAlert.js';


fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    createGallery(photos);
  })
  .catch(() => {
    showMessageError();
  });

setUserForSubmit(closeUploadModal);
