import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import CardDetail from '@/components/Home/CardDetail/CardDetail';
import Pagination from '@/components/common/Pagination/Pagination';
import { CardProps } from '@/components/Home/Card/Card';
import NoResult from '@/components/Home/NoResult/NoResult';

import styles from './AllExperience.module.css';

const CATEGORY = ['문화·예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

interface AllExperienceProps {
  searchResult: string;
  handleSortByPrice: (e: ChangeEvent<HTMLSelectElement>) => void;
  showCards: CardProps['item'][];
  totalCardsNum: number;
  handlePaginationByClick: (val: number) => void;
  allPages: number;
  pageNumber: number;
}

function AllExperience({
  searchResult,
  handleSortByPrice,
  showCards,
  totalCardsNum,
  handlePaginationByClick,
  allPages,
  pageNumber,
}: AllExperienceProps) {
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리
  const sortedCards = showCards.filter((card) => card.category === selectedCategory); // 해당하는 카테고리로 정렬된 카드 데이터
  const hasCardData = !selectedCategory || (selectedCategory && sortedCards.length !== 0); // 카드 데이터가 있는지 확인하는 boolean 값

  // 카테고리 버튼 클릭 함수
  const handleClickCategory = (name: string) => {
    if (selectedCategory === name) setSelectedCategory('');
    else setSelectedCategory(name);
  };

  return (
    <section className={styles.container}>
      {!searchResult && (
        <Splide
          options={{
            padding: { left: 35, right: 35 },
            gap: '1rem',
            mediaQuery: 'min',
            fixedWidth: '12.7rem',
            pagination: false,
            perPage: 3,
            perMove: 1,
            snap: true,
            breakpoints: {
              860: {
                arrows: false,
                padding: { left: 0, right: 0 },
              },
              766: {
                perPage: 2,
              },
            },
            clones: undefined,
            arrows: true,
          }}
        >
          {CATEGORY.map((name) => (
            <SplideSlide key={name}>
              <button
                key={name}
                className={
                  name === selectedCategory
                    ? clsx(styles.categoryBtn, styles.selectedCategory)
                    : clsx(styles.categoryBtn, styles.notSelectedCategory)
                }
                onClick={() => handleClickCategory(name)}
              >
                {name}
              </button>
            </SplideSlide>
          ))}
        </Splide>
      )}

      <div className={styles.titleWrapper}>
        {!searchResult ? (
          <div className={styles.header}>
            <h1>{selectedCategory ? selectedCategory : '🛼 모든 체험'}</h1>
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
        {selectedCategory &&
          sortedCards.length > 0 &&
          sortedCards.map((card) => <CardDetail item={card} key={card.id} />)}
        {!selectedCategory && showCards.map((card) => <CardDetail item={card} key={card.id} />)}
      </div>

      {hasCardData ? (
        <div className={styles.paginationWrapper}>
          <Pagination pageNumber={pageNumber} allPages={allPages} handlePaginationByClick={handlePaginationByClick} />
        </div>
      ) : (
        <NoResult />
      )}
    </section>
  );
}

export default AllExperience;
