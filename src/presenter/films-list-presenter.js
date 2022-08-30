import ShowMoreButtonView from '../view/show-more-botton-view.js';
import FilmsListView from '../view/films-list-view.js';
import ListCardsView from '../view/list-cards-view.js';
import { render } from '../framework/render.js';
import { FILM_COUNT, FILM_COUNT_PER_STEP } from '../const.js';
import FilmCardPresenter from './film-card-presenter.js';
import ShowMoreButtonPresenter from './show-more-botton-presenter.js';

export default class FilmsListPresenter {
  #listCardsView = new ListCardsView();
  #filmsListComponent = new FilmsListView();
  #showMoreFilmsButtonComponent = new ShowMoreButtonView();
  #filmsListContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(filmsListContainer, filmsModel, commentsModel) {
    this.#filmsListContainer = filmsListContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = (cardsQtt = this.#renderedFilmCount) => {
    this.#films = [...this.#filmsModel.get()];

    render(this.#filmsListComponent, this.#filmsListContainer);
    render(this.#listCardsView, this.#filmsListComponent.element);

    this.#films.slice(0, cardsQtt).forEach((film) => {
      this.#renderFilm(film);
    });
    debugger;
    if (cardsQtt < FILM_COUNT) {
      // render(this.#showMoreFilmsButtonComponent, this.#filmsListComponent.element);
      // this.#showMoreFilmsButtonComponent.setClickHandler(this.#filmButtonMoreClickHandler);
      const showMoreBottonPresenter = new ShowMoreButtonPresenter(this.#filmsListComponent.element);
      showMoreBottonPresenter.init();
    }
  };

  #renderFilm = (film) => {
    const comments = this.#commentsModel.get(film);
    const filmCardPreseter = new FilmCardPresenter(this.#listCardsView.element);
    filmCardPreseter.init(film, comments);

  };

}
