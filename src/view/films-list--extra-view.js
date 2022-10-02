import AbstractView from '../framework/view/abstract-view';

const createFilmsListExtraViewTemplate = () => '<section class="films-list films-list--extra"></section>';

export default class FilmsListExtraView extends AbstractView {


  get template() {
    return createFilmsListExtraViewTemplate();
  }

}
