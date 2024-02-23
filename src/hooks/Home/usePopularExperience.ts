import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import { getActivities } from '@/api/activities';
import QUERY_KEYS from '@/constants/queryKeys';

export const usePopularExperience = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const splideRef = useRef(null);
  const { data: popularActivityData, isError } = useQuery({
    queryKey: [QUERY_KEYS.popularActivities],
    queryFn: () => getActivities({ method: 'cursor', sort: 'most_reviewed', size: 10 }),
  });
  const cardData = popularActivityData?.activities ?? [];

  /** 버튼을 통한 slide 함수 */
  const handleSlideByBtn = (num: number) => {
    const newIndex = slideIndex + num;
    if (newIndex < 0 || newIndex + 2 >= cardData.length) return;

    setSlideIndex((prev) => prev + num);
    if (splideRef.current) {
      (splideRef.current as any).go(newIndex);
    }
  };

  /** 에러 관련 useEffect */
  useEffect(() => {
    if (isError) toast.error('데이터를 불러오지 못했습니다.');
  }, [isError]);

  return { slideIndex, handleSlideByBtn, setSlideIndex, splideRef, cardData };
};
