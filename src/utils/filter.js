import { FilterType } from '../const.js';

const filter = {
  [FilterType.ALL]: (films) => films,//films.filter((film) => film),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.watched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};

export { filter };
