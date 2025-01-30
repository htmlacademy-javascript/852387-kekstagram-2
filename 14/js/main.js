import { createGallery } from './create-gallery.js';
import { createFilterGallery } from './filters.js';
import { savePhotos } from './picture-modal.js';
import { showMessageError } from './util.js';
import { getData } from './api.js';

try {
  const photos = await getData ();
  savePhotos(photos);
  createGallery(photos);
  createFilterGallery(photos);
} catch (error) {
  showMessageError(error.message);
}

