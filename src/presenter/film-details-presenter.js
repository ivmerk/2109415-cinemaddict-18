import FilmDetailsView from '../view/film-details-view';
import { render } from '../framework/render.js';

export default class FilmDetailsPresenter {
  #filmDetailsViewComponent = null;
  #filmDetailsContainer = null;
  #commentsModel = null;
  #filmModel = null;

  constructor(filmDetailsContainer) {
    this.#filmDetailsContainer = filmDetailsContainer;
  }

  init = (film, comments) => {
    this.#commentsModel = comments;
    this.#filmModel = film;
    this.#filmDetailsViewComponent = new FilmDetailsView(this.#filmModel, this.#commentsModel);
    const closeButtonDetailsElement = this.#filmDetailsViewComponent.element.querySelector('.film-details__close-btn');
    document.addEventListener('keydown', this.#onEscKeyDown);
    closeButtonDetailsElement.addEventListener('click', () => {
      this.removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    this.#filmDetailsViewComponent.setButtonClickHandler(this.#filmButtonClickHandler);
    render(this.#filmDetailsViewComponent, this.#filmDetailsContainer);
  };

  removeFilmDetailsComponent = () => {
    this.#filmDetailsViewComponent.element.remove();
    this.#filmDetailsViewComponent = null;
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #filmButtonClickHandler = (key, state) => {
    this.#filmModel.filmInfo[key] = state;
    // console.log(this.#filmModel.filmInfo[key]);
  };

}
