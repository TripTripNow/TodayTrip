import { ChangeEvent, useEffect, useState } from 'react';

import styles from './AllExperience.module.css';
import CardDetail from '@/components/Home/CardDetail/CardDetail';
import Pagination from '@/components/Home/Pagination/Pagination';
import { CardProps } from '@/components/Home/Card/Card';

interface AllExperienceProps {
  searchResult: string;
  handleSortByPrice: (e: ChangeEvent<HTMLSelectElement>) => void;
  showCards: CardProps['item'][];
  totalCardsNum: number;
  handlePageNumber: (val: number) => void;
  allPages: number;
  page: number;
}

function AllExperience({
  searchResult,
  handleSortByPrice,
  showCards,
  totalCardsNum,
  handlePageNumber,
  allPages,
  page,
}: AllExperienceProps) {
  return (
    <>
      <div className={styles.titleWrapper}>
        {!searchResult ? (
          <div className={styles.header}>
            <h1>🛼 모든 체험</h1>
            <select onChange={handleSortByPrice}>
              <option value="lowPriceOrder">가격이 낮은 순</option>
              <option value="highPriceOrder">가격이 높은 순</option>
            </select>
          </div>
        ) : (
          <div className={styles.searchedHeader}>
            <h1>
              {searchResult}
              <span>으로 검색한 결과입니다.</span>
            </h1>
            <p>총{totalCardsNum}개의 결과</p>
          </div>
        )}
      </div>

      <div className={styles.cardWrapper}>
        {showCards.map((card) => (
          <CardDetail item={card} key={card.id} />
        ))}
      </div>

      <div className={styles.paginationWrapper}>
        <Pagination page={page} allPages={allPages} handlePageNumber={handlePageNumber} />
      </div>
    </>
  );
}

export default AllExperience;
