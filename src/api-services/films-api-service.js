import ApiService from '../framework/api-service.js';
import { Method } from '../const.js';

export default class FilmsApiService extends ApiService {
  get = () => this._load({ url: 'movies' })
    .then(ApiService.parseResponse)
    .catch(() => null);

  update = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (film) => {
    const adaptedFilm = {
      ...film,
      ['film_info']: {
        ...film.filmInfo,
        ['alternative_title']: film.filmInfo.alternativeTitle,
        ['total_rating']: film.filmInfo.totalRating,
        ['age_rating']: film.filmInfo.ageRating,
        ['release']: {
          ...film.filmInfo.release,
          ['release_country']: film.filmInfo.release.releaseCountry,
        }
      },
      ['user_details']: {
        ...film.userDetails,
        ['already_watched']: film.userDetails.watched,
        ['watching_date']: film.userDetails.watchingDate
      }
    };
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;
    delete adaptedFilm['film_info'].alternativeTitle;
    delete adaptedFilm['film_info'].totalRating;
    delete adaptedFilm['film_info'].ageRating;
    delete adaptedFilm['film_info'].release.releaseCountry;
    delete adaptedFilm['user_details'].watched;
    delete adaptedFilm['user_details'].watchingDate;

    return adaptedFilm;
  };
}
