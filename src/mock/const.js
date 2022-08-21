
const MAX_COMMENTS_ON_FILM = 5;

const FILM_COUNT = 13;

const FILM_COUNT_PER_STEP = 5;

const NAME_COUNT = 3;

const GenreCount = {
  MIN: 1,
  MAX: 3
};

const Rating = {
  MIN: 0,
  MAX: 10,
};

const AgeRating = {
  MIN: 0,
  MAX: 18
};

const Runtime = {
  MIN: 60,
  MAX: 180
};

const YearDuration = {
  MIN: 2,
  MAX: 82
};

const DayDuration = {
  MIN: 0,
  MAX: 100
};

const titles = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
];

const posters = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/the-dance-of-life.jpg',
  'images/posters/the-great-flamarion.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg',
];

const directors = [
  'Takeshi Kitano',
  'Neil Affleck',
  'Ned Ambler',
  'Monty Banks',
  'Jason Bateman',
  'Massimo Dallamano',
  'Alberto De Martino',
  'Claire Denis',
  'J. D. Dillard',
];

const writers = [
  'William Shakespeare',
  'Fyodor Dostoevsky',
  'Leo Tolstoy',
  'Homer',
  'Charles Dickens',
  'Victor Hugo',
  'Mark Twain',
  'Edgar Allan Poe',
  'J. R. R. Tolkien',
  'George Orwell',
];

const actors = [
  'Robert De Niro',
  'Jack Nicholson',
  'Marlon Brando',
  'Denzel Washington',
  'Katharine Hepburn',
  'Humphrey Bogart',
  'Meryl Streep',
  'Daniel Day-Lewis',
  'Sidney Poitier',
  'Clark Gable',
  'Ingrid Bergman',
  'Arnold Schwarzenegger'
];

const countries = [
  'USA',
  'USSR',
  'India',
  'S.Korea',
  'France'
];

const genres = [
  'Comedy',
  'Triller',
  'Drama'
];

const emotions = ['smile', 'sleeping', 'puke', 'angry'];

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const comment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

export { MAX_COMMENTS_ON_FILM, FILM_COUNT, NAME_COUNT, GenreCount, Rating, AgeRating, emotions, comment, description, genres, Runtime, titles, posters, countries, directors, writers, actors, YearDuration, DayDuration };
