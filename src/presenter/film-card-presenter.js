import { render } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsPresenter from './film-details-presenter.js';

export default class FilmCardPresenter {
  #filmCardViewComponent = null;
  #filmListContainer = null;
  #commentsModel = null;

  constructor(filmListContainer) {
    this.#filmListContainer = filmListContainer;
  }

  init = (film, comments) => {
    this.#commentsModel = comments;
    this.#filmCardViewComponent = new FilmCardView(film, this.#commentsModel);
    this.#filmCardViewComponent.setCardClickHandler(this.#filmCardClickHandler);

    render(this.#filmCardViewComponent, this.#filmListContainer);
  };


  #filmCardClickHandler = (film, comments) => {
    const siteBodyElement = document.querySelector('body');
    const filmDetailsPresenter = new FilmDetailsPresenter(siteBodyElement);
    filmDetailsPresenter.init(film, comments);
  };


}
