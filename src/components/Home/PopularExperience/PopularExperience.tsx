import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import Card from '@/components/Home/Card/Card';
import { RESERVATION_CARDS_MOCK_DATA } from '@/components/ReservationDashboard/mock';

import LeftArrow from '#/icons/icon-left-arrow.svg';
import RightArrow from '#/icons/icon-right-arrow.svg';

import styles from './PopularExperience.module.css';

function PopularExperience({ deviceType }: { deviceType: string | undefined }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const splideRef = useRef(null);

  /** 버튼을 통한 slide 함수 */
  const handleSlideByBtn = (num: number) => {
    const newIndex = slideIndex + num;
    if (newIndex < 0 || newIndex + 2 >= RESERVATION_CARDS_MOCK_DATA.length) return;

    setSlideIndex((prev) => prev + num);
    if (splideRef.current) {
      (splideRef.current as any).go(newIndex);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1>🔥 인기 체험</h1>
        {deviceType === 'pc' && (
          <div className={styles.arrowWrapper}>
            <LeftArrow
              alt="왼쪽 화살표"
              className={clsx(styles.arrow, {
                [styles.arrowEnable]: slideIndex === 0,
                [styles.arrowDisable]: slideIndex !== 0,
              })}
              onClick={() => handleSlideByBtn(-1)}
            />
            <RightArrow
              alt="오른쪽 화살표"
              className={clsx(
                styles.arrow,
                slideIndex + 3 === RESERVATION_CARDS_MOCK_DATA.length ? styles.arrowEnable : styles.arrowDisable,
              )}
              onClick={() => handleSlideByBtn(1)}
            />
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
              gap: 0,
              fixedWidth: '41.6rem',
            },
            767: {
              perPage: 2,
              gap: 0,
              fixedWidth: '20.2rem',
            },
          },
          clones: undefined,
          arrows: false,
          lazyLoad: 'nearby',
        }}
      >
        {RESERVATION_CARDS_MOCK_DATA.map((card) => (
          <SplideSlide tag="div" key={card.id}>
            <Card item={card} />
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}

export default PopularExperience;
