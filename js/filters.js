import { createGallery } from './create-gallery.js';
import { debounce } from './util.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

let dataPhotos = [];
let chooseFilter = 'filter-default';

const filtersContainer = document.querySelector('.img-filters');

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

function onFilterChange (evt) {
  const targetButton = evt.target;
  const activeButton = filtersContainer.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  if (targetButton.matches('button') && activeButton !== targetButton) {
    activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
    targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);

    chooseFilter = targetButton.getAttribute('id');

    getFilterData();
  }
}

const createFilterGallery = function (data) {
  dataPhotos = data;
  filtersContainer.classList.remove(ACTIVE_BUTTON_CLASS);
  filtersContainer.addEventListener('click', onFilterChange);
};

export { createFilterGallery };
