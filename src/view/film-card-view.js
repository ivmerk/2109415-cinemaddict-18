import { formatMinutesToTime, formatStringToYear } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createFilmCardControlItemsTemplate = (userDetails, isDisabled) => `
<div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${userDetails.watchlist ? 'film-card__controls-item--active' : ''}" type="button"  ${isDisabled ? 'disabled' : ''}>Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${userDetails.watched ? 'film-card__controls-item--active' : ''}" type="button"  ${isDisabled ? 'disabled' : ''}>Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${userDetails.favorite ? 'film-card__controls-item--active' : ''}" type="button"  ${isDisabled ? 'disabled' : ''} >Mark as favorite</button>
    </div>

`;

const createFilmCardTemplate = ({ filmInfo, comments, userDetails, isDisabled }) =>
  `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${filmInfo.title} </h3>
      <p class="film-card__rating">${filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatStringToYear(filmInfo.release.date)}</span>
        <span class="film-card__duration">${formatMinutesToTime(filmInfo.runtime)}</span>
        <span class="film-card__genre">${filmInfo.genre[0]}</span>
      </p>
      <img src="./${filmInfo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${filmInfo.description}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
   ${createFilmCardControlItemsTemplate(userDetails, isDisabled)}
  </article>`;


export default class FilmCardView extends AbstractStatefulView {


  constructor(film, isFilmLoadingError, isDisabled) {
    super();
    this._state = FilmCardView.parseFilmToState(film, isFilmLoadingError, isDisabled);
  }

  get template() {
    return createFilmCardTemplate(this._state);
  }

  shakeControls = () => {
    const controlElement = this.element.querySelector('.film-card__controls');
    this.shakeAbsolute.call({ element: controlElement });
  };

  _restoreHandlers = () => {
    this.setCardClickHandler(this._callback.cardClick);
    this.setWatchlistBtnClickHandler(this._callback.watchlistBtnClick);
    this.setWatchedBtnClickHandler(this._callback.watchedBtnClick);
    this.setFavoriteBtnClickHandler(this._callback.favoriteBtnClick);
  };

  setCardClickHandler = (cb) => {
    this._callback.cardClick = cb;
    this.element.children[0].addEventListener('click', this.#cardClickHandler);
  };

  #cardClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.cardClick(this._state);
  };

  setWatchlistBtnClickHandler = (cb) => {
    this._callback.watchlistBtnClick = cb;
    this.element.children[1].querySelector('.film-card__controls-item--add-to-watchlist ').addEventListener('click', this.#watchlistBtnClickHandler);

  };

  #watchlistBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistBtnClick();
  };


  setWatchedBtnClickHandler = (cb) => {
    this._callback.watchedBtnClick = cb;
    this.element.children[1].querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedBtnClickHandler);

  };

  #watchedBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedBtnClick();
  };

  setFavoriteBtnClickHandler = (cb) => {
    this._callback.favoriteBtnClick = cb;
    this.element.children[1].querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteBtnClickHandler);

  };

  #favoriteBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteBtnClick();
  };

  static parseFilmToState = (
    film,
    isFilmLoadingError = false,
    isDisabled = false,
  ) => ({
    ...film,
    isFilmLoadingError,
    isDisabled,
  });

}
