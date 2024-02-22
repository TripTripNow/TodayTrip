import clsx from 'clsx';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import Card from '@/components/Home/Card/Card';
import LeftArrow from '#/icons/icon-left-arrow.svg';
import styles from './PopularExperience.module.css';
import { usePopularExperience } from '@/hooks/Home/usePopularExperience';

function PopularExperience() {
  const { slideIndex, handleSlideByBtn, setSlideIndex, splideRef, cardData } = usePopularExperience();

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1>🔥 인기 체험</h1>
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
              padding: { right: '2.4rem' },
            },
            767: {
              perPage: 2,
              gap: '1.6rem',
              fixedWidth: '18.6rem',
              padding: { right: '1.6rem' },
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
      </Splide>
    </section>
  );
}

export default PopularExperience;
