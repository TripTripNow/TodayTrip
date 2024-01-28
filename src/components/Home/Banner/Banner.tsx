import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import carousel1 from '#/images/carousel1.png';
import carousel2 from '#/images/carousel2.png';
import carousel3 from '#/images/carousel3.png';
import LeftArrow from '#/icons/icon-left-arrow.svg';
import RightArrow from '#/icons/icon-right-arrow.svg';

import styles from './Banner.module.css';

/** 배너에 관련된 정보입니다. */
const BANNER = [
  {
    id: 1,
    src: carousel1,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: '1월의 인기 체험 BEST 🔥',
  },
  {
    id: 2,
    src: carousel2,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: '1월의 인기 체험 BEST 🔥',
  },
  {
    id: 3,
    src: carousel3,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: '1월의 인기 체험 BEST 🔥',
  },
];

function Carousel() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [mouseOnSlider, setMouseOnSlider] = useState(false);
  const [arrowHover, setArrowHover] = useState({ left: false, right: false });

  const slideRef = useRef<HTMLDivElement>(null);
  let slideTimer: NodeJS.Timeout | undefined;

  // 화살표 버튼을 통한 slide 함수
  const handleSlide = (num: number) => {
    setSlideIndex((prev) => (prev + num + BANNER.length) % BANNER.length);
  };

  // 캐러셀 자동 넘기기 함수
  const handleSlideAuto = () => {
    if (!mouseOnSlider) {
      slideTimer = setTimeout(() => {
        handleSlide(1);
      }, 5000);
    } else {
      clearTimeout(slideTimer);
    }
  };

  const handleMouseOnSlider = (bool: boolean) => {
    setMouseOnSlider(bool);
  };

  const handleArrowHover = (direction: string, bool: boolean) => {
    setArrowHover((prev) => ({ ...prev, [direction]: bool }));
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
    handleSlideAuto();

    return () => clearTimeout(slideTimer);
  }, [slideIndex, mouseOnSlider]);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => handleMouseOnSlider(true)}
      onMouseLeave={() => handleMouseOnSlider(false)}
    >
      <div className={styles.slider} ref={slideRef}>
        {BANNER.map((data) => (
          <div key={data.id} className={styles.bannerContainer}>
            <div className={styles.background}></div>
            <Image src={data.src} alt={String(data.id)} fill />
            <div className={styles.textContainer}>
              <h1>{data.title}</h1>
              <p>{data.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className={styles.leftArrow}
        onClick={() => handleSlide(-1)}
        onMouseEnter={() => handleArrowHover('left', true)}
        onMouseLeave={() => handleArrowHover('left', false)}
      >
        <LeftArrow stroke="var(--gray4B)" className={clsx(arrowHover.left ? styles.opacity100 : styles.opacity30)} />
      </button>
      <button
        className={styles.rightArrow}
        onClick={() => handleSlide(1)}
        onMouseEnter={() => handleArrowHover('right', true)}
        onMouseLeave={() => handleArrowHover('right', false)}
      >
        <RightArrow stroke="var(--gray4B)" className={clsx(arrowHover.right ? styles.opacity100 : styles.opacity30)} />
      </button>
    </div>
  );
}

export default Carousel;
