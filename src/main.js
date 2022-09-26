import ProfileRatingView from './view/profile-rating-view.js';
import { render } from './framework/render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');


const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);
const filterModel = new FilterModel();

const filmsListPresenter = new FilmsListPresenter(siteMainElement, filmsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);


render(new ProfileRatingView(), siteHeaderElement);
filterPresenter.init();

filmsListPresenter.init();
