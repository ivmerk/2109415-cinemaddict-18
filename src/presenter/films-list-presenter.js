import ShowMoreButtonView from '../view/show-more-botton-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsListView from '../view/films-list-view.js';
import ListCardsView from '../view/list-cards-view.js';
import { render } from '../render.js';
import FilmDetailsView from '../view/film-details-view.js';


export default class FilmsListPresenter {
  #listCardsView = new ListCardsView();
  #showMoreButtonView = new ShowMoreButtonView();
  #filmDetailsComponent = null;
  #filmsListContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #films = [];
  #filmsListComponent = new FilmsListView();


  init = (filmsListContainer, filmsModel, commentsModel) => {
    this.#filmsListContainer = filmsListContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;


    this.#films = [...this.#filmsModel.get()];

    render(this.#filmsListComponent, this.#filmsListContainer);
    render(this.#listCardsView, this.#filmsListComponent.element);

    const cardsContainer = this.#filmsListComponent.element.querySelector('.films-list__container');

    this.#films.forEach((film) => {
      this.#renderFilm(film, cardsContainer);
    });
    // for (let i = 0; i < this.#films.length; i++) {
    //   const commentsCount = [...this.#commentsModel.get(this.#films[i])].length;
    //   render(new FilmCardView(this.#films[i], commentsCount), cardsContainer);
    // }


    // console.log(this.films[0]);
    // render(new FilmDetailsView(this.films[0], comments), siteBodyElement);
    render(this.#showMoreButtonView, this.#filmsListComponent.element);
  };

  #renderFilm = (film, container) => {
    const commentsCount = [...this.#commentsModel.get(film)].length;
    const filmCardComponent = new FilmCardView(film, commentsCount);

    const linkFilmCardElement = filmCardComponent.element.querySelector('a');
    linkFilmCardElement.addEventListener('click', () => {
      this.#addFilmDetailsComponent(film);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });
    render(filmCardComponent, container);
  };


  #renderFilmDetails = (film) => {
    const comments = [...this.#commentsModel.get(this.#films[0])];
    const siteBodyElement = document.querySelector('body');
    this.#filmDetailsComponent = new FilmDetailsView(film, comments);
    const closeButtonDetailsElement = this.#filmDetailsComponent.element.querySelector('.film-details__close-btn');
    closeButtonDetailsElement.addEventListener('click', () => {
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });
    render(this.#filmDetailsComponent, siteBodyElement);
  };

  #addFilmDetailsComponent = (film) => {
    this.#renderFilmDetails(film);
    document.body.classList.add('hide-overflow');
  };

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent = null;
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
