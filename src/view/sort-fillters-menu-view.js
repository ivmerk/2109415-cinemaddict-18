import AbstractView from '../framework/view/abstract-view';
import { SortingFiltersType } from '../const.js';

const createFilltersMenuTemplate = (currentSortType) => (
  `<ul class="sort">
<li><a href="#" class="sort__button ${currentSortType === SortingFiltersType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortingFiltersType.DEFAULT}">Sort by default</a></li>
<li><a href="#" class="sort__button ${currentSortType === SortingFiltersType.DATE ? 'sort__button--active' : ''}" data-sort-type="${SortingFiltersType.DATE}">Sort by date</a></li>
<li><a href="#" class="sort__button ${currentSortType === SortingFiltersType.RATING ? 'sort__button--active' : ''}" data-sort-type="${SortingFiltersType.RATING}">Sort by rating</a></li>
`
);

export default class SortFilltersMenuView extends AbstractView {

  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createFilltersMenuTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

}
