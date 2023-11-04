import { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

import { initialCharData } from '../../constats/constats';
import { ICharData, ContextType } from '../../types/types';
import { getCharacterImage, setContent } from '../../utils';

import useApiService from '../../services/apiService';

import styles from './AdditionalInfo.module.scss';

const AdditionalInfo: React.FC = () => {
  const [charData, setCharData] = useState<ICharData>(initialCharData);
  const { frontPage, charId, setSearchParams } = useOutletContext<ContextType>();
  const { getCharacter, process, setProcess } = useApiService();

  const onRequest = async (value: string) => {
    if (value.length > 0) {
      getCharacter(value).then((res) => {
        setCharData(res);
        setProcess('confirmed');
      });
    }
  };

  useEffect(() => {
    onRequest(charId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charId]);

  const handleCloseInfo = () => {
    setSearchParams(`page=${frontPage}`);
  };

  const elements = useMemo(
    () =>
      setContent(
        process,
        <div className={styles.wrapper}>
          <div className={styles.item}>
            <img className={styles.item__img} src={getCharacterImage(charData)} alt={charData.name} />
            <div className={styles.item__description}>
              <h4 className={styles.item__title}>{charData.name}</h4>
              <p className={styles.item__attribute}>{`Height: ${charData.height}`}</p>
              <p className={styles.item__attribute}>{`Weigth: ${charData.mass}`}</p>
              <p className={styles.item__attribute}>{`Hair Color: ${charData.hair_color}`}</p>
              <p className={styles.item__attribute}>{`Skin Color: ${charData.skin_color}`}</p>
              <p className={styles.item__attribute}>{`Eye Color: ${charData.eye_color}`}</p>
              <p className={styles.item__attribute}>{`Gender: ${charData.gender}`}</p>
            </div>
            <button onClick={handleCloseInfo} className={styles.item__close} type="button">
              Close
            </button>
          </div>
        </div>,
      ),
    // eslint-disable-next-line
    [process],
  );

  if (!charId) return null;

  return <div>{elements}</div>;
};

export default AdditionalInfo;
