import dayjs from 'dayjs';
import { formatStringToYear } from '../utils/utils.js';

const createFilmDetailsTopTemplate = (filmInfo) =>
  `
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
</div >`;

const createFilmDetailsControlTemplate = (userDetails, isDisable) =>
  `<section class="film-details__controls">
  <button type="button" class="film-details__control-button ${userDetails.watchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist" ${isDisable ? 'disabled' : ''}>Add to watchlist</button>
  <button type="button" class="film-details__control-button ${userDetails.watched ? 'film-details__control-button--active' : ''}  film-details__control-button--watched" id="watched" name="watched" ${isDisable ? 'disabled' : ''}>Already watched</button>
  <button type="button" class="film-details__control-button ${userDetails.favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite" ${isDisable ? 'disabled' : ''}>Add to favorites</button>
  </section>
  </div >
  `;

export { createFilmDetailsTopTemplate, createFilmDetailsControlTemplate };
