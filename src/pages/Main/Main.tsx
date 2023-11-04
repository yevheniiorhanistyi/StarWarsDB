import { useEffect, useState, useMemo } from 'react';
import { Outlet } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { ICharData, ContextType } from '../../types/types';
import { getFromLocalStorage, saveToLocalStorage, setContent } from '../../utils';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import CharList from '../../components/CharList/CharList';
import SearchInput from '../../components/SearchInput/SearchInput';
import Pagination from '../../components/Pagination/Pagination';

import useApiService from '../../services/apiService';

import styles from './Main.module.scss';

const Main: React.FC = () => {
  const [inputValue, setInputValue] = useState(getFromLocalStorage('searchValue') || '');
  const [charList, setCharList] = useState<ICharData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const frontPage = parseInt(searchParams.get('page') || '1', 10);
  const charId = searchParams.get('details') || '';

  const { getAllCharacters, process, setProcess } = useApiService();

  const handleSearchInputChange = (newValue: string) => {
    setInputValue(newValue);
    saveToLocalStorage('searchValue', newValue);
  };

  const openInfo = (charNumber: number) => {
    setSearchParams(`page=${frontPage}&details=${charNumber}`);
  };

  const closeInfo = () => {
    setSearchParams(`page=${frontPage}`);
  };

  const onRequest = async (value: string, page: number) => {
    getAllCharacters(value, page).then((res) => {
      setCharList(res.results);
      setTotalCount(res.count);
      setProcess('confirmed');
    });
    closeInfo();
  };

  const handleSubmit = async () => {
    onRequest(inputValue, 1);
    setSearchParams('page=1');
  };

  const onPageChange = (value: number) => {
    setSearchParams(`page=${value}`);
  };

  useEffect(() => {
    const totalPageCount = Math.ceil(totalCount / 10);

    if (inputValue !== '' && totalPageCount < Number(frontPage)) {
      onRequest(inputValue, 1);
      setSearchParams('page=1');
    } else {
      onRequest(inputValue, frontPage);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frontPage]);

  const elements = useMemo(
    () =>
      setContent(
        process,
        <>
          <ErrorBoundary>
            <div className={styles.leftColumn}>
              <SearchInput value={inputValue} onSearchChange={handleSearchInputChange} handleSubmit={handleSubmit} />
              <CharList data={charList} openInfo={openInfo} />
              <Pagination totalCount={totalCount} currentPage={Number(frontPage)} onPageChange={onPageChange} />
              {charId && <div className={styles.backdrop} onClick={closeInfo} role="button" tabIndex={0} />}
            </div>
          </ErrorBoundary>
          <ErrorBoundary>
            <Outlet context={{ frontPage, charId, setSearchParams } satisfies ContextType} />
          </ErrorBoundary>
        </>,
      ),
    // eslint-disable-next-line
    [process, inputValue, charId],
  );

  const wrapperClass = charId ? `${styles.wrapper} ${styles.info}` : styles.wrapper;
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={wrapperClass}>{elements}</div>
      </div>
    </main>
  );
};

export default Main;
