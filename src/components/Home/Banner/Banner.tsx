import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import MainBanner1 from '#/images/img-mainBanner1.png';
import MainBanner2 from '#/images/img-mainBanner2.png';
import MainBanner3 from '#/images/img-mainBanner3.png';
import LeftArrow from '#/icons/icon-left-arrow.svg';

import styles from './Banner.module.css';
import StyledButton from '@/components/Home/StyledButton/StyledButton';

/** 배너에 관련된 정보입니다. */
const BANNER = [
  {
    id: 1,
    src: MainBanner1,
    title: '여행을 떠나보세요',
    description: `
새로운 모험을 찾고 싶다면, TodayTrip을 만나보세요. 
여행을 더욱 특별하게 만들어 줄 다양한 체험을 제공합니다. ✈️`,
  },
  {
    id: 2,
    src: MainBanner2,
    title: '체험을 등록과 예약',
    description: `
여행 체험을 등록하고 예약할 수 있는 간편한 방법을 제공합니다.`,
  },
  {
    id: 3,
    src: MainBanner3,
    title: '이제 등록하러 가볼까요?',
    description: <StyledButton />,
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
    // handleSlideAuto();

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
              <pre>{data.description}</pre>
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
        <LeftArrow
          alt="왼쪽 화살표"
          stroke="var(--whiteFF)"
          className={clsx(arrowHover.left ? styles.opacity100 : styles.opacity30)}
        />
      </button>
      <button
        className={styles.rightArrow}
        onClick={() => handleSlide(1)}
        onMouseEnter={() => handleArrowHover('right', true)}
        onMouseLeave={() => handleArrowHover('right', false)}
      >
        <LeftArrow
          alt="오른쪽 화살표"
          stroke="var(--whiteFF)"
          className={clsx(styles.rotateReverse, arrowHover.right ? styles.opacity100 : styles.opacity30)}
        />
      </button>
    </div>
  );
}

export default Carousel;
