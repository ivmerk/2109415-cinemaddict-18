import { emotionType } from '../const.js';
import he from 'he';

const createEmotionItem = (emotion, checkedEmotion, isDisabled) =>
  `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${(emotion === checkedEmotion) ? 'checked' : ''} ${isDisabled ? 'disabled readonly' : ''}>
    <label class="film-details__emoji-label"  data-emotion-type="${emotion}" for="emoji-${emotion}" >
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji" >
    </label>`;


const createFilmDetailsFormTemplate = (checkedEmotion, comment, isDisabled) =>
  `
  <form class="film-details__new-comment" action = "" method = "get" ${isDisabled ? 'disabled' : ''} >
    <div class="film-details__add-emoji-label">
      ${(checkedEmotion) ? `<img src="images/emoji/${checkedEmotion}.png" width="55" height="55" alt="emoji-smile">` : ''}
    </div>
    <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isDisabled ? 'disabled' : ''} >${he.encode((comment) ? comment : '')}</textarea>
    </label>
    <div class="film-details__emoji-list">
      ${emotionType.map((emotion) => createEmotionItem(emotion, checkedEmotion, isDisabled)).join('')}
    </div >
  </form >
  `;

export { createFilmDetailsFormTemplate };
