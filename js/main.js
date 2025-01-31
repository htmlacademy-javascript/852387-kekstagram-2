import { createGallery } from './create-gallery.js';
import { createFilterGallery } from './filters.js';
import { savePhotos } from './picture-modal.js';
import { showMessageError } from './util.js';
import { getData } from './api.js';

const filtersContainer = document.querySelector('.img-filters');

try {
  const photos = await getData ();
  createGallery(photos);
  savePhotos(photos);
  createFilterGallery(photos);
  filtersContainer.classList.remove('img-filters--inactive');
} catch (error) {
  showMessageError(error.message);
}

