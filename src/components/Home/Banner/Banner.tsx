import Image from 'next/image';
import clsx from 'clsx';

import { useBanner } from '@/hooks/Home/useBanner';
import LinkButton from '@/components/Home/LinkButton/LinkButton';
import MainBanner1 from '#/images/img-mainBanner1.png';
import MainBanner2 from '#/images/img-mainBanner2.png';
import MainBanner3 from '#/images/img-mainBanner3.png';
import LeftArrow from '#/icons/icon-left-arrow.svg';
import styles from './Banner.module.css';

/** 배너에 관련된 정보입니다. */
export const BANNER = [
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
    description: '',
  },
];

function Carousel() {
  const { handleMouseOnSlider, slideRef, handleSlide, handleArrowHover, arrowHover } = useBanner();

  return (
    <div
      className={styles.container}
      onMouseEnter={() => handleMouseOnSlider(true)}
      onMouseLeave={() => handleMouseOnSlider(false)}
    >
      <div className={styles.slider} ref={slideRef}>
        {BANNER.map((data, index) => (
          <div key={data.id} className={styles.bannerContainer}>
            <div className={styles.background}></div>
            <Image
              src={data.src}
              alt={data.title}
              fill
              sizes="100%"
              objectFit="cover"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
            <div className={clsx(data.id !== 3 ? styles.textContainer : styles.textLastContainer)}>
              <h1 className={clsx(styles.mainTitle, data.id === 3 && styles.mainLastTitle)}>{data.title}</h1>
              <pre className={styles.text}>{data.description}</pre>
              {data.id === 3 && <LinkButton />}
            </div>
          </div>
        ))}
      </div>

      <button
        className={styles.leftArrow}
        onClick={() => handleSlide(-1)}
        onMouseEnter={() => handleArrowHover('left', true)}
        onMouseLeave={() => handleArrowHover('left', false)}
        aria-label="배너 왼쪽 화살표"
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
        aria-label="배너 오른쪽 화살표"
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
