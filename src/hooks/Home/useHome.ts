import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';

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
  const [priceFilterValue, setPriceFilterValue] = useState<PriceFilterOption>('가격');
  const [recentSearchKeywords, setRecentSearchKeywords] = useState<string[]>([]);
  const [inputSearchText, setInputSearchText] = useState(''); // searchbar의 value state

  const queryClient = useQueryClient();

  const { data: activityData, isError } = useQuery({
    queryKey: [QUERY_KEYS.allActivities, limit, sortByPrice, selectedCategory, currentPageNumber],
    queryFn: () =>
      getActivities({
        method: 'offset',
        sort: sortByPrice,
        category: selectedCategory,
        page: currentPageNumber,
        size: limit,
      }),
    placeholderData: keepPreviousData,
  });

  const { data: searchData, isPending } = useQuery({
    queryKey: [QUERY_KEYS.allActivities, limit, searchResult],
    queryFn: () =>
      getActivities({
        method: 'offset',
        page: 1,
        size: limit,
        keyword: searchResult,
      }),
  });

  /** Searchbar 검색 후 submit 함수 */
  const handleSearchSubmit = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>,
    text?: string,
  ) => {
    e.preventDefault();

    if (text !== undefined) {
      setSearchResult(text);
      setInputSearchText(text);
    } else {
      setSearchResult(inputSearchText);
    }
    setPriceFilterValue('가격');
    setSortByPrice('latest');
    setSelectedCategory('');

    const trimmedText = text ? text.trim() : inputSearchText.trim();
    if (!trimmedText) return;

    if (recentSearchKeywords.length === 0) {
      setRecentSearchKeywords([trimmedText]);
      localStorageSetItem('recentSearchKeywords', trimmedText);
    } else {
      if (!recentSearchKeywords.includes(trimmedText)) {
        const updatedKeywords = [trimmedText, ...recentSearchKeywords.slice(0, 9)];
        setRecentSearchKeywords(updatedKeywords);
        localStorageSetItem('recentSearchKeywords', updatedKeywords.join(','));
      }
    }
  };

  /** 최신 검색어 삭제 함수 */
  const handleDeleteRecentSearch = (e: MouseEvent<HTMLOrSVGScriptElement>, deletingText: string) => {
    e.stopPropagation();
    e.preventDefault();

    const filteredRecentSearchKeywords = recentSearchKeywords.filter((keyword) => keyword !== deletingText);
    setRecentSearchKeywords(filteredRecentSearchKeywords);
    localStorageSetItem('recentSearchKeywords', filteredRecentSearchKeywords.join(','));
  };

  /** 검색창 input state 실시간 변경 함수 */
  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSearchText(e.target.value);
  };

  /** 버튼 클릭을 통한 페이지 증감 함수(pagination) */
  const handlePaginationByClick = (num: number) => {
    setCurrentPageNumber(num);
  };

  /** 카테고리 버튼 클릭 함수 */
  const handleClickCategory = (name: Category) => {
    setSelectedCategory((prev) => (prev === name ? '' : name));
    setPriceFilterValue('가격');
  };

  /** 정렬 기준 변경 함수 */
  const handleSortByPrice = (val: PriceFilterOption) => {
    if (val === '가격') return;
    const newSortByPrice = val === '낮은 순' ? 'price_asc' : 'price_desc';
    setSortByPrice(newSortByPrice);
  };

  // 첫 렌더링
  useEffect(() => {
    setRecentSearchKeywords(localStorageGetItem('recentSearchKeywords')?.split(',') ?? []);
  }, []);

  useEffect(() => {
    setCurrentPageNumber(1);
    setLimit(calculateLimit(deviceType)!);
  }, [deviceType]);

  useEffect(() => {
    handleSortByPrice(priceFilterValue);
  }, [priceFilterValue]);

  useEffect(() => {
    setCurrentPageNumber(1);
  }, [sortByPrice, selectedCategory, searchResult]);

  useEffect(() => {
    if (isError) toast.error('데이터를 불러오지 못했습니다.');
  }, [isError]);

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.allActivities, limit, sortByPrice, selectedCategory, currentPageNumber + 1],
      queryFn: () =>
        getActivities({
          method: 'offset',
          sort: sortByPrice,
          category: selectedCategory,
          page: currentPageNumber + 1,
          size: limit,
        }),
    });
  }, [currentPageNumber]);

  const searchedByNoData = !!searchResult && searchData?.activities.length === 0; // 검색 시 데이터가 없는 경우
  let totalPageNumber;
  if (searchResult) totalPageNumber = Math.ceil((searchData?.totalCount ?? 0) / limit!);
  else totalPageNumber = Math.ceil((activityData?.totalCount ?? 0) / limit!);

  const showCards = searchResult === '' ? activityData?.activities : searchData?.activities;
  const totalCardsNum = searchResult === '' ? activityData?.totalCount : searchData?.totalCount;

  return {
    handleSearchSubmit,
    handleSearchText,
    inputSearchText,
    recentSearchKeywords,
    searchResult,
    priceFilterValue,
    setPriceFilterValue,
    selectedCategory,
    handleClickCategory,
    currentPageNumber,
    totalPageNumber,
    handlePaginationByClick,
    showCards,
    totalCardsNum,
    searchedByNoData,
    handleDeleteRecentSearch,
    isPending,
  };
};
