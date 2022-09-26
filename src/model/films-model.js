import Observable from '../framework/observable.js';
import { generateMovieList } from '../mock/movie-card.js';

export default class FilmsModel extends Observable {
  #films = generateMovieList();

  get films() {
    return this.#films;
  }

  update = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting file');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];
    this._notify(updateType, update);
  };
}
