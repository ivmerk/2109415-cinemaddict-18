import FilmsListView from '../view/films-list-view.js';
import ListCardsView from '../view/list-cards-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { FILM_COUNT_PER_STEP, FilterType, SortingFiltersType, UpdateType, UserAction } from '../const.js';
import FilmCardPresenter from './film-card-presenter.js';
import ShowMoreButtonPresenter from './show-more-botton-presenter.js';
import { sortByComments, sortByDate, sortByRate } from '../utils/utils.js';
import { filter } from '../utils/filter.js';
import FilmDetailsPresenter from './film-details-presenter.js';
import NoFilmsView from '../view/nofilms-view.js';
import SortFilltersMenuView from '../view/sort-fillters-menu-view.js';
import FilmListLoadingView from '../view/film-list-loading-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commendet-view.js';
import FilmsView from '../view/films-view.js';

export default class FilmsListPresenter {
  #sortComponent = null;
  #listCardsView = new ListCardsView();
  #filmsListComponent = new FilmsListView();
  #filmsComponent = new FilmsView();
  #loadingComponent = new FilmListLoadingView();
  #topRatingFilmsViewComponent = new TopRatedView();
  #topCommentedFilmsViewComponent = new MostCommentedView();
  #noFilmComponent = null;

  #container = null;

  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;

  #isCommentLoadingError = false;
  #topRatedFilms = null;
  #topCommentedFilms = null;
  #mostCommentedCardPresenters = [];
  #mostRatedCardPresenters = [];

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #showMoreBottonPresenter = null;
  #selectedFilm = null;
  #currentSortType = SortingFiltersType.DEFAULT;
  #filterType = FilterType.ALL;
  #filmCardPresenters = new Map();
  #filmDetailsPresenter = null;

