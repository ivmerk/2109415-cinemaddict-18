import { emotionType } from '../const.js';
import he from 'he';

const createEmotionItem = (emotion, checkedEmotion) =>
  `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${(emotion === checkedEmotion) ? 'checked' : ''} >
    <label class="film-details__emoji-label"  data-emotion-type="${emotion}" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`;


const createFilmDetailsFormTemplate = (checkedEmotion, comment) =>
  `
  <form class="film-details__new-comment" action = "" method = "get" >
    <div class="film-details__add-emoji-label">
      ${(checkedEmotion) ? `<img src="images/emoji/${checkedEmotion}.png" width="55" height="55" alt="emoji-smile">` : ''}
    </div>
    <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode((comment) ? comment : '')}</textarea>
    </label>
    <div class="film-details__emoji-list">
      ${emotionType.map((emotion) => createEmotionItem(emotion, checkedEmotion)).join('')}
    </div >
  </form >
  `;

export { createFilmDetailsFormTemplate };
