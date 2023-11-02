import { ICharListProps, ICharData } from '../../types/types';

import { getCharacterImage, getNumberFromString } from '../../utils';

import styles from './CharList.module.scss';

const CharList: React.FC<ICharListProps> = ({ data, openInfo }) => {
  const noResultsImage = '/fighter.png';

  const onOpenInfo = (char: ICharData) => {
    const number = getNumberFromString(char.url);
    openInfo(number);
  };

  if (data.length === 0) {
    return (
      <div className={styles.char__empty}>
        <h3>No results found in this galaxy...</h3>
        <img src={noResultsImage} alt="Sormtroopers" />
      </div>
    );
  }
  return (
    <ul className={styles.char__list}>
      {data.map((char) => (
        <li key={char.name} className={styles.char__item}>
          <button
            className={styles.char__button}
            type="button"
            onClick={() => {
              onOpenInfo(char);
            }}
          >
            <img className={styles.char__img} src={getCharacterImage(char)} alt={char.name} />
            <div className={styles.char__description}>
              <h4 className={styles.char__title}>{char.name}</h4>
              <p className={styles.char__attribute}>{`Height: ${char.height}`}</p>
              <p className={styles.char__attribute}>{`Weigth: ${char.mass}`}</p>
              <p className={styles.char__attribute}>{`Hair Color: ${char.hair_color}`}</p>
              <p className={styles.char__attribute}>{`Skin Color: ${char.skin_color}`}</p>
              <p className={styles.char__attribute}>{`Eye Color: ${char.eye_color}`}</p>
              <p className={styles.char__attribute}>{`Gender: ${char.gender}`}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CharList;
