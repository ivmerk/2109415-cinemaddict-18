import { createElement } from '../render';

const createListCardsTemplate = () => '<div class="films-list__container"></div>';

export default class ListCardsView {

  #element = null;

  get #template() {
    return createListCardsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#template);
    }
    return this.#element;
  }

  removeElement() {
    this.element = null;
  }
}
