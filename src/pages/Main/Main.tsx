import { useState, useEffect, useCallback, useMemo } from 'react';

import { ICharData } from '../../types/types';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';

import ApiService from '../../services/apiService';
import Search from '../../components/Search/Search';
import CharList from '../../components/CharList/CharList';
import Spinner from '../../components/Spinner/Spinner';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

import styles from './Main.module.scss';

const Main: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState(getFromLocalStorage('searchValue') || '');
  const [charList, setCharList] = useState<ICharData[]>([]);
  const apiService = useMemo(() => new ApiService(), []);

  const loadData = useCallback(
    async (value: string) => {
      try {
        setLoading(true);
        const res = await apiService.getAllCharacters(value);
        setCharList(res.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [setCharList, setLoading, apiService],
  );

  useEffect(() => {
    loadData(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchInputChange = (newValue: string) => {
    setInputValue(newValue);
    saveToLocalStorage('searchValue', newValue);
  };

  const handleSubmit = async () => {
    loadData(inputValue);
  };

  const mainClass = loading ? `${styles.main} ${styles.main__loading}` : styles.main;

  return (
    <main className={mainClass}>
      <div className={styles.wrapper}>
        {loading ? (
          <Spinner />
        ) : (
          <div className={styles.container}>
            <Search value={inputValue} onSearchChange={handleSearchInputChange} handleSubmit={handleSubmit} />
            <ErrorBoundary>
              <CharList data={charList} />
            </ErrorBoundary>
          </div>
        )}
      </div>
    </main>
  );
};

export default Main;
