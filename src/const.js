const FILM_COUNT = 15;

const FILM_COUNT_PER_STEP = 5;

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const SortingFiltersType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};
const emotionType = ['smile', 'sleeping', 'puke', 'angry'];

const FilmControlType = {
  isInWatchlist: 'watchlist',
  isWatched: 'watched',
  isFavorite: 'favorite',
};

const UserStatusTitle = {
  NOVICE: 'Novice',
  FAW: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export {
  Method,
  SortingFiltersType,
  FilterType,
  FILM_COUNT,
  FILM_COUNT_PER_STEP,
  emotionType,
  FilmControlType,
  UserStatusTitle,
  UserAction,
  UpdateType,
};
