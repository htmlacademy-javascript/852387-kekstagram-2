//import { gallery } from './gallery.js';
import { createGallery } from './create-gallery.js';
import './picture-modal.js';
import './form.js';

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    createGallery(photos);
  });
