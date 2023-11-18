import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

import Spinner from '../../components/Spinner/Spinner';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import CharList from '../../components/CharList/CharList';
import SearchInput from '../../components/SearchInput/SearchInput';
import Pagination from '../../components/Pagination/Pagination';

import { setItems, setTerm, setCurrentPage, setTotalCount } from '../../redux/charactersSlice';
import { useGetAllCharacterQuery } from '../../services/swApi';

import styles from './Main.module.scss';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const charId = searchParams.get('details') || '';
  const { term, limit, currentPage, totalCount } = useSelector((state: RootState) => state.charactersReducer);

  const { data, isFetching } = useGetAllCharacterQuery({ term, page });

  const handleSubmit = async (newValue: string) => {
    navigate('/?page=1');
    dispatch(setTerm(newValue));
    dispatch(setCurrentPage(1));
  };

  const onPageChange = (value: number) => {
    navigate(`/?page=${value}`);
    dispatch(setCurrentPage(value));
  };

  useEffect(() => {
    if (data) {
      const totalPageCount = Math.ceil(data.count / 10);

      if (term !== '' && totalPageCount < Number(page)) navigate('/?page=1');
      const { results, count } = data;
      dispatch(setItems(results));
      dispatch(setTotalCount(count));
      dispatch(setCurrentPage(page));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, data, limit]);

  const wrapperClass = charId ? `${styles.wrapper} ${styles.info}` : styles.wrapper;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={wrapperClass}>
          {isFetching ? (
            <Spinner />
          ) : (
            <>
              <ErrorBoundary>
                <div className={styles.leftColumn}>
                  <SearchInput term={term} handleSubmit={handleSubmit} />
                  <CharList items={data?.results || []} limit={limit} />
                  <Pagination
                    currentPage={currentPage}
                    totalCount={totalCount}
                    limit={limit}
                    onPageChange={onPageChange}
                  />
                  {charId && (
                    <div
                      className={styles.backdrop}
                      onClick={() => navigate(`/?page=${page}`)}
                      role="button"
                      tabIndex={0}
                      data-testid="backdrop"
                    />
                  )}
                </div>
              </ErrorBoundary>
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
