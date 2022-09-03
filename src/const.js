const FILM_COUNT = 15;

const FILM_COUNT_PER_STEP = 5;

const NAVIGATIONFILTERTYPES = [
  'all',
  'watchlist',
  'history',
  'favorites'
];

const SORTINGFILTERTYPES = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};
const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const FILMCONTROLTYPES = {
  isInWatchlist: 'watchlist',
  isWatched: 'watched',
  isFavorite: 'favorite',
};

export {
  SORTINGFILTERTYPES,
  NAVIGATIONFILTERTYPES,
  FILM_COUNT,
  FILM_COUNT_PER_STEP,
  EMOTIONS,
  FILMCONTROLTYPES
};
