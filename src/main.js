import FilltersMenuView from './view/fillters-menu-view.js';
import ProfileRatingView from './view/profile-rating-view.js';
import { render } from './render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const filmsListPresenter = new FilmsListPresenter();

const filmsModel = new FilmsModel();

const commentsModel = new CommentsModel(filmsModel);
render(new ProfileRatingView(), siteHeaderElement);
render(new FilltersMenuView(), siteMainElement);

filmsListPresenter.init(siteMainElement, filmsModel, commentsModel);

