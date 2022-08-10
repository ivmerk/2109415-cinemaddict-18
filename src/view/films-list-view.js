import {createElement} from '../render';

const createFilmsListViewTemplate = () => '<section class="films-list"><section>';

export default class FilmsListView {
  getTemplate() {
    return createFilmsListViewTemplate();
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
