import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCurrentPage, setLimit } from "../../redux/charactersSlice";
import { usePagination, DOTS } from "../../hooks/usePagination";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  totalCount: number;
  currentPage: number;
  limit: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  limit,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const paginationRange = usePagination({
    currentPage,
    totalCount,
  });
  const options = [5, 10];

  const onPageChange = (value: number) => {
    dispatch(setCurrentPage(value));
    router.push({ pathname: "/", query: { page: value } });
  };

  const onChangeLimit = (option: number) => {
    dispatch(setLimit(option));
  };

  if (paginationRange.length < 1) return null;

  const lastPage = paginationRange[paginationRange.length - 1];
  let separatorCounter = 0;

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.button}
        type="button"
      >
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
            className={
              pageNumber === currentPage
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={() => onPageChange(Number(pageNumber))}
            type="button"
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className={styles.button}
        type="button"
      >
        &#62;
      </button>
      {totalCount >= 10 && (
        <div className={styles.select}>
          <span>Items per page:</span>
          {options.map((option) => (
            <button
              className={
                option === limit
                  ? `${styles.button} ${styles.active}`
                  : styles.button
              }
              key={option}
              onClick={() => onChangeLimit(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pagination;
