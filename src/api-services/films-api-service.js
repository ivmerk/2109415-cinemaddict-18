import ApiService from '../framework/api-service.js';

export default class FilmsApiService extends ApiService {
  get = () => this._load({ url: 'movies' }).then(ApiService.parseResponse);
}
