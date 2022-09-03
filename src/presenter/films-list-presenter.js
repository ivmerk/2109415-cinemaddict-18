import FilmsListView from '../view/films-list-view.js';
import ListCardsView from '../view/list-cards-view.js';
import { render } from '../framework/render.js';
import { FILM_COUNT, FILM_COUNT_PER_STEP } from '../const.js';
import FilmCardPresenter from './film-card-presenter.js';
import ShowMoreButtonPresenter from './show-more-botton-presenter.js';

export default class FilmsListPresenter {
  #listCardsView = new ListCardsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #films = [];
  #renderedFilmCount = 0;
  #showMoreBottonPresenter = null;

  constructor(filmsListContainer, filmsModel, commentsModel) {
    this.#filmsListContainer = filmsListContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {

    this.#films = [...this.#filmsModel.get()];
    render(this.#filmsListComponent, this.#filmsListContainer);
    render(this.#listCardsView, this.#filmsListComponent.element);

    this.showMoreFilmCards();

  };

  #renderFilm = (film) => {
    const comments = this.#commentsModel.get(film);
    const filmCardPreseter = new FilmCardPresenter(this.#listCardsView.element);
    filmCardPreseter.init(film, comments);
  };

  #removeShowMoreButtonElement = () => {
    if (this.#showMoreBottonPresenter) {
      this.#showMoreBottonPresenter.remove();
    }
  };

  showMoreFilmCards = () => {
    this.#removeShowMoreButtonElement();
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;
    this.#films.slice(this.#renderedFilmCount - FILM_COUNT_PER_STEP, this.#renderedFilmCount).forEach((film) => {
      this.#renderFilm(film);
    });
    this.#renderShowMoreButtonElement();
  };

  closeFilmDetailsView = () => {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
  };

  #renderShowMoreButtonElement = () => {
    if (this.#renderedFilmCount < FILM_COUNT) {
      if (!this.#showMoreBottonPresenter) {
        this.#showMoreBottonPresenter = new ShowMoreButtonPresenter(this.#filmsListComponent.element);
        this.#showMoreBottonPresenter.init();
      }
      this.#showMoreBottonPresenter.init();
    }
  };
}
