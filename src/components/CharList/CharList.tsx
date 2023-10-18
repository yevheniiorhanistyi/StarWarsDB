import { Component } from 'react';

import * as images from '../../assets/characters/images';
import { ICharListProps, ICharData } from '../../types/types';

import styles from './CharList.module.scss';

type ImagesType = typeof images;

class CharList extends Component<ICharListProps> {
  getCharacterImage(char: ICharData) {
    const match = char.url.match(/\d+/);
    const number = match ? parseInt(match[0], 10) : 1;
    return images[`img${number}` as keyof ImagesType];
  }

  render() {
    const { data } = this.props;

    return (
      <ul className={styles.char__list}>
        {data.map((char) => (
          <li key={char.name} className={styles.char__item}>
            <img className={styles.char__img} src={this.getCharacterImage(char)} alt={char.name} />
            <h4 className={styles.char__title}>{char.name}</h4>
          </li>
        ))}
      </ul>
    );
  }
}

export default CharList;
