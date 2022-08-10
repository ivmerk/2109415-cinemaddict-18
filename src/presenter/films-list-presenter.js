import ShowMoreButtonView from '../view/show-more-botton-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsListView from '../view/films-list-view.js';
import ListCardsView from '../view/list-cards-view.js';
import { render } from '../render.js';

export default class FilmsListPresenter {
  filmsListComponent = new FilmsListView();

  init = (filmsListContainer) => {
    this.filmsListContainer = filmsListContainer;
    render (this.filmsListComponent, this.filmsListContainer);
    render (new ListCardsView(), this.filmsListComponent.getElement());
    const cardsContainer = this.filmsListComponent.getElement().querySelector('.films-list__container');
    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), cardsContainer);
    }
    render(new ShowMoreButtonView(), this.filmsListComponent.getElement());
  };

}
