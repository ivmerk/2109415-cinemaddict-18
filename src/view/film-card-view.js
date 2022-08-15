import { createElement } from '../render';
import dayjs from 'dayjs';


const createFilmCardTemplate = (card) => {
  const { comments, film_info: filmInfo, } = card;

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${filmInfo.title} Life</h3>
      <p class="film-card__rating">${filmInfo.total_rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${dayjs(filmInfo.release.date).format('YYYY')}</span>
        <span class="film-card__duration">${dayjs().minute(filmInfo.runtime).format('h[h ]m[m]')}</span>
        <span class="film-card__genre">${filmInfo.genre[0]}</span>
      </p>
      <img src="./${filmInfo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${filmInfo.description}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCardView {
  constructor(card) {
    this.card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this.card);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
