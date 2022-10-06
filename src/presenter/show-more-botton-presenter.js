import ShowMoreButtonView from '../view/show-more-botton-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class ShowMoreButtonPresenter {
  #showMoreFilmsButtonComponent = null;
  #showMoreFilmsButtonContainer = null;
  #showMoreFilmCards = null;

  constructor(container, showMoreFilmCards) {
    this.#showMoreFilmsButtonContainer = container;
    this.#showMoreFilmsButtonComponent = new ShowMoreButtonView();
    this.#showMoreFilmCards = showMoreFilmCards;
  }

  init = () => {
    render(this.#showMoreFilmsButtonComponent, this.#showMoreFilmsButtonContainer, RenderPosition.BEFOREEND);
    this.#showMoreFilmsButtonComponent.setClickHandler(this.#filmButtonMoreClickHandler);
  };

  #filmButtonMoreClickHandler = () => {
    this.#showMoreFilmCards();
  };


  remove = () => {
    this.#showMoreFilmsButtonComponent.element.remove();
    this.#showMoreFilmsButtonComponent.removeElement();
  };
}
