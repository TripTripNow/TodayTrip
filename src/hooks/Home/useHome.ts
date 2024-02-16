import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { QueryClient, keepPreviousData, useQuery } from '@tanstack/react-query';

import { getActivities } from '@/api/activities';
import QUERY_KEYS from '@/constants/queryKeys';
import useDeviceType from '@/hooks/common/useDeviceType';
import { GetActivitiesParam } from '@/types/activities';
import { Category } from '@/types/common/api';
import { PriceFilterOption } from '@/types/dropdown';
import { localStorageGetItem, localStorageSetItem } from '@/utils/localStorage';

const calculateLimit = (deviceType: string | undefined) => {
  if (!deviceType) return;
  switch (deviceType) {
    case 'pc':
      return 8;
    case 'tablet':
      return 9;
    default:
      return 4;
  }
};

export const useHome = () => {
  const deviceType = useDeviceType();
  const [sortByPrice, setSortByPrice] = useState<GetActivitiesParam['sort']>('latest'); // 정렬 순서
  const [selectedCategory, setSelectedCategory] = useState<Category>(''); // 선택된 카테고리
  const [currentPageNumber, setCurrentPageNumber] = useState(1); // 현재 페이지 넘버
  const [limit, setLimit] = useState(calculateLimit(deviceType) ?? 9); // 한 페이지에 보여줄 카드의 개수
  const [searchResult, setSearchResult] = useState(''); // 검색한 결과
  const [filterValue, setFilterValue] = useState<PriceFilterOption>('가격');
  const queryClient = new QueryClient();

  const {
    data: activityData,
    refetch,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.allActivities, currentPageNumber],
    queryFn: () =>
      getActivities({
        method: 'offset',
        sort: sortByPrice,
        category: selectedCategory,
        page: currentPageNumber,
        size: limit,
        keyword: searchResult,
      }),
    placeholderData: keepPreviousData,
  });

  const [inputSearchText, setInputSearchText] = useState(''); // searchbar의 value state
  const [recentSearchKeywords, setRecentSearchKeywords] = useState<string[]>(
    localStorageGetItem('recentSearchKeywords')?.split(',') ?? [],
  ); // 최근 검색어 배열

  const totalPageNumber = Math.ceil((activityData?.totalCount ?? 0) / limit!);

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
    setRecentSearchKeywords(storedText?.split(',') ?? []);
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
    setSelectedCategory((prev) => (prev === name ? '' : name));
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
        const calc = Math.ceil(((currentPageNumber - 1) * limit! + 1) / changedLimit!);
        setCurrentPageNumber(calc > 0 ? calc : 1);
      }
      setLimit(changedLimit!);
    };

    handleCardLimitByWindowWidth();
  }, [deviceType]);

  useEffect(() => {
    handleSortByPrice(filterValue);
  }, [filterValue]);

  useEffect(() => {
    refetch();
  }, [sortByPrice, selectedCategory, limit, searchResult]);

  useEffect(() => {
    if (isError) toast.error('데이터를 불러오지 못했습니다.');
  }, [isError]);

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.allActivities, currentPageNumber + 1],
      queryFn: () =>
        getActivities({
          method: 'offset',
          sort: sortByPrice,
          category: selectedCategory,
          page: currentPageNumber + 1,
          size: limit,
          keyword: searchResult,
        }),
    });
  }, [currentPageNumber]);

  const searchedByNoData = !!searchResult && activityData?.activities.length === 0; // 검색 시 데이터가 없는 경우

  return {
    handleSearchSubmit,
    handleSearchText,
    inputSearchText,
    recentSearchKeywords,
    searchResult,
    deviceType,
    filterValue,
    setFilterValue,
    selectedCategory,
    handleClickCategory,
    currentPageNumber,
    totalPageNumber,
    handlePaginationByClick,
    activityData,
    searchedByNoData,
  };
};
