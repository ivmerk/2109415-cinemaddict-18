import Observable from '../framework/observable.js';
// import { generateCommenst } from '../mock/comment.js';

export default class CommentsModel extends Observable {
  #comments = [];
  #apiService = null;

  constructor(apiService) { //(apiService)
    super();
    this.#apiService = apiService;
  }

  get = async (film) => {
    this.#comments = await this.#apiService.get(film);
    return this.#comments;
  };

  get length() {
    return this.#comments.length;
  }

  add = (updateType, update) => {
    // this.#allComments.push(update);
    this.#comments.push(update);
    this._notify(updateType, update);
  };

  delete = (updateType, update) => {
    const index = this.#comments.findIndex(
      (comment) => comment.id === update.id
    );

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