  #isLoading = true;

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
    this.#topRatedFilms = this.#findTopRatedFilms(films);
    this.#topCommentedFilms = this.#findTopCommentedFilms(films);
    return filteredFilms;
  }

  init = () => {
    this.#renderBoard();
    if (!this.#renderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    }
  };

  #handleViewAction = async (actionType, updateType, updateFilm, updateComment) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        if (this.#filmDetailsPresenter) {
          this.#filmDetailsPresenter.setSaving();
        }
        this.#filmCardPresenters.get(updateFilm.id).setSaving();
        try {
          await this.#filmsModel.update(updateType, updateFilm);
        } catch (err) {
          if (this.#filmDetailsPresenter) {
            this.#filmDetailsPresenter.setAbortingUpdateFilm();
          }
          this.#filmCardPresenters.get(updateFilm.id).setAborting();
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#filmDetailsPresenter.setSaving();
        try {
          await this.#commentsModel.add(updateType, updateComment, updateFilm);
          await this.#filmsModel.update(updateType, updateFilm);
          this.#filmDetailsPresenter.clearViewData();
        } catch (err) {
          this.#filmDetailsPresenter.setAbortingAddComment();
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmDetailsPresenter.setDeleting(updateComment.id);
        try {
          await this.#commentsModel.delete(updateType, updateComment, updateFilm);
          await this.#filmsModel.update(updateType, updateFilm);
        } catch (err) {
          this.#filmDetailsPresenter.setAbortingDeleteComment(updateComment.id);
        }
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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

  #findTopRatedFilms = (films) => {
    const sortedRatedFilms = films.sort(sortByRate);
    return [sortedRatedFilms[0], sortedRatedFilms[1]];

  };

  #findTopCommentedFilms = (films) => {
    const sortedCommentedFilms = films.sort(sortByComments);
    return [sortedCommentedFilms[0], sortedCommentedFilms[1]];
  };

  #renderSort = () => {
    this.#sortComponent = new SortFilltersMenuView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#container);
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #createFilmCardPresenter = (container = this.#listCardsView.element) => {
    const filmCardPresenter = new FilmCardPresenter(
      container,
      this.#handleViewAction,
      this.#addFilmDetailsComponent,
      this.#onKeyDown);
    return filmCardPresenter;
  };

  #renderFilm = (film) => {
    const filmCardPresenter = this.#createFilmCardPresenter();
    filmCardPresenter.init(film);
    this.#filmCardPresenters.set(film.id, filmCardPresenter);
  };

  #renderFilmDetails = async () => {
    let comments = null;
    try {
      comments = await this.#commentsModel.get(this.#selectedFilm);
    } catch (err) {
      this.#isCommentLoadingError = true;
    }
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
    this.#filmDetailsPresenter.init(this.#selectedFilm, comments, this.#isCommentLoadingError);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderNoFilms() {
    this.#noFilmComponent = new NoFilmsView(this.#filterType);
    render(this.#noFilmComponent, this.#filmsListComponent.element, RenderPosition.AFTERBEGIN);

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

    this.#sortComponent.updateElement({ currentSortType: this.#currentSortType });
    this.#removeShowMoreButtonElement();
    remove(this.#loadingComponent);

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

  #renderTopRatedElement = () => {
    if (!this.#topRatingFilmsViewComponent) {
      this.#topRatingFilmsViewComponent = new TopRatedView();
    }
    const mostRatedFilm = this.#topRatedFilms[0];
    const secondRatedFilm = this.#topRatedFilms[1];
    const containerTopRatingFilmsList = this.#topRatingFilmsViewComponent.element.children[1];
    if (mostRatedFilm) {
      this.#mostRatedCardPresenters.push(this.#createFilmCardPresenter(containerTopRatingFilmsList));
      this.#mostRatedCardPresenters[0].init(mostRatedFilm);
    }
    if (secondRatedFilm) {
      this.#mostRatedCardPresenters.push(this.#createFilmCardPresenter(containerTopRatingFilmsList));
      this.#mostRatedCardPresenters[1].init(secondRatedFilm);
    }

    render(this.#topRatingFilmsViewComponent, this.#filmsComponent.element, RenderPosition.BEFOREEND);
  };

  #renderMostCommentedElement = () => {
    if (!this.#topCommentedFilmsViewComponent) {
      this.#topCommentedFilmsViewComponent = new MostCommentedView();
    }

    const mostCommentedFilm = this.#topCommentedFilms[0];
    const secondCommentedFilm = this.#topCommentedFilms[1];
    const containerMostCommendCardsList = this.#topCommentedFilmsViewComponent.element.children[1];
    if (mostCommentedFilm) {
      this.#mostCommentedCardPresenters.push(this.#createFilmCardPresenter(containerMostCommendCardsList));
      this.#mostCommentedCardPresenters[0].init(mostCommentedFilm);
    }
    if (secondCommentedFilm) {

      this.#mostCommentedCardPresenters.push(this.#createFilmCardPresenter(containerMostCommendCardsList));
      this.#mostCommentedCardPresenters[1].init(secondCommentedFilm);
    }
    render(this.#topCommentedFilmsViewComponent, this.#filmsComponent.element, RenderPosition.BEFOREEND);
  };

  #renderBoard = () => {
    render(this.#filmsListComponent, this.#filmsComponent.element, RenderPosition.AFTERBEGIN);
    render(this.#filmsComponent, this.#container);

    if (!this.#sortComponent) {
      this.#renderSort();
    }

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const filmsCount = this.films.length;
    if (filmsCount === 0) {
      this.#renderNoFilms(this.#filterType);
      return;
    }
    const renderedCards = this.films.slice(0, Math.min(this.#renderedFilmCount, filmsCount));
    this.#renderFilms(renderedCards);
    render(this.#listCardsView, this.#filmsListComponent.element, RenderPosition.BEFOREBEGIN);

    if (filmsCount > this.#renderedFilmCount) {
      this.#renderShowMoreButtonElement();
    } else {
      this.#removeShowMoreButtonElement();

    }
    this.#renderTopRatedElement();

    this.#renderMostCommentedElement();
  };
}
