import { NAVIGATIONFILTERTYPES } from '../const.js';
import { getRandomInteger } from '../utils.js';


export const generateNavigationList = () =>
  NAVIGATIONFILTERTYPES.reduce((obj, item) => { obj[item] = getRandomInteger(100); return obj; }, {});
