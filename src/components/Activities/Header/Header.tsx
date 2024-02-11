import { useState } from 'react';
import styles from './Header.module.css';
import StarIcon from '#/icons/icon-star.svg';
import LocationIcon from '#/icons/icon-location.svg';
import KebabIcon from '#/icons/icon-kebab.svg';
import Image from 'next/image';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import { ActivityWithSubImages } from '@/types/common/api';

function Header({ data }: { data: ActivityWithSubImages }) {
  const [isKebabOpen, setIsKebabOpen] = useState(false);

  const handleKebabBlur = () => {
    setTimeout(() => {
      setIsKebabOpen(false);
    }, 150);
  };

  const handleKebabToggle = () => {
    setIsKebabOpen((prev) => !prev);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteModalToggle = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  return (
    <>
      <header onBlur={handleKebabBlur} className={styles.header}>
        <div className={styles.info}>
          <p className={styles.category}>{data.category}</p>
          <h1 className={styles.h1}>{data.title}</h1>
          <div className={styles.ratingAndLocation}>
            <p className={styles.rating}>
              <StarIcon alt="별점 아이콘" />
              {data.rating} ({data.reviewCount})
            </p>
            <p className={styles.location}>
              <LocationIcon alt="지도 마커 아이콘" />
              {data.address}
            </p>
          </div>
        </div>
        <div>
          <button onClick={handleKebabToggle}>
            <KebabIcon className={styles.kebabButton} width={40} height={40} alt="케밥 버튼" />
          </button>
          {isKebabOpen && (
            <div className={styles.options}>
              <button className={styles.option}>수정하기</button>
              <hr className={styles.hr} />
              <button className={styles.option} onClick={handleDeleteModalToggle}>
                삭제하기
              </button>
            </div>
          )}
        </div>
      </header>
      <section className={styles.imageContainer}>
        <div className={styles.bannerImageWrapper}>
          <Image fill src={data.bannerImageUrl} alt="배너 이미지" />
        </div>

        <div className={data.subImageUrls.length === 1 ? styles.oneSubImage : styles.subImages}>
          {data.subImageUrls.map((subImage) => (
            <div
              key={subImage.id}
              className={data.subImageUrls.length === 1 ? styles.oneSubImageWrapper : styles.subImageWrapper}
            >
              <Image fill src={subImage.imageUrl} alt="서브 이미지" />
            </div>
          ))}
        </div>
      </section>

      {isDeleteModalOpen && (
        <AlertModal
          handleModalClose={handleDeleteModalToggle}
          handleCancel={handleDeleteModalToggle}
          buttonText="삭제하기"
          text="체험을 삭제하시겠습니까?"
        />
      )}
    </>
  );
}

export default Header;
