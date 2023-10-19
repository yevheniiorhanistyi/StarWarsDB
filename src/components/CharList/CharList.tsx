import { Component } from 'react';

import { ICharListProps, ICharData } from '../../types/types';

import * as images from '../../assets/characters/images';
import emptySrc from '../../assets/fighter.png';

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

    if (data.length === 0) {
      return (
        <div className={styles.char__empty}>
          <h3>No results found in this galaxy...</h3>
          <img src={emptySrc} alt="Sormtroopers" />
        </div>
      );
    }
    return (
      <ul className={styles.char__list}>
        {data.map((char) => (
          <li key={char.name} className={styles.char__item}>
            <img className={styles.char__img} src={this.getCharacterImage(char)} alt={char.name} />
            <div className={styles.char__description}>
              <h4 className={styles.char__title}>{char.name}</h4>
              <p className={styles.char__attribute}>{`Height: ${char.height}`}</p>
              <p className={styles.char__attribute}>{`Weigth: ${char.mass}`}</p>
              <p className={styles.char__attribute}>{`Eye Color: ${char.eye_color}`}</p>
              <p className={styles.char__attribute}>{`Skin Color: ${char.skin_color}`}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default CharList;
