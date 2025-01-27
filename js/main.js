import { createGallery } from './create-gallery.js';
import './picture-modal.js';
import { setUserForSubmit, closeUploadModal } from './form.js';
import { showMessageError } from './util.js';
import { getData } from './api.js';

getData()
  .then((photos) => {
    createGallery(photos);
  })
  .catch((err) => {
    showMessageError(err.message);
  });

setUserForSubmit(closeUploadModal);
