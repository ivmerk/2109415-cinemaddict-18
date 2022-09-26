import Observable from '../framework/observable.js';
import { generateCommenst } from '../mock/comment.js';

export default class CommentsModel extends Observable {
  #filmsModel = null;
  #allComments = [];
  #comments = [];
  #apiService = null;

  constructor(filmsModel) { //(apiService)
    super();
    this.#filmsModel = filmsModel;
    this.#generateAllComments();
    // this.#apiService = apiService;
  }


  #generateAllComments() {
    this.#allComments = generateCommenst(this.#filmsModel.films);
  }

  get = (film) => {
    this.#comments = film.comments.map((commentId) => this.#allComments.find((comment) => comment.id === commentId)
    );
    return this.#comments;
  };

  get length() {
    return this.#allComments.length;
  }

  add = (updateType, update) => {
    this.#allComments.push(update);
    this._notify(updateType, update);
  };

  delete = (updateType, update) => {
    const index = this.#allComments.findIndex(
      (comment) => comment.id === update.id
    );

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#allComments = [
      ...this.#allComments.slice(0, index),
      ...this.#allComments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
