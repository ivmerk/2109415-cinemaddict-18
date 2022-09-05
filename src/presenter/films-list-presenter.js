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
  #filmCardPresenters = [];

  constructor(filmsListContainer, filmsModel, commentsModel) {
    this.#filmsListContainer = filmsListContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {

    this.#films = [...this.#filmsModel.get()];
    render(this.#filmsListComponent, this.#filmsListContainer);
    render(this.#listCardsView, this.#filmsListComponent.element);

    this.#showMoreFilmCards();

  };

  #renderFilm = (film) => {
    const comments = this.#commentsModel.get(film);
    const filmCardPresenter = new FilmCardPresenter(this.#listCardsView.element, this.#closeFilmDetailsView);
    filmCardPresenter.init(film, comments);
    this.#filmCardPresenters.push(filmCardPresenter);
  };

  #removeShowMoreButtonElement = () => {
    if (this.#showMoreBottonPresenter) {
      this.#showMoreBottonPresenter.remove();
    }
  };

  #showMoreFilmCards = () => {
    this.#removeShowMoreButtonElement();
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;
    this.#films.slice(this.#renderedFilmCount - FILM_COUNT_PER_STEP, this.#renderedFilmCount).forEach((film) => {
      this.#renderFilm(film);
    });
    this.#renderShowMoreButtonElement();
  };

  #closeFilmDetailsView = () => {
    const previsionFilmDetailsView = this.#filmCardPresenters.find((presenter) => (presenter.isPopup === true));
    if (previsionFilmDetailsView) {
      previsionFilmDetailsView.removeFilmDetailsPresenter();
    }
  };

  #renderShowMoreButtonElement = () => {
    if (this.#renderedFilmCount < FILM_COUNT) {
      if (!this.#showMoreBottonPresenter) {
        this.#showMoreBottonPresenter = new ShowMoreButtonPresenter(this.#filmsListComponent.element, this.#showMoreFilmCards);
      }
      this.#showMoreBottonPresenter.init();
    }
  };
}
