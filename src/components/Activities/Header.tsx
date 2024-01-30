import { useState } from 'react';
import styles from './Header.module.css';
import StarIcon from '#/icons/icon-star.svg';
import LocationIcon from '#/icons/icon-location.svg';
import KebabIcon from '#/icons/icon-kebab.svg';
import { ActivityProps } from '@/pages/activities/[id]';
import Image from 'next/image';

function Header({ data }: { data: ActivityProps }) {
  const [isKebabOpen, setIsKebabOpen] = useState(false);

  const handleKebabBlur = () => {
    setTimeout(() => {
      setIsKebabOpen(false);
    }, 150);
  };

  const handleKebabToggle = () => {
    setIsKebabOpen((prev) => !prev);
  };

  return (
    <>
      <header onBlur={handleKebabBlur} className={styles.header}>
        <div className={styles.info}>
          <p className={styles.category}>{data.category}</p>
          <h1 className={styles.h1}>{data.title}</h1>
          <div style={{ display: 'flex', gap: '1.2rem' }}>
            <p className={styles.rating}>
              <StarIcon />
              {data.rating} ({data.reviewCount})
            </p>
            <p className={styles.location}>
              <LocationIcon />
              {data.address}
            </p>
          </div>
        </div>
        <div>
          <button onClick={handleKebabToggle}>
            <KebabIcon className={styles.kebabWrapper} width={40} height={40} alt="케밥버튼" />
          </button>
          {isKebabOpen && (
            <div className={styles.options}>
              <button className={styles.option}>수정하기</button>
              <hr className={styles.hr} />
              <button className={styles.option}>삭제하기</button>
            </div>
          )}
        </div>
      </header>
      <section className={styles.imageContainer}>
        <div className={styles.bannerImageWrapper}>
          <Image fill src={data.bannerImageUrl} alt="배너 이미지" />
        </div>

        <div className={styles.subImages}>
          {data.subImageUrls.map((subImage) => (
            <div key={subImage.id} className={styles.subImageWrapper}>
              <Image fill src={subImage.imageUrl} alt="서브 이미지" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Header;
