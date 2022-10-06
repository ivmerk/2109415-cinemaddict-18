import AbstractView from '../framework/view/abstract-stateful-view.js';


const createMostCommentedFilmsView = () =>
  `  <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
    </section>
    `;


export default class MostCommentedView extends AbstractView {


  get template() {
    return createMostCommentedFilmsView();
  }


}
