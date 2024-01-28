import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import PopularExperience from '@/components/Home/PopularExperience/PopularExperience';
import Searchbar from '@/components/Home/Searchbar/Searchbar';
import AllExperience from '@/components/Home/AllExperience/AllExperience';
import Banner from '@/components/Home/Banner/Banner';
import { CardProps } from '@/components/Home/Card/Card';
import { localStorageGetItem, localStorageSetItem } from '@/utils/localStorage';
import useDeviceType from '@/hooks/common/useDeviceType';
import NoResult from '@/components/Home/NoResult/NoResult';
import { MOCK_DATA } from '@/constants/mock';

import styles from './Home.module.css';

function Home() {
  const [searchResult, setSearchResult] = useState('');
  const [searchText, setSearchText] = useState('');
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchResult(searchText);
    if (searchText === '') return;

    const storedText = localStorageGetItem('recentText');

    if (!storedText) {
      localStorageSetItem('recentText', searchText);
    } else {
      const splitedText = storedText!.split(',');
      if (splitedText.length >= 10) {
        localStorageSetItem('recentText', [searchText, ...splitedText.slice(0, 9)].join(',')!);
      } else {
        localStorageSetItem('recentText', [searchText, ...splitedText].join(',')!);
      }
    }
    handleRecentText();
  };
  const deviceType = useDeviceType();
  const [limit, setLimit] = useState(deviceType === 'pc' ? 8 : deviceType === 'tablet' ? 9 : 4);

  const [sortByPrice, setSortByPrice] = useState('lowPriceOrder');

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const [allCards, setAllCards] = useState([...MOCK_DATA, ...MOCK_DATA, ...MOCK_DATA, ...MOCK_DATA, ...MOCK_DATA]);

  const [page, setPage] = useState(1);
  let allPages = 1;

  const handlePageNumber = (num: number) => {
    if (num < 1 || num > allPages) return;
    setPage(num);
  };

  /** TODO
   * @description 이 함수는 원래 fetch하는 logic이 들어가는 함수입니다. api 연결시 변경되어야 할 내용입니다.
   */
  const handleSortByPrice = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSortByPrice = e.target.value;
    if (sortByPrice === newSortByPrice) return;
    setSortByPrice(newSortByPrice);
    setPage(1);
  };

  const handleChangePageNum = () => {
    if (deviceType === 'pc') {
      setLimit(8);
      setPage(Math.ceil((page * limit) / 8));
    } else if (deviceType === 'tablet') {
      setLimit(9);
      setPage(Math.ceil((page * limit) / 9));
    } else {
      setLimit(4);
      setPage(Math.ceil((page * limit) / 4));
    }
  };

  let showCards: CardProps['item'][] = [];
  const searchedCards = allCards.filter((card) => card.title.includes(searchResult));
  showCards = searchedCards.slice((page - 1) * limit, page * limit);
  allPages = Math.ceil(searchedCards.length / limit);

  const handleRecentText = () => {
    const storedText = localStorageGetItem('recentText');
    if (storedText) setRecentText(storedText.split(','));
    else setRecentText([]);
  };

  const [recentText, setRecentText] = useState<string[]>([]);

  useEffect(() => {
    if (page === 1) handlePageNumber(1);
    if (!recentText) handleRecentText();
    if (allCards) handleChangePageNum();
  }, [sortByPrice, page, deviceType, recentText]);

  return (
    <main className={styles.main}>
      <Banner />
      <div className={styles.container}>
        <div className={styles.searchbarWrapper}>
          <Searchbar
            handleSearchSubmit={handleSearchSubmit}
            handleSearchText={handleSearchText}
            searchText={searchText}
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
            handlePageNumber={handlePageNumber}
            allPages={allPages}
            page={page}
          />
        ) : (
          <NoResult />
        )}
      </div>
    </main>
  );
}

export default Home;
