import { Fragment, useEffect, useRef, useState } from 'react';

import card1 from '#/images/carousel1.png';
import LeftArrow from '#/icons/icon-left-arrow.svg';
import RightArrow from '#/icons/icon-right-arrow.svg';
import Card, { CardProps } from '@/components/Home/Card/Card';
import styles from './PopularExperience.module.css';
import dragScroll from '@/utils/dragScroll';
import inRange from '@/utils/inRange';

import useCarouselSize from '@/hooks/common/useCarouselSize';
import clsx from 'clsx';

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
  const moveWidth = deviceType === 'pc' ? 40.8 : deviceType === 'tablet' ? 41.6 : 20.2;

  const slideRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);

  const { ref, width } = useCarouselSize();

  /** 버튼을 통한 slide 함수 */
  const handleSlide = (num: number) => {
    const newIndex = slideIndex + num;
    if (newIndex < 0 || newIndex + 2 >= MOCK_DATA.length) return;
    setSlideIndex((prev) => prev + num);
  };

  useEffect(() => {
    if (slideRef && slideRef.current) {
      slideRef.current.style.transform = `translateX(-${slideIndex * moveWidth}rem)`;
    }
  }, [slideIndex]);
  const translateX = deviceType === 'pc' ? (-currentIndex * width) / 3 + transX : (-currentIndex * width) / 2 + transX;

  console.log('WIDTH', width);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🔥 인기 체험</h1>
        {deviceType === 'pc' && (
          <div className={styles.arrowWrapper}>
            {slideIndex === 0 ? (
              <LeftArrow className={clsx(styles.arrow, styles.arrowEnable)} onClick={() => handleSlide(-1)} />
            ) : (
              <LeftArrow className={clsx(styles.arrow, styles.arrowDisable)} onClick={() => handleSlide(-1)} />
            )}
            {slideIndex + 3 === MOCK_DATA.length ? (
              <RightArrow className={clsx(styles.arrow, styles.arrowEnable)} onClick={() => handleSlide(1)} />
            ) : (
              <RightArrow className={clsx(styles.arrow, styles.arrowDisable)} onClick={() => handleSlide(1)} />
            )}
          </div>
        )}
      </div>
      <div ref={ref} className={styles.cardContainer}>
        <div
          style={{
            transform: `translateX(${translateX}px)`,
            transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
          }}
          className={styles.cardWrapper}
          ref={slideRef}
          {...dragScroll({
            onDragChange: (deltaX) => {
              setTransX(inRange(deltaX, -width, width));
            },
            onDragEnd: (deltaX) => {
              const cardWidth = moveWidth;
              const maxIndex = MOCK_DATA.length / 2 - 1;
              if (deltaX <= -cardWidth) setCurrentIndex(inRange(currentIndex + 1, 0, maxIndex));
              if (deltaX >= cardWidth) setCurrentIndex(inRange(currentIndex - 1, 0, maxIndex));
              setTransX(0);
            },
          })}
        >
          {MOCK_DATA.map((card) => (
            <Fragment key={card.id}>
              <Card item={card} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularExperience;
