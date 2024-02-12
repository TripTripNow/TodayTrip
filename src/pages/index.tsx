import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';

import PopularExperience from '@/components/Home/PopularExperience/PopularExperience';
import Searchbar from '@/components/Home/Searchbar/Searchbar';
import AllExperience from '@/components/Home/AllExperience/AllExperience';
import Banner from '@/components/Home/Banner/Banner';
import { localStorageGetItem, localStorageSetItem } from '@/utils/localStorage';
import useDeviceType from '@/hooks/common/useDeviceType';
import NoResult from '@/components/common/NoResult/NoResult';
import { getActivities } from '@/api/activities/activities';
import { GetActivitiesParam, GetActivitiesRes } from '@/types/activities';
import { setContext } from '@/api/axiosInstance';
import QUERY_KEYS from '@/constants/queryKeys';
import styles from './Home.module.css';
import { PriceFilterOption } from '@/types/dropdown';
import { Category } from '@/types/common/api';

const calculateLimit = (deviceType: string | undefined) => {
  switch (deviceType) {
    case 'pc':
      return 8;
    case 'tablet':
      return 9;
    default:
      return 4;
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.allActivities],
    queryFn: () => getActivities({ method: 'offset', sort: 'latest' }),
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

function Home() {
  const deviceType = useDeviceType();
  const [sortByPrice, setSortByPrice] = useState<GetActivitiesParam['sort']>('latest'); // 정렬 순서
  const [selectedCategory, setSelectedCategory] = useState<Category>(''); // 선택된 카테고리
  const [currentPageNumber, setCurrentPageNumber] = useState(1); // 현재 페이지 넘버
  const [limit, setLimit] = useState(calculateLimit(deviceType)); // 한 페이지에 보여줄 카드의 개수
  const [searchResult, setSearchResult] = useState(''); // 검색한 결과
  const [filterValue, setFilterValue] = useState<PriceFilterOption>('가격');

  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEYS.allActivities],
    queryFn: () =>
      getActivities({
        method: 'offset',
        sort: sortByPrice,
        category: selectedCategory,
        page: currentPageNumber,
        size: limit,
        keyword: searchResult,
      }),
  });

  const [inputSearchText, setInputSearchText] = useState(''); // searchbar의 value state
  const [recentSearchKeywords, setRecentSearchKeywords] = useState<string[]>([]); // 최근 검색어 배열

  const [cardData, setCardData] = useState<GetActivitiesRes['activities']>(data?.activities ?? []); // 모든 카드 데이터
  const totalPageNumber = Math.ceil((data?.totalCount ?? 0) / limit);

  // 검색 후 submit 함수
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchResult(inputSearchText);
    setFilterValue('가격');
    setSelectedCategory('');

    const trimmedText = inputSearchText.trim();
    if (!trimmedText) return;

    const storedText = localStorageGetItem('recentSearchKeywords');
    if (!storedText) {
      localStorageSetItem('recentSearchKeywords', trimmedText);
    } else {
      const keywordArray = storedText!.split(',');
      if (!keywordArray.includes(trimmedText)) {
        const updatedKeywords = [trimmedText, ...keywordArray.slice(0, 9)];
        localStorageSetItem('recentSearchKeywords', updatedKeywords.join(','));
      }
    }
    setRecentSearchKeywords(storedText ? storedText.split(',') : []);
  };

  // 검색창 input state 실시간 변경 함수
  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSearchText(e.target.value);
  };

  // 버튼 클릭을 통한 페이지 증감 함수(pagination)
  const handlePaginationByClick = (num: number) => {
    if (num >= 1 && num <= totalPageNumber) setCurrentPageNumber(num);
  };

  // 카테고리 버튼 클릭 함수
  const handleClickCategory = (name: Category) => {
    if (selectedCategory === name) setSelectedCategory('');
    else setSelectedCategory(name);
  };

  const handleSortByPrice = (val: string) => {
    if (val === '가격') return;
    if (sortByPrice === 'price_asc' && '낮은 순' === val) return;
    if (sortByPrice === 'price_desc' && '높은 순' === val) return;
    const newSortByPrice = val === '낮은 순' ? 'price_asc' : 'price_desc';
    setSortByPrice(newSortByPrice);
    setCurrentPageNumber(1);
  };

  useEffect(() => {
    const handleCardLimitByWindowWidth = () => {
      const changedLimit = calculateLimit(deviceType);

      // 페이지 1일 때는 window resize에 대해서 currentPageNumber에 변화가 있으면 안된다
      if (currentPageNumber !== 1) {
        const calc = Math.ceil(((currentPageNumber - 1) * limit + 1) / changedLimit);
        setCurrentPageNumber(calc > 0 ? calc : 1);
      }
      setLimit(changedLimit);
    };

    handleCardLimitByWindowWidth();
  }, [deviceType]);

  // 초기 렌더링
  useEffect(() => {
    const storedText = localStorageGetItem('recentSearchKeywords');
    setRecentSearchKeywords(storedText ? storedText.split(',') : []);
  }, []);

  useEffect(() => {
    handleSortByPrice(filterValue);
  }, [filterValue]);

  useEffect(() => {
    refetch();
  }, [sortByPrice, selectedCategory, currentPageNumber, limit]);

  useEffect(() => {
    if (data) setCardData(data.activities);
  }, [data]);

  const searchedByNoData = searchResult && cardData.length === 0; // 검색 시 데이터가 없는 경우
  return (
    <main className={styles.container}>
      <Banner />
      <div className={styles.mainWrapper}>
        <Searchbar
          handleSearchSubmit={handleSearchSubmit}
          handleSearchText={handleSearchText}
          inputSearchText={inputSearchText}
          recentText={recentSearchKeywords}
        />
        {!searchResult && <PopularExperience deviceType={deviceType} />}

        {!searchedByNoData ? (
          <AllExperience
            searchResult={searchResult}
            showCards={cardData}
            totalCardsNum={cardData.length}
            handlePaginationByClick={handlePaginationByClick}
            totalPages={totalPageNumber}
            pageNumber={currentPageNumber}
            handleClickCategory={handleClickCategory}
            selectedCategory={selectedCategory}
            setFilterValue={setFilterValue}
            filterValue={filterValue}
          />
        ) : (
          <NoResult />
        )}
      </div>
    </main>
  );
}

export default Home;
