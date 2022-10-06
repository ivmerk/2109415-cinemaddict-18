import { render, replace } from '../framework/render.js';
import HeaderProfileView from '../view/header-profile-view.js';
import { FilterType } from '../const.js';
import { filter } from '../utils/filter.js';

export default class HeaderProfilePresenter {
  #container = null;
  #filmsModel = null;
  #headerProfileComponent = null;

  constructor(container, filmsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {

    const wathchiedFilmsCount = filter[FilterType.HISTORY](this.#filmsModel.films).length;
    const prevHeaderProfileComponent = this.#headerProfileComponent;

    this.#headerProfileComponent = new HeaderProfileView(wathchiedFilmsCount);

    if (prevHeaderProfileComponent === null) {
      render(this.#headerProfileComponent, this.#container);
    } else {
      replace(this.#headerProfileComponent, prevHeaderProfileComponent);
    }
  };

  #handleModelEvent = () => {
    this.init();
  };
}
