import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #comments = [];
  #apiService = null;
  #filmsModel = null;

  constructor(apiService, filmsModel) {
    super();
    this.#apiService = apiService;
    this.#filmsModel = filmsModel;
  }

  get length() {
    return this.#comments.length;
  }


  get = async (film) => {
    this.#comments = await this.#apiService.get(film);
    return this.#comments;
  };

  add = async (updateType, update, film) => {
    try {
      const response = await this.#apiService.add(update, film);
      const newComment = this.#adaptToClient(response);
      this.#comments.push(newComment);
      this._notify(updateType, newComment);
    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  };

  delete = async (updateType, update, film) => {
    const index = this.#comments.findIndex(
      (comment) => comment.id === update.id
    );

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#apiService.delete(update, film);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete comment');
    }
  };

  #adaptToClient = (comment) => {
    const adaptedComment = comment;
    return adaptedComment;
  };
}
