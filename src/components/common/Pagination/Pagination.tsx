import clsx from 'clsx';

import PaginationLeftArrow from '#/icons/icon-pagination-left-arrow.svg';
import PaginationRightArrow from '#/icons/icon-pagination-right-arrow.svg';

import styles from './Pagination.module.css';

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  handlePaginationByClick: (value: number) => void;
}

/**
 * @param pageNumber 현재 페이지 넘버
 * @param totalPages 모든 페이지 수
 * @param handlePaginationByClick 숫자를 인자로 받는 void 함수
 */
function Pagination({ pageNumber, totalPages, handlePaginationByClick }: PaginationProps) {
  const pageArr = Array.from({ length: totalPages }, (_, i) => i + 1);

  const currentPageIndex = Math.ceil(pageNumber / 5);
  const showPages = pageArr.slice((currentPageIndex - 1) * 5, currentPageIndex * 5);

  return (
    <div className={styles.container}>
      <button
        className={clsx(
          styles.paginationNumberWrapper,
          pageNumber === 1 ? styles.paginationDisabled : styles.paginationEnabled,
        )}
        onClick={() => handlePaginationByClick(pageNumber - 1)}
      >
        <PaginationLeftArrow
          alt="왼쪽 화살표"
          width="21"
          height="21"
          className={
            pageNumber === 1 ? clsx(styles.arrow, styles.arrowDisabled) : clsx(styles.arrow, styles.arrowEnabled)
          }
        />
      </button>
      {showPages.map((num) => (
        <div
          key={num}
          className={clsx(
            styles.paginationNumberWrapper,
            pageNumber === num ? styles.selectedNumber : styles.notSelectedNumber,
          )}
          onClick={() => handlePaginationByClick(num)}
        >
          {num}
        </div>
      ))}
      <button
        className={clsx(
          styles.paginationNumberWrapper,
          pageNumber === totalPages ? styles.paginationDisabled : styles.paginationEnabled,
        )}
        onClick={() => handlePaginationByClick(pageNumber + 1)}
      >
        <PaginationRightArrow
          alt="오른쪽 화살표"
          width="21"
          height="21"
          className={
            pageNumber === totalPages
              ? clsx(styles.arrow, styles.arrowDisabled)
              : clsx(styles.arrow, styles.arrowEnabled)
          }
        />
      </button>
    </div>
  );
}

export default Pagination;
