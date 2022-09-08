import FilmDetailsView from '../view/film-details-view';
import { render } from '../framework/render.js';

export default class FilmDetailsPresenter {
  #filmDetailsViewComponent = null;
  #filmDetailsContainer = null;
  #commentsModel = null;
  #filmModel = null;
  #removeFilmDetailsPresenter = null;
  #closeButtonDetailsElement = null;

  constructor(filmDetailsContainer, removeFilmDetailsPresenter) {
    this.#filmDetailsContainer = filmDetailsContainer;
    this.#removeFilmDetailsPresenter = removeFilmDetailsPresenter;
  }

  init = (film, comments) => {
    this.#commentsModel = comments;
    this.#filmModel = film;
    this.#filmDetailsViewComponent = new FilmDetailsView(this.#filmModel, this.#commentsModel);
    this.#setHandlers();
    render(this.#filmDetailsViewComponent, this.#filmDetailsContainer);
  };

  #setHandlers = () => {
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#closeButtonDetailsElement = this.#filmDetailsViewComponent.element.querySelector('.film-details__close-btn');
    this.#filmDetailsContainer.classList.add('hide-overflow');
    this.#closeButtonDetailsElement.addEventListener('click', () => {
      this.#removeFilmDetailsPresenter();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    this.#filmDetailsViewComponent.setButtonClickHandler(this.#filmButtonClickHandler);
    this.#filmDetailsViewComponent.setEmojiesClickHandler();

  };

  removeFilmDetailsComponent = () => {
    this.#filmDetailsViewComponent.element.remove();
    this.#filmDetailsViewComponent = null;
    this.#filmDetailsContainer.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsPresenter();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #filmButtonClickHandler = (key, state) => {
    this.#filmModel.filmInfo[key] = state;
    // console.log(this.#filmModel.filmInfo[key]);
  };

}
