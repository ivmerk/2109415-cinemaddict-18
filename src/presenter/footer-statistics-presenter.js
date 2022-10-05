import { render, replace } from '../framework/render.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';

export default class FooterStatisticPresenter {
  #container = null;
  #filmsModel = null;
  #footerStatisticsComponent = null;

  constructor(container, filmsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {

    const filmsCount = this.#filmsModel.films.length;
    const prevFooterStatisticsComponent = this.#footerStatisticsComponent;

    this.#footerStatisticsComponent = new FooterStatisticsView(filmsCount);

    if (prevFooterStatisticsComponent === null) {
      render(this.#footerStatisticsComponent, this.#container);
    } else {
      replace(this.#footerStatisticsComponent, prevFooterStatisticsComponent);
    }
  };

  #handleModelEvent = () => {
    this.init();
  };
}
