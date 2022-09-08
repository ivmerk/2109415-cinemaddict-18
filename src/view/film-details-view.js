import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import dayjs from 'dayjs';
import { createFilmDetailsCommentsTemplate } from './film-details-comments-template';
import { formatStringToYear } from '../utils.js';
import { FILMCONTROLTYPES } from '../const.js';

const createFilmDetailsTemplate = ({ filmInfo }, comments) =>
  `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${filmInfo.poster}" alt="">

          <p class="film-details__age">${filmInfo.ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmInfo.title}</h3>
              <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmInfo.writers.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmInfo.actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatStringToYear(filmInfo.release.date)}</td>
            </tr >
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${dayjs().minute(filmInfo.runtime).format('h[h ]m[m]')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${filmInfo.genre.length < 2 ? 'Genre' : 'Genres'}</td>
              <td class="film-details__cell"> ${(() => { if (filmInfo.genre.length) { return filmInfo.genre.map((item) => `<span class="film-details__genre">${item}</span>`).join(''); } })()}
            </tr>
          </table >

           <p class="film-details__film-description">
               ${filmInfo.description}
           </p>
        </div >
      </div >

  <section class="film-details__controls">
    <button type="button" class="film-details__control-button ${filmInfo.isInWatchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button ${filmInfo.isWatched ? 'film-details__control-button--active' : ''}  film-details__control-button--watched" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button ${filmInfo.isFavorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
  </section>
    </div >

  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      ${createFilmDetailsCommentsTemplate(comments)}

      <form class="film-details__new-comment" action="" method="get">
        <div class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </form>
            </section>
        </div>
      </div>
    </section>
    `;


export default class FilmDetailsView extends AbstractStatefulView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
    // this._state = FilmDetailsView.parseCommentsToState(comments);
  }

  // parseCommentsToState = (comments) => comments;

  setButtonClickHandler = (cb) => {
    this._callback.button = cb;
    this.element.children[0].addEventListener('click', this.#buttonClickHandler);

  };

  setEmojiesClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiesClickHandler);
  };

  _restoreHandlers = () => {

  };

  #emojiesClickHandler = (evt) => {
    const bigEmojiContainer = this.element.querySelector('.film-details__add-emoji-label');
    const clickedElement = evt.target.closest('img');
    if (clickedElement) {
      bigEmojiContainer.innerHTML = `<img src="images/emoji/${evt.target.parentNode.previousElementSibling.value}.png" width="55" height="55" alt="emoji-smile">`;
      evt.target.parentNode.previousElementSibling.checked = true;
      this._restoreHandlers();
    }
  };

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    const targetElement = evt.srcElement;
    if (!targetElement.classList.contains('film-details__control-button--active')) {
      targetElement.classList.add('film-details__control-button--active');
      for (const key in FILMCONTROLTYPES) {
        if (targetElement.classList.value.includes(FILMCONTROLTYPES[key])) {
          this._callback.button(key, true);
        }
      }
    } else {
      targetElement.classList.remove('film-details__control-button--active');
      for (const key in FILMCONTROLTYPES) {
        if (targetElement.classList.value.includes(FILMCONTROLTYPES[key])) {
          this._callback.button(key, false);
        }
      }
    }
  };

  get template() {
    return createFilmDetailsTemplate(this.#film, this.#comments);
  }
}
