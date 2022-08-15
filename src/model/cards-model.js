import { generateMovieCard } from '../mock/movie-card.js';

export default class CardsModel {
  cards = Array.from({length: 5}, generateMovieCard);

  getCards = () => this.cards;
}
