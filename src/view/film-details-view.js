import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createFilmDetailsControlTemplate, createFilmDetailsTopTemplate } from './film-details-top-template.js';
import { createFilmDetailsCommentsTemplate } from './film-details-comments-template.js';
import { createFilmDetailsFormTemplate } from './film-details-form-template.js';


const createFilmDetailsTemplate = ({ filmInfo, comments, userDetails, checkedEmotion, comment, isDisabled, isDeleting, deletedComment }) =>
  `<section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        ${createFilmDetailsTopTemplate(filmInfo, userDetails, isDisabled)}
        ${createFilmDetailsControlTemplate(userDetails, isDisabled)}
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      ${createFilmDetailsCommentsTemplate(comments, isDeleting, deletedComment)}
      ${createFilmDetailsFormTemplate(checkedEmotion, comment, isDisabled)}

          </section>
        </div>
      </div>
    </div>
    </section>
    `;


export default class FilmDetailsView extends AbstractStatefulView {

  constructor(film, comments, viewData, updateViewData, isFilmLoadingError, isCommentLoadingError,) {
    super();
    this._state = FilmDetailsView.parseFilmToState(
      film,
      comments,
      viewData.emotion,
      viewData.comment,
      viewData.scrollPosition,
      isFilmLoadingError,
      isCommentLoadingError,
    );

    this.updateViewData = updateViewData;

    if (!isCommentLoadingError) {
      this.#setInnerHandlers();
    }
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.setScrollPosition();
    this.setCloseBtnClickHandler(this._callback.closeBtnClick);
    this.setWatchlistBtnClickHandler(this._callback.watchlistBtnClick);
    this.setWatchedBtnClickHandler(this._callback.watchedBtnClick);
    this.setFavoriteBtnClickHandler(this._callback.favoriteBtnClick);

    if (!this._state.isCommentLoadingError) {
      this.#setInnerHandlers();
      this.setCommentDeleteClickHandler(this._callback.commentDeleteClick);
    }
  };


  setWatchlistBtnClickHandler = (cb) => {
    this._callback.watchlistBtnClick = cb;
    this.element.children[0].querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistBtnClickHandler);

  };

  setWatchedBtnClickHandler = (cb) => {
    this._callback.watchedBtnClick = cb;
    this.element.children[0].querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedBtnClickHandler);
  };

  setFavoriteBtnClickHandler = (cb) => {
    this._callback.favoriteBtnClick = cb;
    this.element.children[0].querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteBtnClickHandler);
  };

  setCommentDeleteClickHandler(cb) {
    const commentDeleteElement = this.element.querySelectorAll('.film-details__comment-delete');
    if (commentDeleteElement) {
      this._callback.commentDeleteClick = cb;
      commentDeleteElement.forEach(
        (element) =>
          element.addEventListener('click', this.#commentDeleteClickHandler)
      );
    }
  }

  #watchlistBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.watchlistBtnClick();
  };

  #watchedBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.watchedBtnClick();
  };

  #favoriteBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.favoriteBtnClick();
  };

  #commentDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      scrollPosition: this.element.scrollTop
    });
    this.#updateViewData();
    this._callback.commentDeleteClick(evt.currentTarget.dataset.commentId);
  };

  #emotionClickHendler = (evt) => {
    if (this._state.isDisable) {
      return;
    }
    evt.preventDefault();
    this.updateElement({
      checkedEmotion: evt.currentTarget.dataset.emotionType,
      scrollPosition: this.element.scrollTop
    });
  };

  #commentInputChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      comment: evt.target.value,
      scrollPosition: this.element.scrollTop
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-label').forEach((element) => { element.addEventListener('click', this.#emotionClickHendler); });
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputChangeHandler);
  };


  setCloseBtnClickHandler(callback) {
    this._callback.closeBtnClick = callback;
  }

  #updateViewData = () =>
    this.updateViewData({
      emotion: this._state.checkedEmotion,
      comment: this._state.comment,
      scrollPosition: this.element.scrollTop
    });


  shakeControls = () => {
    const controlElement = this.element.querySelector('.film-details__controls');
    this.shakeAbsolute.call({ element: controlElement });
  };

  shakeNewCommentForm = () => {
    const newCommentFormElement = this.element.querySelector('.film-details__new-comment');
    this.shakeAbsolute.call({ element: newCommentFormElement });
  };

  shakeDeleting = (commentId) => {
    const listOfComments = Array.prototype.slice.call(this.element.querySelectorAll('.film-details__comment-delete'));
    const commentElement = listOfComments.find((comment) => comment.dataset.commentId === commentId);
    const sheckedElement = commentElement.parentNode.parentNode.parentNode;
    this.shakeAbsolute.call({ element: sheckedElement });
  };

  setScrollPosition = () => {
    this.element.scrollTop = this._state.scrollPosition;
  };

  updateCommentData = () => {
    this.#updateViewData();
  };

  static parseFilmToState = (
    film,
    comments,
    checkedEmotion = null,
    comment = null,
    scrollPosition = 0,
    isFilmLoadingError = false,
    isCommentLoadingError = false,
    isDisabled = false,
    isDeleting = false,
    deletedComment = null,
  ) => ({
    ...film,
    comments,
    checkedEmotion,
    comment,
    scrollPosition,
    isFilmLoadingError,
    isCommentLoadingError,
    isDisabled,
    isDeleting,
    deletedComment
  });
}
