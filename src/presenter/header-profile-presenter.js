import { render } from '../framework/render.js';
import HeaderProfileView from '../view/header-profile-view.js';

export default class HeaderProfilePresenter {
  #container = null;
  #filmsModel = null;
  #headerProfileComponent = null;

  constructor(container, filmsMdel) {
    this.#container = container;
    this.#filmsModel = filmsMdel;
  }

  init = () => {
    this.#headerProfileComponent = new HeaderProfileView();
    render(this.#headerProfileComponent, this.#container);
  };
}
