import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { SortingFiltersType } from '../const.js';

const createFilltersMenuTemplate = ({ currentSortType }) => (
  `<ul class="sort">
<li><a href="#" class="sort__button ${currentSortType === SortingFiltersType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortingFiltersType.DEFAULT}">Sort by default</a></li>
<li><a href="#" class="sort__button ${currentSortType === SortingFiltersType.DATE ? 'sort__button--active' : ''}" data-sort-type="${SortingFiltersType.DATE}">Sort by date</a></li>
<li><a href="#" class="sort__button ${currentSortType === SortingFiltersType.RATING ? 'sort__button--active' : ''}" data-sort-type="${SortingFiltersType.RATING}">Sort by rating</a></li>
`
);

export default class SortFilltersMenuView extends AbstractStatefulView {

  constructor(currentSortType) {
    super();
    this._state = SortFilltersMenuView.parseSortToState(currentSortType);

  }

  get template() {
    return createFilltersMenuTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.setSortTypeChangeHandler(this._callback.sortTypeChange);
  };

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

  static parseSortToState = (
    currentSortType,
  ) => ({
    currentSortType,
  });
}
