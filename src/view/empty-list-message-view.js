import { createElement } from '../render';

const createEmptyListMessageViewTemplate = () => '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class EmptyListMessageView {

  #element = null;

  get #template() {
    return createEmptyListMessageViewTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
