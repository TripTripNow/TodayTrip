import clsx from 'clsx';

import styles from './Pagination.module.css';
import PaginationLeftArrow from '#/icons/icon-pagination-left-arrow.svg';
import PaginationRightArrow from '#/icons/icon-pagination-right-arrow.svg';

interface PaginationProps {
  page: number;
  allPages: number;
  handlePageNumber: (value: number) => void;
}

function Pagination({ page, allPages, handlePageNumber }: PaginationProps) {
  const pageArr = [];
  for (let i = 1; i <= allPages; i++) pageArr.push(i);

  const currentPageIndex = Math.ceil(page / 5);
  const showPages = pageArr.slice((currentPageIndex - 1) * 5, currentPageIndex * 5);

  return (
    <div className={styles.container}>
      <button
        className={
          page === 1
            ? clsx(styles.paginationNumberWrapper, styles.paginationDisabled)
            : clsx(styles.paginationNumberWrapper, styles.paginationEnabled)
        }
        onClick={() => handlePageNumber(page - 1)}
      >
        <PaginationLeftArrow
          width="21"
          height="21"
          className={page === 1 ? clsx(styles.arrow, styles.arrowDisabled) : clsx(styles.arrow, styles.arrowEnabled)}
        />
      </button>
      {showPages.map((num) => (
        <div
          key={num}
          className={
            page === num
              ? clsx(styles.paginationNumberWrapper, styles.selectedNumber)
              : clsx(styles.paginationNumberWrapper, styles.notSelectedNumber)
          }
          onClick={() => handlePageNumber(num)}
        >
          {num}
        </div>
      ))}
      <button
        className={
          page === allPages
            ? clsx(styles.paginationNumberWrapper, styles.paginationDisabled)
            : clsx(styles.paginationNumberWrapper, styles.paginationEnabled)
        }
        onClick={() => handlePageNumber(page + 1)}
      >
        <PaginationRightArrow
          width="21"
          height="21"
          className={
            page === allPages ? clsx(styles.arrow, styles.arrowDisabled) : clsx(styles.arrow, styles.arrowEnabled)
          }
        />
      </button>
    </div>
  );
}

export default Pagination;
