import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import { getActivities } from '@/api/activities';
import QUERY_KEYS from '@/constants/queryKeys';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';

export const usePopularExperience = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const splideRef = useRef(null);
  const [cursorId, setCursorId] = useState<number | null | undefined>();
  const { data, refetch, isError } = useQuery({
    queryKey: [QUERY_KEYS.popularActivities],
    queryFn: () => getActivities({ method: 'cursor', sort: 'most_reviewed', size: 4, cursorId }),
  });
  const [cardData, setCardData] = useState(data?.activities ?? []);
  const { isVisible, targetRef } = useInfiniteScroll();

  /** 버튼을 통한 slide 함수 */
  const handleSlideByBtn = (num: number) => {
    const newIndex = slideIndex + num;
    if (newIndex < 0 || newIndex + 2 >= cardData.length) return;

    setSlideIndex((prev) => prev + num);
    if (splideRef.current) {
      (splideRef.current as any).go(newIndex);
    }
  };

  useEffect(() => {
    if (cursorId === null) return;
    if (isVisible) refetch();
  }, [isVisible]);

  useEffect(() => {
    setCardData((prev) => [...prev, ...(data?.activities ?? [])]);
    setCursorId(data?.cursorId);
    if (isError) toast.error('데이터를 불러오지 못했습니다.');
  }, [data]);

  return { slideIndex, handleSlideByBtn, setSlideIndex, splideRef, targetRef, cardData };
};
