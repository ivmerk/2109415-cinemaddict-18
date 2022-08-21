import dayjs from 'dayjs';
import { getRandomInteger, getRandomValue, getRandomFloat } from '../utils.js';
import { MAX_COMMENTS_ON_FILM, GenreCount, Rating, AgeRating, Runtime, description, titles, posters, countries, directors, writers, actors, NAME_COUNT, YearDuration, genres } from './const.js';
import { FILM_COUNT } from '../const.js';

const generateMovieCard = () => ({
  title: getRandomValue(titles),
  alternativeTitle: getRandomValue(titles),
  totalRating: getRandomFloat(Rating.MAX),
  poster: getRandomValue(posters),
  ageRating: getRandomInteger(AgeRating.MAX),
  director: getRandomValue(directors),
  writers: Array.from({ length: getRandomInteger(1, NAME_COUNT) }, () => getRandomValue(writers)),
  actors: Array.from({ length: getRandomInteger(1, NAME_COUNT) }, () => getRandomValue(actors)),
  release: {
    date: dayjs().subtract(getRandomInteger(YearDuration.MIN, YearDuration.MAX), 'year').toISOString(),
    releaseCountry: getRandomValue(countries),
  },
  runtime: getRandomInteger(Runtime.MIN, Runtime.MAX),
  genre: Array.from({ length: getRandomInteger(GenreCount.MIN, GenreCount.MAX) }, () => getRandomValue(genres)),
  description,
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
