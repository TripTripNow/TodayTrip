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
  const pageNumbersArr = Array.from({ length: totalPages }, (_, i) => i + 1);
  const currentGroupIndex = Math.ceil(pageNumber / 5);
  const visiblePageNumbers = pageNumbersArr.slice((currentGroupIndex - 1) * 5, currentGroupIndex * 5);

  return (
    <div className={styles.container}>
      <button
        className={clsx(styles.paginationNumberWrapper)}
        onClick={() => handlePaginationByClick(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        <PaginationLeftArrow alt="왼쪽 화살표" width="21" height="21" />
      </button>
      {visiblePageNumbers.map((num) => (
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
        className={clsx(styles.paginationNumberWrapper)}
        onClick={() => handlePaginationByClick(pageNumber + 1)}
        disabled={pageNumber === totalPages}
      >
        <PaginationRightArrow alt="오른쪽 화살표" width="21" height="21" />
      </button>
    </div>
  );
}

export default Pagination;
