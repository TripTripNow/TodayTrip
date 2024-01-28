import styles from '@/pages/mypage/activities/Activities.module.css';
import Image from 'next/image';
import KebabIcon from '#/icons/icon-kebab.svg';
import DanceImg from '#/images/img-dance.jpg';
import StarIcon from '#/icons/icon-star.svg';
import { useState } from 'react';

interface ActivitiesCardProps {
  item: {
    id: number;
    userId: number;
    title: string;
    description: string;
    category: string;
    price: number;
    address: string;
    bannerImageUrl: string;
    rating: number;
    reviewCount: number;
    createdAt: string;
  };
}

function ActivitiesCard({ item }: ActivitiesCardProps) {
  const [isKebabOpen, setIsKebabOpen] = useState(false);

  const handleKebabButton = () => {
    if (isKebabOpen) {
      setTimeout(() => {
        setIsKebabOpen((prev) => !prev);
      });
    } else {
      setIsKebabOpen((prev) => !prev);
    }
  };

  const handleEditButton = (id: number) => {
    console.log('이 수정하기 content의 id 값은 :', id);
  };
  const handleDeleteButton = (id: number) => {
    console.log('이 삭제하기 content의 id 값은 :', id);
  };

  return (
    <div className={styles.activitiesItemWrapper}>
      <div className={styles.activitiesItemImgDiv}>
        <Image className={styles.activitiesImg} src={DanceImg} alt="체험이미지" priority />
      </div>
      <div className={styles.activitiesItemContent}>
        <div className={styles.activitiesItemContentHeader}>
          <StarIcon />
          <p className={styles.activitiesReviewCount}>
            {item.rating} ({item.reviewCount})
          </p>
        </div>
        <p className={styles.activitiesItemContentTitle}>{item.title}</p>
        <div className={styles.activitiesItemContentFooter} onBlur={handleKebabButton}>
          <p>
            ￦{item.price.toLocaleString()} <span className={styles.activitiesItemContentFooterCount}>/인</span>
          </p>
          <button onClick={handleKebabButton}>
            <KebabIcon className={styles.kebabImgWrapper} width={40} height={40} />
          </button>
          {isKebabOpen && (
            <div className={styles.activitiesKebabWrapper}>
              <button className={styles.activitiesKebabContent} onClick={() => handleEditButton(item.id)}>
                수정하기
              </button>
              <hr className={styles.styleHr} />
              <button className={styles.activitiesKebabContent} onClick={() => handleDeleteButton(item.id)}>
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivitiesCard;
