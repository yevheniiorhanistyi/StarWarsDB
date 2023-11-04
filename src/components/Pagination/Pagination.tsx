import { usePagination, DOTS } from '../../hooks/usePagination';
import { IPaginationProps } from '../../types/types';

import styles from './Pagination.module.scss';

const Pagination: React.FC<IPaginationProps> = ({ onPageChange, totalCount, currentPage }) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
  });

  if (paginationRange.length < 1) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  let separatorCounter = 0;

  return (
    <div className={styles.wrapper}>
      <button onClick={onPrevious} disabled={currentPage === 1} className={styles.button} type="button">
        &#60;
      </button>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          const separatorKey = `separator-${separatorCounter}`;
          separatorCounter += 1;
          return (
            <p key={separatorKey} className={styles.dots}>
              &#8230;
            </p>
          );
        }

        return (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? `${styles.button} ${styles.active}` : styles.button}
            onClick={() => onPageChange(Number(pageNumber))}
            type="button"
          >
            {pageNumber}
          </button>
        );
      })}
      <button onClick={onNext} disabled={currentPage === lastPage} className={styles.button} type="button">
        &#62;
      </button>
    </div>
  );
};

export default Pagination;