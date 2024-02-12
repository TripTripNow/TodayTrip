import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import Card from '@/components/Home/Card/Card';
import { getActivities } from '@/api/activities/activities';
import QUERY_KEYS from '@/constants/queryKeys';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import LeftArrow from '#/icons/icon-left-arrow.svg';
import styles from './PopularExperience.module.css';

function PopularExperience({ deviceType }: { deviceType: string | undefined }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const splideRef = useRef(null);
  const [cursorId, setCursorId] = useState<number | null | undefined>();
  const { data, refetch } = useQuery({
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
  }, [data]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1>🔥 인기 체험</h1>
        {deviceType === 'pc' && (
          <div className={styles.arrowWrapper}>
            <LeftArrow
              alt="왼쪽 화살표"
              className={clsx(styles.arrow, slideIndex === 0 && styles.arrowEnable)}
              onClick={() => handleSlideByBtn(-1)}
            />
            <LeftArrow
              alt="오른쪽 화살표"
              className={clsx(
                styles.arrow,
                styles.rotateReverse,
                slideIndex + 3 === cardData.length && styles.arrowEnable,
              )}
              onClick={() => handleSlideByBtn(1)}
            />
          </div>
        )}
      </div>

      <Splide
        ref={splideRef}
        onMoved={(object: unknown, newIndex: number) => {
          setSlideIndex(newIndex);
        }}
        options={{
          gap: '2.4rem',
          fixedWidth: '38.4rem',
          pagination: false,
          perPage: 3,
          perMove: 1,
          snap: true,
          breakpoints: {
            1200: {
              perPage: 2,
              gap: '2.8rem',
            },
            767: {
              perPage: 2,
              gap: '1.6rem',
              fixedWidth: '18.6rem',
            },
          },
          clones: undefined,
          arrows: false,
          lazyLoad: 'nearby',
        }}
      >
        {cardData.map((card) => (
          <SplideSlide tag="div" key={card.id}>
            <Card item={card} />
          </SplideSlide>
        ))}
        <div style={{ marginLeft: '-100px' }} ref={targetRef}></div>
      </Splide>
    </section>
  );
}

export default PopularExperience;
