import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class FilmsModel extends Observable {
  #films = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get films() {
    return this.#films;
  }

  init = async () => {
    try {
      const films = await this.#apiService.get();
      this.#films = films.map(this.#adaptToClient);
    } catch {
      this.#films = [];
    }
    this._notify(UpdateType.INIT);
  };

  update = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting file');
    }

    try {
      const response = await this.#apiService.update(update);
      const updatedTask = this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        updatedTask,
        ...this.#films.slice(index + 1),
      ];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t update film');
    }
  };

  #adaptToClient = (film) => {
    const adaptedFilm = {
      ...film,
      filmInfo: {
        ...film['film_info'],
        alternativeTitle: film['film_info']['alternative_title'],
        release: {
          ...film['film_info']['release'],
          releaseCountry: film['film_info']['release']['release_country']
        },
        totalRating: film['film_info']['total_rating'],
        ageRating: film['film_info']['age_rating']
      },
      userDetails: {
        ...film['user_details'],
        watched: film['user_details']['already_watched'],
        watchingDate: film['user_details']['watching_date']
      }
    };

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];
    delete adaptedFilm.filmInfo['alternative_title'];
    delete adaptedFilm.filmInfo['total_rating'];
    delete adaptedFilm.filmInfo['age_rating'];
    delete adaptedFilm.filmInfo['release']['release_country'];
    delete adaptedFilm.userDetails['already_watched'];
    delete adaptedFilm.userDetails['watching_date'];
    return adaptedFilm;
  };
}
