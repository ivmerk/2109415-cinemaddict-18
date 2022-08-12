import FilltersMenuView from './view/fillters-view.js';
import ProfileRatingView from './view/profile-rating-view.js';
import { render } from './render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const filmsListPresenter = new FilmsListPresenter();

// const filmListContainerElement = siteMainElement.querySelector('.films-list');
render(new ProfileRatingView(), siteHeaderElement);
render(new FilltersMenuView(), siteMainElement);

filmsListPresenter.init(siteMainElement);

