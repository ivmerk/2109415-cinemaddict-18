import FilmsListPresenter from './presenter/films-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';

import FilmsApiService from './api-services/films-api-service.js';
import CommentsApiService from './api-services/comments-api-service.js';
import HeaderProfilePresenter from './presenter/header-profile-presenter.js';
import FooterStatisticPresenter from './presenter/footer-statistics-presenter.js';

const AUTHORIZATION = 'Basic $er883jdziei';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';

const bodyElement = document.querySelector('body');
const siteMainElement = bodyElement.querySelector('.main');
const siteHeaderElement = bodyElement.querySelector('.header');
const siteFooterElement = bodyElement.querySelector('.footer');
// const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION), filmsModel);
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const filmsListPresenter = new FilmsListPresenter(siteMainElement, filmsModel, commentsModel, filterModel);
const headerProfilePresenter = new HeaderProfilePresenter(siteHeaderElement, filmsModel);
const footerStatisticsPresenter = new FooterStatisticPresenter(siteFooterElement, filmsModel);

filterPresenter.init();
filmsListPresenter.init();
filmsModel.init();
headerProfilePresenter.init();
footerStatisticsPresenter.init();
