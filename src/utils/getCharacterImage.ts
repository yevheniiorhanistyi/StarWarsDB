import { ICharData } from '../types/types';
import { getNumberFromString } from './getNumberFromString';

export const getCharacterImage = (char: ICharData) => {
  const number = getNumberFromString(char.url);
  return `/characters/${number}.jpg`;
};

export default getCharacterImage;
