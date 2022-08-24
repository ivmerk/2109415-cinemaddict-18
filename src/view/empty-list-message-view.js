import AbstractView from '../framework/view/abstract-view';

const createEmptyListMessageViewTemplate = () => '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class EmptyListMessageView extends AbstractView {


  get template() {
    return createEmptyListMessageViewTemplate();
  }
}
