import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import Card, { CardProps } from '@/components/Home/Card/Card';
import card1 from '#/images/carousel1.png';
import LeftArrow from '#/icons/icon-left-arrow.svg';
import RightArrow from '#/icons/icon-right-arrow.svg';
import styles from './PopularExperience.module.css';

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
    bannerImageUrl: card1.src,
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
    bannerImageUrl: card1.src,
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
    bannerImageUrl: card1.src,
    rating: 5,
    reviewCount: 793,
  },
];

function PopularExperience({ deviceType }: { deviceType: string | undefined }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const splideRef = useRef(null);

  /** 버튼을 통한 slide 함수 */
  const handleSlideByBtn = (num: number) => {
    const newIndex = slideIndex + num;
    if (newIndex < 0 || newIndex + 2 >= MOCK_DATA.length) return;

    setSlideIndex((prev) => prev + num);
    if (splideRef.current) {
      (splideRef.current as any).go(newIndex);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🔥 인기 체험</h1>
        {deviceType === 'pc' && (
          <div className={styles.arrowWrapper}>
            {slideIndex === 0 ? (
              <LeftArrow className={clsx(styles.arrow, styles.arrowEnable)} onClick={() => handleSlideByBtn(-1)} />
            ) : (
              <LeftArrow className={clsx(styles.arrow, styles.arrowDisable)} onClick={() => handleSlideByBtn(-1)} />
            )}
            {slideIndex + 3 === MOCK_DATA.length ? (
              <RightArrow className={clsx(styles.arrow, styles.arrowEnable)} onClick={() => handleSlideByBtn(1)} />
            ) : (
              <RightArrow className={clsx(styles.arrow, styles.arrowDisable)} onClick={() => handleSlideByBtn(1)} />
            )}
          </div>
        )}
      </div>

      <Splide
        ref={splideRef}
        onMoved={(object: any, newIndex: number) => {
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
              gap: '3.2rem',
              fixedWidth: '38.4rem',
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
        {MOCK_DATA.map((card) => (
          <SplideSlide tag="div" key={card.id}>
            <Card item={card} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default PopularExperience;
