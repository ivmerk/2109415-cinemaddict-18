import { NAVIGATIONFILTERTYPES } from '../const.js';
import { getRandomInteger } from '../utils.js';


// const createNavigationItem = (item) => ({
//   type: NAVIGATIONFILTERTYPES[item],
//   quantity: getRandomInteger(100),
// });


export const generateNavigationList = () =>
  NAVIGATIONFILTERTYPES.reduce((obj, item, index) => { obj[item] = getRandomInteger(100); return obj; }, {});
