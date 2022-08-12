import {createElement} from '../render';

const createListCardsTemplate = () => '<div class="films-list__container"></div>';

export default class ListCardsView {
  getTemplate() {
    return createListCardsTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
