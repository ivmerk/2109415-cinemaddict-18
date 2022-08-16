import FilltersMenuView from './view/fillters-menu-view.js';
import ProfileRatingView from './view/profile-rating-view.js';
import { render } from './render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import CardsModel from './model/cards-model.js';
import FilmDetailsView from './view/film-details-view.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');
const filmsListPresenter = new FilmsListPresenter();

const cardsModel = new CardsModel();

render(new ProfileRatingView(), siteHeaderElement);
render(new FilltersMenuView(), siteMainElement);
render(new FilmDetailsView(cardsModel.cards[0]), siteBodyElement); //popup

filmsListPresenter.init(siteMainElement, cardsModel);

