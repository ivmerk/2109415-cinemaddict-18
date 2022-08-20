import { createElement } from '../render';

const createProfileRatingTemplate = () => ' <p class="profile__rating">Movie Buff</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">';

export default class ProfileRatingView {

  #element = null;

  get #template() {
    return createProfileRatingTemplate();
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
