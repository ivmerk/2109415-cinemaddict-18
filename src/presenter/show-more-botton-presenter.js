import ShowMoreButtonView from '../view/show-more-botton-view.js';
import { render } from '../framework/render.js';
import { FILM_COUNT, FILM_COUNT_PER_STEP } from '../const.js';
import FilmsListPresenter from './films-list-presenter.js';

export default class ShowMoreButtonPresenter {
  #renderedFilmCount = FILM_COUNT_PER_STEP;
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
    // this.#films.slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP).forEach((film) => {
    //   this.#renderFilm(film, this.#listCardsView.element);
    // });
    // this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    // if (this.#renderedFilmCount >= this.#films.length) {
    //   this.#showMoreFilmsButtonComponent.element.remove();
    //   this.#showMoreFilmsButtonComponent.removeElement();

    // }
  };
}
