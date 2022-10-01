import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import { UserAction, UpdateType } from '../const';

export default class FilmCardPresenter {
  #filmCardViewComponent = null;
  #container = null;
  #film = null;
  #clickCardHandler = null;
  #escKeyDownHandler = null;
  isPopup = false;
  #changeData = null;
  id = null;

  constructor(container, changeData, clickCardHandler, escKeyDownHandler) {
    this.#container = container;
    this.#changeData = changeData;
    this.#clickCardHandler = clickCardHandler;
    this.#escKeyDownHandler = escKeyDownHandler;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmCardComponent = this.#filmCardViewComponent;

    this.#filmCardViewComponent = new FilmCardView(film);
    this.id = this.#film.id;
    this.#setHandles();

    if (prevFilmCardComponent === null) {
      render(this.#filmCardViewComponent, this.#container);
    } else {
      replace(this.#filmCardViewComponent, prevFilmCardComponent);
    }
  };

  #setHandles = () => {
    this.#filmCardViewComponent.setCardClickHandler(() => {
      this.#clickCardHandler(this.#film);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    });
    this.#filmCardViewComponent.setWatchlistBtnClickHandler(this.#watchlistBtnClickHandler);
    this.#filmCardViewComponent.setWatchedBtnClickHandler(this.#watchedBtnClickHandler);
    this.#filmCardViewComponent.setFavoriteBtnClickHandler(this.#favoriteBtnClickHandler);
  };

  setSaving = () => {
    this.#filmCardViewComponent.updateElement({
      isDisabled: true,
    });
  };

  setAborting = () => {
    // debugger
    this.#filmCardViewComponent.updateElement({ isDisabled: false });
    this.#filmCardViewComponent.shakeControls();
  };

  #watchlistBtnClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {
        ...this.#film, userDetails: {
          ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist
        },
      }
    );
  };

  #watchedBtnClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {
        ...this.#film, userDetails: {
          ...this.#film.userDetails, watched: !this.#film.userDetails.watched
        },
      }
    );
  };

  #favoriteBtnClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {
        ...this.#film, userDetails: {
          ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite
        },
      }
    );
  };

  destroy = () => {
    remove(this.#filmCardViewComponent);
  };

}
