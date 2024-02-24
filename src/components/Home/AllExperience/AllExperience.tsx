import { Dispatch, SetStateAction } from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import clsx from 'clsx';

import CardDetail from '@/components/Home/CardDetail/CardDetail';
import Pagination from '@/components/common/Pagination/Pagination';
import NoResult from '@/components/common/NoResult/NoResult';
import Button from '@/components/common/Button/Button';
import FilterDropDown from '@/components/FilterDropdown/FilterDropdown';
import { PriceFilterOption } from '@/types/dropdown';
import { Activity, Category } from '@/types/common/api';
import styles from './AllExperience.module.css';
import Arrow from '#/icons/icon-pagination-left-arrow.svg';

const CATEGORY = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'] as const;

interface AllExperienceProps {
  searchResult: string;
  showCards: Pick<Activity, Exclude<keyof Activity, 'address' | 'createdAt' | 'updatedAt'>>[];
  totalCardsNum: number;
  handlePaginationByClick: (val: number) => void;
  handleClickCategory: (val: Category) => void;
  totalPages: number;
  pageNumber: number;
  selectedCategory: string;
  priceFilterValue: PriceFilterOption;
  setPriceFilterValue: Dispatch<SetStateAction<PriceFilterOption>>;
}

function AllExperience({
  searchResult,
  showCards,
  totalCardsNum,
  handlePaginationByClick,
  handleClickCategory,
  totalPages,
  pageNumber,
  selectedCategory,
  priceFilterValue,
  setPriceFilterValue,
}: AllExperienceProps) {
  return (
    <section className={styles.container}>
      {/* 카테고리 버튼 영역 */}
      <div className={styles.categoryWrapper}>
        {!searchResult && (
          <Splide
            hasTrack={false}
            options={{
              mediaQuery: 'min',
              fixedWidth: '8.8rem',
              pagination: false,
              perPage: 3,
              perMove: 1,
              snap: true,
              padding: { left: 0, right: 0 },
              arrows: false,
              breakpoints: {
                975: {
                  fixedWidth: '15.1rem',
                  padding: { left: 0, right: 0 },
                  arrows: false,
                },
                860: {
                  fixedWidth: '15.1rem',
                  padding: { left: 35, right: 35 },
                  arrows: true,
                },
                768: {
                  fixedWidth: '13.4rem',
                  padding: { left: 35, right: 35 },
                  arrows: true,
                },
                605: {
                  fixedWidth: '8.8rem',
                  padding: { left: 0, right: 0 },
                  arrows: false,
                },
                0: {
                  fixedWidth: '8.8rem',
                  padding: { left: 35, right: 35 },
                  arrows: true,
                },
              },
              clones: undefined,
            }}
          >
            <SplideTrack>
              {CATEGORY.map((name) => (
                <SplideSlide key={name}>
                  <Button
                    key={name}
                    type="category"
                    color={selectedCategory === name ? 'lightgreen' : 'lightwhite'}
                    onClick={() => handleClickCategory(name)}
                  >
                    {name}
                  </Button>
                </SplideSlide>
              ))}
            </SplideTrack>

            <div className="splide__arrows">
              <div className={clsx(styles.categoryLeftShadow, styles.rotateContrary)}>
                <button className="splide__arrow splide__arrow--prev">
                  <Arrow alt="카테고리 왼쪽 이동 버튼" width={4} height={7} />
                </button>
              </div>
              <div className={clsx(styles.categoryRightShadow, styles.rotateContrary)}>
                <button className="splide__arrow splide__arrow--next">
                  <Arrow alt="카테고리 오른쪽 이동 버튼" width={4} height={7} />
                </button>
              </div>
            </div>
          </Splide>
        )}
      </div>

      {/* 체험 Header 영역 */}
      <div className={styles.titleWrapper}>
        {!searchResult ? (
          <div className={styles.header}>
            <h1>{selectedCategory || '🛼 모든 체험'}</h1>
            <FilterDropDown type="가격" value={priceFilterValue} setValue={setPriceFilterValue} />
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

      {/* 카드 영역 */}
      <div className={styles.cardWrapper}>
        {showCards.map((card) => (
          <CardDetail item={card} key={card.id} />
        ))}
      </div>

      {/* 페이지네이션 영역 */}
      {showCards.length > 0 ? (
        <div className={styles.paginationWrapper}>
          <Pagination
            pageNumber={pageNumber}
            totalPages={totalPages}
            handlePaginationByClick={handlePaginationByClick}
          />
        </div>
      ) : (
        <NoResult text="'검색 결과가 없습니다." />
      )}
    </section>
  );
}

export default AllExperience;
