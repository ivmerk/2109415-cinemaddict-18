import dayjs from 'dayjs';
import { getRandomInteger, getRandomValue, getRandomFloat } from '../utils.js';
import { MAX_COMMENTS_ON_FILM, GENRECOUNT, RATING, AGERATING, RUNTIME, DESCRIPTION, TITLES, POSTERS, COUNTRIES, DIRECTORS, WRITERS, ACTORS, NAME_COUNT, YEARDURATION, GENRES } from './const.js';
import { FILM_COUNT } from '../const.js';

const generateMovieCard = () => ({
  title: getRandomValue(TITLES),
  alternativeTitle: getRandomValue(TITLES),
  totalRating: getRandomFloat(RATING.MAX),
  poster: getRandomValue(POSTERS),
  ageRating: getRandomInteger(AGERATING.MAX),
  director: getRandomValue(DIRECTORS),
  writers: Array.from({ length: getRandomInteger(1, NAME_COUNT) }, () => getRandomValue(WRITERS)),
  actors: Array.from({ length: getRandomInteger(1, NAME_COUNT) }, () => getRandomValue(ACTORS)),
  release: {
    date: dayjs().subtract(getRandomInteger(YEARDURATION.MIN, YEARDURATION.MAX), 'year').toISOString(),
    releaseCountry: getRandomValue(COUNTRIES),
  },
  runtime: getRandomInteger(RUNTIME.MIN, RUNTIME.MAX),
  genre: Array.from({ length: getRandomInteger(GENRECOUNT.MIN, GENRECOUNT.MAX) }, () => getRandomValue(GENRES)),
  description: DESCRIPTION,
  isInWatchlist: false,
  isWatched: false,
  isFavorite: false,

});

export const generateMovieList = () => {
  const cards = Array.from({ length: FILM_COUNT }, generateMovieCard);

  let totalCommentCount = 0;

  return cards.map((film, index) => {
    const hasComments = getRandomInteger();

    const cardCommentCount = (hasComments) ? getRandomInteger(1, MAX_COMMENTS_ON_FILM) : 0;
    totalCommentCount += cardCommentCount;
    return {
      id: String(index + 1),
      comments: (hasComments) ? Array.from({ length: totalCommentCount }, (_value, commentIndex) => String(totalCommentCount - commentIndex)) : [],
      filmInfo: film,
    };
  });
};
