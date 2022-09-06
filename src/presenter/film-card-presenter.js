import { render } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsPresenter from './film-details-presenter.js';

export default class FilmCardPresenter {
  #filmCardViewComponent = null;
  #filmListContainer = null;
  #commentsModel = null;
  #film = null;
  #closeFilmDetailView = null;
  isPopup = false;
  #filmDetailsPresenter = null;

  constructor(filmListContainer, closeFilmDetailsView) {
    this.#filmListContainer = filmListContainer;
    this.#closeFilmDetailView = closeFilmDetailsView;
  }

  init = (film, comments) => {
    this.#commentsModel = comments;
    this.#film = film;
    this.#filmCardViewComponent = new FilmCardView(film, this.#commentsModel);
    this.#filmCardViewComponent.setCardClickHandler(this.#filmCardClickHandler);
    this.#filmCardViewComponent.setButtonClickHandler(this.#filmButtonClickHandler);
    render(this.#filmCardViewComponent, this.#filmListContainer);
  };

  #filmButtonClickHandler = (key, state) => {
    this.#film.filmInfo[key] = state;
  };

  removeFilmDetailsPresenter = () => {
    if (this.#filmDetailsPresenter) {
      this.isPopup = false;
      this.#filmDetailsPresenter.removeFilmDetailsComponent();
    }
  };

  #filmCardClickHandler = (film, comments) => {
    this.#closeFilmDetailView();
    const siteBodyElement = document.querySelector('body');
    this.#filmDetailsPresenter = new FilmDetailsPresenter(siteBodyElement, this.removeFilmDetailsPresenter);
    this.isPopup = true;
    this.#filmDetailsPresenter.init(film, comments);
  };

}
