import AbstractView from '../framework/view/abstract-view';

const createListCardsTemplate = () => '<div class="films-list__container"></div>';

export default class ListCardsView extends AbstractView {

  get template() {
    return createListCardsTemplate();
  }
}
