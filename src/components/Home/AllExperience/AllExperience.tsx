import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import CardDetail from '@/components/Home/CardDetail/CardDetail';
import Pagination from '@/components/common/Pagination/Pagination';
import NoResult from '@/components/common/NoResult/NoResult';
import Button from '@/components/common/Button/Button';

import FilterDropDown from '@/components/FilterDropdown/FilterDropdown';
import { PriceFilterOption } from '@/types/dropdown';

import styles from './AllExperience.module.css';
import { GetActivitiesRes } from '@/types/activities';

const CATEGORY = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

interface AllExperienceProps {
  searchResult: string;
  handleSortByPrice: (val: string) => void;

  showCards: GetActivitiesRes['activities'];
  totalCardsNum: number;
  handlePaginationByClick: (val: number) => void;
  handleClickCategory: (val: string) => void;
  totalPages: number;
  pageNumber: number;
  selectedCategory: string;
  filterValue: PriceFilterOption;
  setFilterValue: Dispatch<SetStateAction<PriceFilterOption>>;
}

function AllExperience({
  searchResult,
  handleSortByPrice,
  showCards,
  totalCardsNum,
  handlePaginationByClick,
  handleClickCategory,
  totalPages,
  pageNumber,
  selectedCategory,
  filterValue,
  setFilterValue,
}: AllExperienceProps) {
  const [disableShadow, setDisableShadow] = useState(false);
  const [disableRightShadow, setDisableRightShadow] = useState(false);
  const [move, setMove] = useState(0);

  const handleDisableShadow = () => {
    if (move >= 3) {
      setDisableRightShadow(false);
    } else {
      setDisableRightShadow(true);
    }

    if (move === 0) {
      setDisableShadow(false);
    } else {
      setDisableShadow(true);
    }
  };

  useEffect(() => {
    handleDisableShadow();
  }, [move]);

  return (
    <section className={styles.container}>
      {/* 카테고리 버튼 영역 */}
      <div className={styles.categoryWrapper}>
        {!searchResult && (
          <Splide
            onMoved={(obj: unknown, move: number) => setMove(move)}
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
              arros: true,
              clones: undefined,
            }}
          >
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
          </Splide>
        )}

        {disableShadow && <div className={styles.categoryLeftShadow}></div>}
        {disableRightShadow && <div className={styles.categoryRightShadow}></div>}
      </div>

      {/* 체험 Header 영역 */}
      <div className={styles.titleWrapper}>
        {!searchResult ? (
          <div className={styles.header}>
            <h1>{selectedCategory || '🛼 모든 체험'}</h1>
            <FilterDropDown type="가격" value={filterValue} setValue={setFilterValue} />
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
        <NoResult />
      )}
    </section>
  );
}

export default AllExperience;
