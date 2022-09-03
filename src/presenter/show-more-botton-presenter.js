import ShowMoreButtonView from '../view/show-more-botton-view.js';
import { render } from '../framework/render.js';
import { filmsListPresenter } from '../main.js';

export default class ShowMoreButtonPresenter {
  #showMoreFilmsButtonComponent = null;
  #showMoreFilmsButtonContainer = null;

  constructor(container) {
    this.#showMoreFilmsButtonContainer = container;
    this.#showMoreFilmsButtonComponent = new ShowMoreButtonView();
  }

  init = () => {
    render(this.#showMoreFilmsButtonComponent, this.#showMoreFilmsButtonContainer);
    this.#showMoreFilmsButtonComponent.setClickHandler(this.#filmButtonMoreClickHandler);
  };

  #filmButtonMoreClickHandler = () => {
    filmsListPresenter.showMoreFilmCards();
  };


  remove = () => {
    this.#showMoreFilmsButtonComponent.element.remove();
    this.#showMoreFilmsButtonComponent.removeElement();
  };
}
