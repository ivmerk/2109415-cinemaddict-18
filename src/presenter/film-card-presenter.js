import { render } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsPresenter from './film-details-presenter.js';
import { filmsListPresenter } from '../main.js';

export default class FilmCardPresenter {
  #filmCardViewComponent = null;
  #filmListContainer = null;
  #commentsModel = null;
  #film = null;
  constructor(filmListContainer) {
    this.#filmListContainer = filmListContainer;
  }

  init = (film, comments) => {
    this.#commentsModel = comments;
    this.#film = film;
    this.#filmCardViewComponent = new FilmCardView(film, this.#commentsModel);
    this.#filmCardViewComponent.setCardClickHandler(this.#filmCardClickHandler);
    this.#filmCardViewComponent.setButtonClickHandler(this.#filmButtonClickHandler);
    render(this.#filmCardViewComponent, this.#filmListContainer);
  };


  #filmCardClickHandler = (film, comments) => {
    filmsListPresenter.closeFilmDetailsView();
    const siteBodyElement = document.querySelector('body');
    const filmDetailsPresenter = new FilmDetailsPresenter(siteBodyElement);
    filmDetailsPresenter.init(film, comments);
  };

  #filmButtonClickHandler = (key, state) => {
    this.#film.filmInfo[key] = state;
  };


}
