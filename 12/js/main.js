import { createGallery } from './create-gallery.js';
import { savePhotos } from './picture-modal.js';
import { showMessageError } from './util.js';
import { getData } from './api.js';

try {
  const photos = await getData ();
  savePhotos(photos);
  createGallery(photos);
} catch (error) {
  showMessageError(error.message);
}

