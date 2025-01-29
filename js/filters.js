import { createGallery } from './create-gallery.js';
import { debounce } from './util.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

let dataPhotos = [];
let chooseFilter = 'filter-default';

const filtersContainer = document.querySelector('.img-filters');


const debounceRender = debounce(createGallery);

// const Filters = {
//   'filter-default': null,
//   'filter-random': function(items) {
//     return items.slice().sort(() => Math.random() - 0.5).slice(0, 10);
//   },
//   'filter-discussed': function(items) {
//     return items.slice().sort((a, b) => a.comments.length - b.comments.length);
//   }
// };


// function getFilterData (data, filter = null) {
//   return filter ? filter(data) : data;
// }
// let chooseFilter = null;

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

function getFilterData() {
  let filterPhotos = [];
  switch (chooseFilter) {
    case 'filter-random':
      filterPhotos = dataPhotos.slice().sort(() => Math.random() - 0.5).slice(0, 10);
      break;
    case 'filter-discussed':
      filterPhotos = dataPhotos.slice().sort((a, b) => a.comments.length - b.comments.length);
      break;
    default:
      filterPhotos = dataPhotos;
  }
  debounceRender(filterPhotos);
}

const createFilterGallery = function (data) {
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterChange);
  dataPhotos = data;
};

export { createFilterGallery };
