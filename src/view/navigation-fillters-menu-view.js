import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;
  return (
    `<a
    href="#${type}"
    id="filter__${type}"
    data-filter-type="${type}"
    class="main-navigation__item
    ${type === currentFilterType ? 'main-navigation__item--active' : ''}">
    ${name}
    ${type !== 'all' ? `<span class="main-navigation__item-count">${count}</span>` : ''}
    </a>
  `);
};

const createFilltersMenuTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return `<nav class="main-navigation">
    ${filterItemsTemplate}
  </nav>`;
};

export default class NavigationFilltersMenuView extends AbstractView {
  #filter = null;
  #currentFilterType = null;

  constructor(filter, currentFilterType) {
    super();
    this.#filter = filter;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilltersMenuTemplate(this.#filter, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  };
}
