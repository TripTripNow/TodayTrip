import clsx from 'clsx';

import PaginationLeftArrow from '#/icons/icon-pagination-left-arrow.svg';
import PaginationRightArrow from '#/icons/icon-pagination-right-arrow.svg';
import styles from './Pagination.module.css';
import { memo } from 'react';

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
  const currentPageGroupIndex = Math.ceil(pageNumber / 5);
  const visiblePageNumbers = pageNumbersArr.slice((currentPageGroupIndex - 1) * 5, currentPageGroupIndex * 5);

  return (
    <div className={styles.container}>
      <button
        className={clsx(styles.paginationNumberWrapper)}
        onClick={() => handlePaginationByClick(pageNumber - 1)}
        disabled={pageNumber === 1}
        aria-label="페이지네이션 왼쪽 화살표"
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
        aria-label="페이지네이션 오른쪽 화살표"
      >
        <PaginationRightArrow alt="오른쪽 화살표" width="21" height="21" />
      </button>
    </div>
  );
}

export default memo(Pagination);
