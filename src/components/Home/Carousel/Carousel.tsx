import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import carousel1 from '#/images/carousel1.png';
import carousel2 from '#/images/carousel2.png';
import carousel3 from '#/images/carousel3.png';
import LeftArrow from '#/icons/icon-left-arrow.svg';
import RightArrow from '#/icons/icon-right-arrow.svg';

import styles from './Carousel.module.css';

const MOCK_DATA = [
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
  const slideRef = useRef<HTMLDivElement>(null);
  let slideTimer: NodeJS.Timeout | undefined;

  const [leftArrowHover, setLeftArrowHover] = useState(false);
  const [rightArrowHover, setRightArrowHover] = useState(false);

  const handleSlide = (num: number) => {
    const newIndex = slideIndex + num;

    if (newIndex < 0) {
      setSlideIndex(MOCK_DATA.length - 1);
    } else if (newIndex >= MOCK_DATA.length) {
      setSlideIndex(0);
    } else {
      setSlideIndex((prev) => prev + num);
    }
  };

  const handleSlideAuto = () => {
    if (!mouseOnSlider) {
      slideTimer = setTimeout(() => {
        handleSlide(1);
      }, 5000);
    } else {
      clearTimeout(slideTimer);
    }
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
      onMouseEnter={() => setMouseOnSlider(true)}
      onMouseLeave={() => setMouseOnSlider(false)}
    >
      <div className={styles.slider} ref={slideRef}>
        {MOCK_DATA.map((data) => (
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
        onMouseEnter={() => setLeftArrowHover(true)}
        onMouseLeave={() => setLeftArrowHover(false)}
      >
        <LeftArrow stroke="var(--gray4B)" className={clsx(leftArrowHover ? styles.opacity100 : styles.opacity30)} />
      </button>
      <button
        className={styles.rightArrow}
        onClick={() => handleSlide(1)}
        onMouseEnter={() => setRightArrowHover(true)}
        onMouseLeave={() => setRightArrowHover(false)}
      >
        <RightArrow stroke="var(--gray4B)" className={clsx(rightArrowHover ? styles.opacity100 : styles.opacity30)} />
      </button>
    </div>
  );
}

export default Carousel;
