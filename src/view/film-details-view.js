import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createFilmDetailsControlTemplate, createFilmDetailsTopTemplate } from './film-details-top-template.js';
import { createFilmDetailsCommentsTemplate } from './film-details-comments-template.js';
import { createFilmDetailsFormTemplate } from './film-details-form-template.js';


const createFilmDetailsTemplate = ({ filmInfo, comments, userDetails, checkedEmotion, comment }) =>
  `<section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        ${createFilmDetailsTopTemplate(filmInfo, userDetails)}
        ${createFilmDetailsControlTemplate(userDetails)}
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      ${createFilmDetailsCommentsTemplate(comments)}
      ${createFilmDetailsFormTemplate(checkedEmotion, comment)}

          </section>
        </div>
      </div>
    </div>
    </section>
    `;


export default class FilmDetailsView extends AbstractStatefulView {

  constructor(film, comments, viewData, updateViewData) {
    super();
    this._state = FilmDetailsView.parseFilmToState(
      film,
      comments,
      viewData.emotion,
      viewData.comment,
      viewData.scrollPosition
    );
    this.updateViewData = updateViewData;
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.setScrollPosition();
    this.#setInnerHandlers();
    this.setCloseBtnClickHandler(this._callback.closeBtnClick);
    this.setWatchlistBtnClickHandler(this._callback.watchlistBtnClick);
    this.setWatchedBtnClickHandler(this._callback.watchedBtnClick);
    this.setFavoriteBtnClickHandler(this._callback.favoriteBtnClick);
    this.setCommentDeleteClickHandler(this._callback.commentDeleteClick);
  };

  setScrollPosition = () => {
    this.element.scrollTop = this._state.scrollPosition;
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
    this.#updateViewData();
    this._callback.commentDeleteClick(evt.currentTarget.dataset.commentId);
  };

  #emotionClickHendler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      checkedEmotion: evt.currentTarget.dataset.emotionType,
      scrollPosition: this.element.scrollTop
    });
  };

  #commentInputChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({ comment: evt.target.value });
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-label').forEach((element) => { element.addEventListener('click', this.#emotionClickHendler); });
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputChangeHandler);
  };

  updateCommentData = () => {
    this.#updateViewData();
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


  static parseFilmToState = (
    film,
    comments,
    checkedEmotion = null,
    comment = null,
    scrollPosition = 0
  ) => ({
    ...film,
    comments,
    checkedEmotion,
    comment,
    scrollPosition
  });
}
