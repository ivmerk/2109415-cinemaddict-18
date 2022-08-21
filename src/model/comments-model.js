import { generateCommenst } from '../mock/comment.js';

export default class CommentsModel {
  #filmsModel = null;
  #allComments = [];
  #comments = [];

  constructor(filmsModel) {
    this.#filmsModel = filmsModel;
    this.#generateAllComments();
  }

  #generateAllComments() {
    this.#allComments = generateCommenst(this.#filmsModel.get());
  }

  get = (film) => {
    this.#comments = film.comments.map((commentId) => this.#allComments.find((comment) => comment.id === commentId)
    );
    return this.#comments;
  };
}

