import AbstractView from '../framework/view/abstract-view';


const createProfileRatingTemplate = (filmsCount) =>
  `<section class="header__profile profile">
    <p class="profile__rating">${filmsCount}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class HeaderProfileView extends AbstractView {
  #filmsCount = 0;

  constructor(filmsCount) {
    super();
    this.#filmsCount = filmsCount;
  }


  get template() {
    return createProfileRatingTemplate(this.#getGrade());
  }

  #getGrade() {
    if (this.#filmsCount >= 21) { return 'Movie Buff'; }
    else {
      if (this.#filmsCount > 10) { return 'Fan'; }
      else {
        if (this.#filmsCount) { return 'Novice'; }
        else { return ''; }
      }
    }
  }


}
