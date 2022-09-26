import FilmDetailsView from '../view/film-details-view';
import { render } from '../framework/render.js';
import { UserAction, UpdateType } from '../const';
import dayjs from 'dayjs';

export default class FilmDetailsPresenter {
  #filmDetailsViewComponent = null;
  #container = null;
  #comments = null;
  #film = null;
  #closeBtnClickHandler = null;
  #closeButtonDetailsElement = null;
  #totalCommentsAmount = null;
  #viewData = {
    emotion: null,
    comment: null,
    scrollPosition: 0
  };

  #changeData = null;

  constructor(container, closeBtnClickHandler, handleViewAction) {
    this.#container = container;
    this.#closeBtnClickHandler = closeBtnClickHandler;
    this.#changeData = handleViewAction;
  }

  init = (film, comments, totalCommentsAmount) => {

    this.#comments = comments;
    this.#film = film;
    this.#totalCommentsAmount = totalCommentsAmount;
    const prevFilmDetailsViewComponent = this.#filmDetailsViewComponent;

    this.#filmDetailsViewComponent = new FilmDetailsView(
      this.#film,
      this.#comments,
      this.#viewData,
      this.#updateViewData
    );

    this.#setHandlers();

    if (prevFilmDetailsViewComponent === null) {
      render(this.#filmDetailsViewComponent, this.#container);
    }
    this.#filmDetailsViewComponent.setScrollPosition();
  };

  #setHandlers = () => {
    document.addEventListener('keydown', this.#onKeyDown);
    this.#closeButtonDetailsElement = this.#filmDetailsViewComponent.element.querySelector('.film-details__close-btn');
    this.#closeButtonDetailsElement.addEventListener('click', () => {
      this.#closeBtnClickHandler();
      document.removeEventListener('keydown', this.#onKeyDown);
    });
    this.#filmDetailsViewComponent.setWatchlistBtnClickHandler(this.#watchlistBtnClickHandler);
    this.#filmDetailsViewComponent.setWatchedBtnClickHandler(this.#watchedBtnClickHandler);
    this.#filmDetailsViewComponent.setFavoriteBtnClickHandler(this.#favoriteBtnClickHandler);
    this.#filmDetailsViewComponent.setCommentDeleteClickHandler(this.#commentDeleteClickHandler);


  };


  destroy = () => {
    if (this.#filmDetailsViewComponent) {
      this.#filmDetailsViewComponent.element.remove();
      this.#filmDetailsViewComponent = null;
    }
  };

  #onKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      document.removeEventListener('keydown', this.#onKeyDown);
      this.destroy();
    } else {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        this.#filmDetailsViewComponent.updateCommentData();
        if (this.#viewData.comment) {
          this.#commentAddClickHandler();
        }
      }
    }
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

  clearViewData = () => {
    this.#viewData.comment = null;
    this.#viewData.emotion = null;
  };

  #commentAddClickHandler = () => {
    const newCommentId = (1 + this.#totalCommentsAmount).toString();
    const newComment = {
      id: newCommentId,
      author: 'Ivan',
      comment: this.#viewData.comment,
      emotion: this.#viewData.emotion,
      date: dayjs().format(),
    };

    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      {
        ...this.#film,
        comments: [
          ...this.#film.comments.concat(newCommentId)
        ]
      },
      newComment
    );

  };

  #commentDeleteClickHandler = (commentId) => {
    const filmCommentIdIndex = this.#film.comments
      .findIndex((filmCommentId) => filmCommentId === commentId);

    const deletedComment = this.#comments
      .find((comment) => comment.id === commentId);

    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {
        ...this.#film,
        comments: [
          ...this.#film.comments.slice(0, filmCommentIdIndex),
          ...this.#film.comments.slice(filmCommentIdIndex + 1)
        ]
      },
      deletedComment
    );
  };

  #updateViewData = (viewData) => {
    this.#viewData = { ...viewData };
  };
}
