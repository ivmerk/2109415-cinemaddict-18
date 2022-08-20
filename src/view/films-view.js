import { createElement } from '../render';

const createFilmsViewTemplate = () => '<section class="films"><section>';

export default class FilmsView {

  #element = null;

  get #template() {
    return createFilmsViewTemplate();
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
