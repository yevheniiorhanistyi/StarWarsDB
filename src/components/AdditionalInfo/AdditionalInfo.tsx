import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { setItem } from '../../redux/charactersSlice';
import { getCharacterImage } from '../../utils';
import { useGetCharacterQuery } from '../../services/swApi';
import Spinner from '../Spinner/Spinner';

import styles from './AdditionalInfo.module.scss';

const AdditionalInfo: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const charId = searchParams.get('details') || '';
  const { data, isFetching } = useGetCharacterQuery(charId);

  useEffect(() => {
    if (data) dispatch(setItem(data));
  }, [data, dispatch]);

  const handleCloseInfo = () => {
    navigate(`/?page=${page}`);
  };

  if (!charId) return null;

  if (isFetching) return <Spinner />;

  return (
    <div>
      {data && (
        <div className={styles.wrapper}>
          <div className={styles.item}>
            <img className={styles.item__img} src={getCharacterImage(data)} alt={data.name} />
            <div className={styles.item__description}>
              <h4 className={styles.item__title}>{data.name}</h4>
              <p className={styles.item__attribute}>{`Height: ${data.height}`}</p>
              <p className={styles.item__attribute}>{`Weight: ${data.mass}`}</p>
              <p className={styles.item__attribute}>{`Hair Color: ${data.hair_color}`}</p>
              <p className={styles.item__attribute}>{`Skin Color: ${data.skin_color}`}</p>
              <p className={styles.item__attribute}>{`Eye Color: ${data.eye_color}`}</p>
              <p className={styles.item__attribute}>{`Gender: ${data.gender}`}</p>
            </div>
            <button onClick={handleCloseInfo} className={styles.item__close} type="button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionalInfo;
