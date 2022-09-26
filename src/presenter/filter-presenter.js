import { render, replace, remove } from '../framework/render.js';
import { FilterType, UpdateType } from '../const.js';
import { filter } from '../utils/filter.js';
import NavigationFilltersMenuView from '../view/navigation-fillters-menu-view.js';

export default class FilterPresenter {

  #filterContainer = null;
  #filterModel = null;
  #filmsModel = null;

  #filterViewComponent = null;

  constructor(filterContainer, filterModel, filmsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

  }

  get filters() {
    const films = this.#filmsModel.films;
    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterViewComponent;

    this.#filterViewComponent = new NavigationFilltersMenuView(filters, this.#filterModel.filter);
    this.#filterViewComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterViewComponent, this.#filterContainer);
    } else {
      replace(this.#filterViewComponent, prevFilterComponent);
      remove(prevFilterComponent);
    }
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.get() === filterType) {
      return;
    }

    this.#filterModel.set(UpdateType.MAJOR, filterType);

  };

  #handleModelEvent = () => {
    this.init();
  };
}
