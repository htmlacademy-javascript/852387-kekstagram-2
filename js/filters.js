import { createGallery } from './create-gallery.js';
import { debounce } from './util.js';
import { ACTIVE_BUTTON_CLASS } from './const.js';

const filtersContainer = document.querySelector('.img-filters');

let dataPhotos = [];
let chooseFilter = 'filter-default';

const debounceRender = debounce(createGallery);

const getFilterData = () => {
  let filterPhotos = [];
  switch (chooseFilter) {
    case 'filter-random':
      filterPhotos = dataPhotos.slice().sort(() => Math.random() - 0.5).slice(0, 10);
      break;
    case 'filter-discussed':
      filterPhotos = dataPhotos.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      filterPhotos = dataPhotos;
  }
  debounceRender(filterPhotos);
};

const onFilterChange = (evt) => {
  const targetButton = evt.target;
  const activeButton = filtersContainer.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  if (targetButton.matches('button') && activeButton !== targetButton) {
    activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
    targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);

    chooseFilter = targetButton.getAttribute('id');

    getFilterData();
  }
};

const createFilterGallery = function (data) {
  dataPhotos = data;
  filtersContainer.classList.remove(ACTIVE_BUTTON_CLASS);
  filtersContainer.addEventListener('click', onFilterChange);
};

export { createFilterGallery };
