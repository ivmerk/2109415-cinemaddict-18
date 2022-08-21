import { createElement } from '../render';

const createFilmsListViewTemplate = () => '<section class="films-list"><h2 class="films-list__title visually-hidden">All movies. Upcoming</h2></section>';

export default class FilmsListView {

  #element = null;

  get #template() {
    return createFilmsListViewTemplate();
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
