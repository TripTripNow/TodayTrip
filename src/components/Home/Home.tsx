import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import PopularExperience from '@/components/Home/PopularExperience/PopularExperience';
import Searchbar from './Searchbar/Searchbar';
import AllExperience from '@/components/Home/AllExperience/AllExperience';
import Carousel from '@/components/Home/Carousel/Carousel';

import card1 from '#/images/carousel1.png';
import card2 from '#/images/carousel2.png';
import card3 from '#/images/carousel3.png';
import styles from './Home.module.css';
import { CardProps } from '@/components/Home/Card/Card';
import { localStorageGetItem } from '@/utils/localStorage';
import useDeviceType from '@/hooks/common/useDeviceType';
import NoResult from '@/components/Home/NoResult/NoResult';

/** MOCK_DATA입니다! */
const MOCK_DATA: CardProps['item'][] = [
  {
    id: 1,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 1,
    bannerImageUrl: card1.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 2,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 2,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 3,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 3,
    bannerImageUrl: card3.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 4,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 4,
    bannerImageUrl: card1.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 5,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 5,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 6,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 6,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 7,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 7,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 8,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 8,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 9,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 9,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 10,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 10,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 11,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 11,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 12,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 12,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 13,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 13,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 14,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 14,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
];

function Main() {
  const [searchResult, setSearchResult] = useState('');
  const [searchText, setSearchText] = useState('');
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchResult(searchText);
  };
  const [sortByPrice, setSortByPrice] = useState('lowPriceOrder');

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const [allCards, setAllCards] = useState([...MOCK_DATA, ...MOCK_DATA, ...MOCK_DATA, ...MOCK_DATA, ...MOCK_DATA]);

  const [page, setPage] = useState(1);
  let allPages = 1;
  const deviceType = useDeviceType();

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

    const sortedCards =
      newSortByPrice === 'lowPriceOrder'
        ? [...allCards].sort((a, b) => a.price - b.price)
        : [...allCards].sort((a, b) => b.price - a.price);

    setAllCards(sortedCards);
    setPage(1);
  };

  let showCards: CardProps['item'][] = [];
  const searchedCards = allCards.filter((card) => card.title.includes(searchResult));
  switch (deviceType) {
    case 'pc':
      showCards = searchedCards.slice((page - 1) * 8, page * 8);
      allPages = Math.ceil(searchedCards.length / 8);
      break;
    case 'tablet':
      showCards = searchedCards.slice((page - 1) * 9, page * 9);
      allPages = Math.ceil(searchedCards.length / 9);
      break;
    case 'mobile':
      showCards = searchedCards.slice((page - 1) * 4, page * 4);
      allPages = Math.ceil(searchedCards.length / 4);
      break;
    default:
      showCards = [];
      break;
  }

  const handleRecentText = () => {
    const storedText = localStorageGetItem('recentText');
    if (storedText) setRecentText(storedText.split(','));
    else setRecentText([]);
  };

  const [recentText, setRecentText] = useState<string[]>([]);

  useEffect(() => {
    if (page === 1) handlePageNumber(1);
    handleRecentText();
  }, [sortByPrice, page]);

  return (
    <main className={styles.main}>
      <Carousel />
      <div className={styles.container}>
        <Searchbar
          handleSearchSubmit={handleSearchSubmit}
          handleSearchText={handleSearchText}
          searchText={searchText}
          recentText={recentText}
        />
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

export default Main;
