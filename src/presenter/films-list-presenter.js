import ShowMoreButtonView from '../view/show-more-botton-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsListView from '../view/films-list-view.js';
import ListCardsView from '../view/list-cards-view.js';
import { render } from '../render.js';
import FilmDetailsView from '../view/film-details-view.js';
import { FILM_COUNT, FILM_COUNT_PER_STEP } from '../const.js';


export default class FilmsListPresenter {
  #listCardsView = new ListCardsView();
  #filmsListComponent = new FilmsListView();
  #showMoreFilmsButtonComponent = new ShowMoreButtonView();
  #filmDetailsComponent = null;
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

  init = () => {
    this.#films = [...this.#filmsModel.get()];

    render(this.#filmsListComponent, this.#filmsListContainer);
    render(this.#listCardsView, this.#filmsListComponent.element);

    this.#films.slice(0, this.#renderedFilmCount).forEach((film) => {
      this.#renderFilm(film, this.#listCardsView.element);
    });
    if (this.#renderedFilmCount < FILM_COUNT) {
      render(this.#showMoreFilmsButtonComponent, this.#filmsListComponent.element);
      this.#showMoreFilmsButtonComponent.setClickHandler(this.#filmButtonMoreClickHandler);
      // this.#showMoreFilmsButtonComponent.element.addEventListener('click', this.#filmButtonMoreClickHandler);
    }
  };

  #renderFilm = (film, container) => {
    const commentsCount = [this.#commentsModel.get(film)].length;
    const filmCardComponent = new FilmCardView(film, commentsCount);

    filmCardComponent.setCardClickHandler(this.#filmCardClickHandler);

    // const linkFilmCardElement = filmCardComponent.element.querySelector('a');
    // linkFilmCardElement.addEventListener('click', () => {
    //   this.#addFilmDetailsComponent(film);
    //   document.addEventListener('keydown', this.#onEscKeyDown);
    // });
    render(filmCardComponent, container);
  };

  #filmCardClickHandler = (film) => {
    this.#addFilmDetailsComponent(film);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #renderFilmDetails = (film) => {
    const comments = [...this.#commentsModel.get(this.#films[0])];
    const siteBodyElement = document.querySelector('body');
    this.#filmDetailsComponent = new FilmDetailsView(film, comments);
    const closeButtonDetailsElement = this.#filmDetailsComponent.element.querySelector('.film-details__close-btn');

    closeButtonDetailsElement.addEventListener('click', () => {
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });
    render(this.#filmDetailsComponent, siteBodyElement);
  };

  #addFilmDetailsComponent = (film) => {
    this.#renderFilmDetails(film);
    document.body.classList.add('hide-overflow');
  };

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent = null;
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #filmButtonMoreClickHandler = () => {
    this.#films.slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP).forEach((film) => {
      this.#renderFilm(film, this.#listCardsView.element);
    });

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreFilmsButtonComponent.element.remove();
      this.#showMoreFilmsButtonComponent.removeElement();

    }
  };
}
