import ProfileRatingView from './view/profile-rating-view.js';
import { render } from './framework/render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import NavigationFilltersMenuView from './view/navigation-fillters-menu-view.js';
import SortFilltersMenuView from './view/sort-fillters-menu-view.js';
import { generateNavigationList } from './mock/navigation.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');


const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);
const navFilterList = new NavigationFilltersMenuView(generateNavigationList());

render(new ProfileRatingView(), siteHeaderElement);
render(navFilterList, siteMainElement);
render(new SortFilltersMenuView(navFilterList), siteMainElement);

const filmsListPresenter = new FilmsListPresenter(siteMainElement, filmsModel, commentsModel);
filmsListPresenter.init();

console.log(navFilterList.showthefilter());
