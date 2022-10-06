import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const.js';

const NoFilmsTaskType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no films in watchlist now',
  [FilterType.HISTORY]: 'There are no watched films now',
  [FilterType.FAVORITES]: 'There are no favorites films now',
};

const createNoFilmsTemplate = (filterType) => {
  const noFilmsTextValue = NoFilmsTaskType[filterType];
  return (`
    <h2 class="films-list__title ">${noFilmsTextValue}</h2>`);
};

export default class NoFilmsView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoFilmsTemplate(this.#filterType);
  }

}
