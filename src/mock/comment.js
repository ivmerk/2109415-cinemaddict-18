import { getRandomInteger, getRandomValue } from '../utils.js';
import { comment, DayDuration, emotions, writers } from './const.js';
import dayjs from 'dayjs';


const createComment = () => ({
  author: getRandomValue(writers),
  comment,
  date: dayjs().subtract(getRandomInteger(DayDuration.MIN, DayDuration.MAX), 'day').toISOString(),
  emotion: getRandomValue(emotions),
});

const getCommentCount = (cards) => cards.reduce(
  (count, card) => count + card.comments.length, 0
);

export const generateCommenst = (cards) => {
  const commentCount = getCommentCount(cards);

  return Array.from({ length: commentCount }, (_value, index) => {
    const commentItem = createComment();

    return {
      id: String(index + 1),
      ...commentItem,
    };
  });
};
