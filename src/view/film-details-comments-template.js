import { formatStringToDateWithTime } from '../utils/utils.js';
import he from 'he';

const createCommentTemlate = ({ emotion, comment, author, date, id }) =>
  `
  <li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${he.encode(comment)}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${formatStringToDateWithTime(date)}</span>
      <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
    </p>
  </div>
</li>
  `;

export const createFilmDetailsCommentsTemplate = (comments) =>
  `
  <ul class="film-details__comments-list">
    ${comments.map(createCommentTemlate).join('')}
  </ul>
  `;
