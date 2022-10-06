import he from 'he';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const createCommentTemlate = ({ emotion, comment, author, date, id }, isDeleting, deletedComment) =>
  `
  <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">
          ${he.encode(comment)}
        </p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${dayjs(date).toNow()}</span>
          <button class="film-details__comment-delete" data-comment-id="${id}"
            ${isDeleting ? 'disabled' : ''}>${(isDeleting && (id === deletedComment)) ? 'Deleting...' : 'Delete'}</button>
        </p >
      </div >
  </li >
  `;

export const createFilmDetailsCommentsTemplate = (comments, isDeleting, deletedComment) =>
  `
  <ul class="film-details__comments-list">
    ${comments.map((comment) => createCommentTemlate(comment, isDeleting, deletedComment)).join('')}
  </ul >
  `;
