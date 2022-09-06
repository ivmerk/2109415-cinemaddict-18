import { getRandomInteger, getRandomValue } from '../utils.js';
import { COMMENT, DAYDURATION, EMOTIONS, WRITERS } from './const.js';
import dayjs from 'dayjs';


const createComment = () => ({
  author: getRandomValue(WRITERS),
  comment: COMMENT,
  date: dayjs().subtract(getRandomInteger(DAYDURATION.MIN, DAYDURATION.MAX), 'day').toISOString(),
  emotion: getRandomValue(EMOTIONS),
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
