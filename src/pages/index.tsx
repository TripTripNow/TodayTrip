import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';

import PopularExperience from '@/components/Home/PopularExperience/PopularExperience';
import Searchbar from '@/components/Home/Searchbar/Searchbar';
import AllExperience from '@/components/Home/AllExperience/AllExperience';
import Banner from '@/components/Home/Banner/Banner';
import { localStorageGetItem, localStorageSetItem } from '@/utils/localStorage';
import useDeviceType from '@/hooks/common/useDeviceType';
import NoResult from '@/components/Home/NoResult/NoResult';
import { MOCK_DATA } from '@/constants/mock';

import styles from './Home.module.css';

function Home() {
  const deviceType = useDeviceType();
  const [searchResult, setSearchResult] = useState(''); // 검색한 결과
  const [limit, setLimit] = useState(deviceType === 'pc' ? 8 : deviceType === 'tablet' ? 9 : 4); // 한 페이지에 보여줄 카드의 개수
  const [sortByPrice, setSortByPrice] = useState('lowPriceOrder'); // 정렬 순서
  const [inputSearchText, setInputSearchText] = useState(''); // searchbar의 value state
  const [allCards, setAllCards] = useState(() => [
    ...MOCK_DATA,
    ...MOCK_DATA,
    ...MOCK_DATA,
    ...MOCK_DATA,
    ...MOCK_DATA,
  ]); // 모든 카드 데이터
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지 넘버
  const searchedCards = allCards.filter((card) => card.title.includes(searchResult)); // 검색된 카드 데이터
  const showCards = searchedCards.slice((pageNumber - 1) * limit, pageNumber * limit); // 화면에서 보여주는 카드 데이터
  let totalPages = 1; // 전체 페이지 숫자
  const [recentText, setRecentText] = useState<string[]>([]); // 최근 검색어 배열

  totalPages = Math.ceil(searchedCards.length / limit);

  // 검색 후 submit 함수
  const handleSearchSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSearchResult(inputSearchText);

      if (!inputSearchText.trim()) return;

      const storedText = localStorageGetItem('recentText');

      if (!storedText) {
        localStorageSetItem('recentText', inputSearchText);
      } else {
        const splitedText = storedText!.split(',');
        if (!splitedText.includes(inputSearchText)) {
          if (splitedText.length >= 10) {
            localStorageSetItem('recentText', [inputSearchText, ...splitedText.slice(0, 9)].join(',')!);
          } else {
            localStorageSetItem('recentText', [inputSearchText, ...splitedText].join(',')!);
          }
        }
      }
      handleRecentText();
    },
    [inputSearchText],
  );

  // 검색창 input state 실시간 변경 함수
  const handleSearchText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputSearchText(e.target.value);
  }, []);

  // 버튼 클릭을 통한 페이지 증감 함수(pagination)
  const handlePaginationByClick = useCallback(
    (num: number) => {
      if (num < 1 || num > totalPages) return;
      setPageNumber(num);
    },
    [pageNumber, totalPages],
  );

  /** TODO
   * @description 이 함수는 원래 fetch하는 logic이 들어가는 함수입니다. api 연결시 변경되어야 할 내용입니다.
   */
  const handleSortByPrice = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newSortByPrice = e.target.value;
      if (sortByPrice === newSortByPrice) return;
      setSortByPrice(newSortByPrice);
      setPageNumber(1);
    },
    [sortByPrice],
  );

  const handleRecentText = useCallback(() => {
    const storedText = localStorageGetItem('recentText');
    setRecentText(storedText ? storedText.split(',') : []);
  }, []);

  // 초기 렌더링
  useEffect(() => {
    handleRecentText();
  }, []);

  useEffect(() => {
    // window width에 따른 카드 개수 및 페이지 넘버 변경 함수
    const handleChangePageNum = () => {
      let newLimit = 8;

      if (deviceType === 'tablet') newLimit = 9;
      else if (deviceType === 'mobile') newLimit = 4;

      const newPage = Math.ceil((pageNumber * limit) / newLimit);

      setLimit(newLimit);
      setPageNumber(newPage);
    };

    handleChangePageNum();
  }, [pageNumber, deviceType, limit]);

  return (
    <main className={styles.main}>
      <Banner />
      <div className={styles.container}>
        <div className={styles.searchbarWrapper}>
          <Searchbar
            handleSearchSubmit={handleSearchSubmit}
            handleSearchText={handleSearchText}
            inputSearchText={inputSearchText}
            recentText={recentText}
          />
        </div>
        {!searchResult && <PopularExperience deviceType={deviceType} />}

        {showCards.length > 0 ? (
          <AllExperience
            searchResult={searchResult}
            handleSortByPrice={handleSortByPrice}
            showCards={showCards}
            totalCardsNum={allCards.length}
            handlePaginationByClick={handlePaginationByClick}
            totalPages={totalPages}
            pageNumber={pageNumber}
          />
        ) : (
          <NoResult />
        )}
      </div>
    </main>
  );
}

export default Home;
