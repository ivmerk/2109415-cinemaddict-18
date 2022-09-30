import ProfileRatingView from './view/profile-rating-view.js';
import { render } from './framework/render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';

import FilmsApiService from './api-services/films-api-service.js';
import CommentsApiService from './api-services/comments-api-service.js';

const AUTHORIZATION = 'Basic $er883jdziei';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');


const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
// const commentsModel = new CommentsModel(filmsModel);
const filterModel = new FilterModel();

const filmsListPresenter = new FilmsListPresenter(siteMainElement, filmsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);


render(new ProfileRatingView(), siteHeaderElement);
filterPresenter.init();
filmsListPresenter.init();
filmsModel.init();
