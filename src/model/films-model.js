import { generateMovieList } from '../mock/movie-card.js';

export default class FilmsModel {
  #films = generateMovieList();

  get = () => this.#films;
}
