import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import CharList from '../../components/CharList/CharList';
import SearchInput from '../../components/SearchInput/SearchInput';
import Pagination from '../../components/Pagination/Pagination';

import { ContextType } from '../../types/types';
import { navigateToFirstPage } from '../../utils';
import { setCurrentPage, setTotalCount } from '../../redux/charactersSlice';
import { selectCharacters } from '../../redux/selectors';
import { useGetAllCharacterQuery } from '../../services/swApi';

import styles from './People.module.scss';

const People: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const charId = searchParams.get('details') || '';

  const { search, limit, currentPage, totalCount } = useSelector(selectCharacters);

  const { data, isFetching } = useGetAllCharacterQuery({ search, page });

  useEffect(() => {
    if (data) {
      navigateToFirstPage(search, page, data.count, navigate);
      dispatch(setTotalCount(data.count));
      dispatch(setCurrentPage(page));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, data, limit]);

  const wrapperClass = charId ? `${styles.wrapper} ${styles.info}` : styles.wrapper;

  return (
    <div className={wrapperClass}>
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <ErrorBoundary>
            <div className={styles.leftColumn}>
              <SearchInput search={search} />
              {data && <CharList page={page} items={data.results} limit={limit} />}
              <Pagination currentPage={currentPage} totalCount={totalCount} limit={limit} />
              {charId && (
                <div
                  className={styles.backdrop}
                  onClick={() => navigate(`/people?page=${page}`)}
                  role="button"
                  tabIndex={0}
                  data-testid="backdrop"
                />
              )}
            </div>
          </ErrorBoundary>
          <ErrorBoundary>
            <Outlet context={{ page, charId } satisfies ContextType} />
          </ErrorBoundary>
        </>
      )}
    </div>
  );
};

export default People;
