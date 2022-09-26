import FilmsListView from '../view/films-list-view.js';
import ListCardsView from '../view/list-cards-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { FILM_COUNT_PER_STEP, FilterType, SortingFiltersType, UpdateType, UserAction } from '../const.js';
import FilmCardPresenter from './film-card-presenter.js';
import ShowMoreButtonPresenter from './show-more-botton-presenter.js';
import { sortByDate, sortByRate } from '../utils/utils.js';
import { filter } from '../utils/filter.js';
import FilmDetailsPresenter from './film-details-presenter.js';
import NoFilmsView from '../view/nofilms-view.js';
import SortFilltersMenuView from '../view/sort-fillters-menu-view.js';

export default class FilmsListPresenter {
  #sortComponent = null;
  #listCardsView = new ListCardsView();
  #filmsListComponent = new FilmsListView();
  #noFilmComponent = null;
  #container = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;

  #renderedFilmCount = 0; //FILM_COUNT_PER_STEP;
  #showMoreBottonPresenter = null;
  #selectedFilm = null;
  #currentSortType = SortingFiltersType.DEFAULT;
  #filterType = FilterType.ALL;
  #filmCardPresenters = new Map();
  #filmDetailsPresenter = null;


  constructor(filmsListContainer, filmsModel, commentsModel, filterModel) {
    this.#container = filmsListContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.get();
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);
    switch (this.#currentSortType) {
      case SortingFiltersType.DATE:
        return filteredFilms.sort(sortByDate);
      case SortingFiltersType.RATING:
        return filteredFilms.sort(sortByRate);
    }
    return filteredFilms;
  }


  init = () => {

    this.#renderBoard();
    this.#showMoreFilmCards();
  };

  #handleViewAction = (actionType, updateType, updateFilm, updateComment) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.update(updateType, updateFilm);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.add(updateType, updateComment);
        this.#filmDetailsPresenter.clearViewData();
        this.#filmsModel.update(updateType, updateFilm);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.delete(updateType, updateComment);
        this.#filmsModel.update(updateType, updateFilm);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {

    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#filmCardPresenters.get(data.id)) {
          this.#filmCardPresenters.get(data.id).init(data, this.#commentsModel.get(data));
        }
        if (this.#filmDetailsPresenter) {
          this.#selectedFilm = data;
          this.#renderFilmDetails();
        }
        if (this.#filterModel.get() !== FilterType.ALL) {
          this.#handleModelEvent(UpdateType.MINOR, data);
        }
        break;
      case UpdateType.MINOR:
        this.#clearFilmList();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmList({ resetRenderedFilmCount: true, resertSortType: true });
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmList({ resetRenderedTaskCount: true });
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortFilltersMenuView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #renderFilm = (film) => {
    const comments = this.#commentsModel.get(film);
    const filmCardPresenter = new FilmCardPresenter(
      this.#listCardsView.element,
      this.#handleViewAction,
      this.#addFilmDetailsComponent,
      this.#onKeyDown);
    filmCardPresenter.init(film, comments);
    this.#filmCardPresenters.set(film.id, filmCardPresenter);
  };

  #renderFilmDetails() {
    const comments = [...this.#commentsModel.get(this.#selectedFilm)];
    if (!this.#filmDetailsPresenter) {
      this.#filmDetailsPresenter = new FilmDetailsPresenter(
        this.#container.parentNode,
        this.#removeFilmDetailsComponent,
        this.#handleViewAction,
        this.#onKeyDown
      );
    } else {
      this.#filmDetailsPresenter.destroy();
    }
    this.#filmDetailsPresenter.init(this.#selectedFilm, comments, this.#commentsModel.length);
  }

  #renderNoFilms() {
    this.#noFilmComponent = new NoFilmsView(this.#filterType);
    render(this.#noFilmComponent, this.#container.children[2]);

  }

  #removeShowMoreButtonElement = () => {
    if (this.#showMoreBottonPresenter) {
      this.#showMoreBottonPresenter.remove();
    }
  };

  #addFilmDetailsComponent = (film) => {
    if (this.#selectedFilm && this.#selectedFilm.id === film.id) {
      return;
    }

    if (this.#selectedFilm && this.#selectedFilm.id !== film.id) {
      this.#removeFilmDetailsComponent();
    }
    this.#selectedFilm = film;
    this.#renderFilmDetails();

    document.body.classList.add('hide-overflow');
  };

  #clearFilmList = ({ resetRenderedFilmCount = false, resertSortType = false } = {}) => {
    this.#filmCardPresenters.forEach((card) => card.destroy());
    this.#filmCardPresenters.clear();
    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    }

    remove(this.#sortComponent);
    this.#removeShowMoreButtonElement();

    if (this.#noFilmComponent) {
      remove(this.#noFilmComponent);
    }
    if (resertSortType) {
      this.#currentSortType = SortingFiltersType.DEFAULT;
    }
  };

  #removeFilmDetailsComponent = () => {
    if (this.#filmDetailsPresenter) {
      this.#filmDetailsPresenter.destroy();
      this.#filmDetailsPresenter = null;
      this.#selectedFilm = null;
    }
    document.body.classList.remove('hide-overflow');
  };

  #onKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onKeyDown);
    }
  };

  #showMoreFilmCards = () => {
    this.#removeShowMoreButtonElement();
    const filmsCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmsCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);
    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderedFilmCount;
    if (filmsCount > this.#renderedFilmCount) {
      this.#renderShowMoreButtonElement();
    }
  };

  #renderShowMoreButtonElement = () => {
    if (!this.#showMoreBottonPresenter) {
      this.#showMoreBottonPresenter = new ShowMoreButtonPresenter(this.#filmsListComponent.element, this.#showMoreFilmCards);
    }
    this.#showMoreBottonPresenter.init();
  };

  #renderBoard = () => {
    const filmsCount = this.films.length;

    if (filmsCount === 0) {
      this.#renderNoFilms(this.#filterType);
      return;
    }
    this.#renderSort();
    // debugger;
    const renderedCards = this.films.slice(0, Math.min(this.#renderedFilmCount, filmsCount));
    this.#renderFilms(renderedCards);
    render(this.#filmsListComponent, this.#container);
    render(this.#listCardsView, this.#filmsListComponent.element);

    if (filmsCount > this.#renderedFilmCount) {
      this.#renderShowMoreButtonElement();
    } else {
      this.#removeShowMoreButtonElement();

    }
  };
}
