import AbstractView from '../framework/view/abstract-view';

const createProfileRatingTemplate = () => '<p class="profile__rating">Movie Buff</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">';

export default class ProfileRatingView extends AbstractView {

  get template() {
    return createProfileRatingTemplate();
  }
}
