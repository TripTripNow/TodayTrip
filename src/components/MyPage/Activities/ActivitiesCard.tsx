import styles from '@/pages/mypage/activities/Activities.module.css';
import Image from 'next/image';
import KebabIcon from '#/icons/icon-kebab.svg';
import DanceImg from '#/images/img-dance.jpg';
import StarIcon from '#/icons/icon-star.svg';
import { useState } from 'react';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import { useRouter } from 'next/router';
import { priceFormat } from '@/utils/priceFormat';

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
  const router = useRouter();
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleKebabBlur = () => {
    setTimeout(() => {
      setIsKebabOpen(false);
    }, 150);
  };

  const handleKebabToggle = () => {
    setIsKebabOpen((prev) => !prev);
  };

  const handleEditButton = (id: number) => {
    // 페이지 이동
    router.push(`/mypage/activities/${id}/edit`);
  };

  const handleDeleteButton = () => {
    setIsDeleteOpen((prev) => !prev);
  };

  const handleDelete = (id: number) => {
    console.log(id, ' 삭제함');
    setIsDeleteOpen(false);
  };

  return (
    <div className={styles.activitiesItemWrapper}>
      <div className={styles.activitiesItemImgDiv}>
        <Image className={styles.activitiesImg} src={DanceImg} alt="체험이미지" priority />
      </div>
      <div className={styles.activitiesItemContent}>
        <div className={styles.activitiesItemContentHeader}>
          <StarIcon alt="별모양아이콘" />
          <p className={styles.activitiesReviewCount}>
            {item.rating.toFixed(1)} ({item.reviewCount})
          </p>
        </div>
        <p className={styles.activitiesItemContentTitle}>{item.title}</p>
        <div className={styles.activitiesItemContentFooter} onBlur={handleKebabBlur}>
          <p>
            ￦{priceFormat(item.price)} <span className={styles.activitiesItemContentFooterCount}>/인</span>
          </p>
          <button onClick={handleKebabToggle}>
            <KebabIcon className={styles.kebabImgWrapper} width={40} height={40} alt="케밥버튼" />
          </button>
          {isKebabOpen && (
            <div className={styles.activitiesKebabWrapper}>
              <button className={styles.activitiesKebabContent} onClick={() => handleEditButton(item.id)}>
                수정하기
              </button>
              <hr className={styles.styleHr} />
              <button className={styles.activitiesKebabContent} onClick={handleDeleteButton}>
                삭제하기
              </button>
            </div>
          )}
          {isDeleteOpen && (
            <AlertModal
              handleModalClose={handleDeleteButton}
              handleCancel={() => handleDelete(item.id)}
              text="체험을 삭제하시겠습니까?"
              buttonText="삭제하기"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivitiesCard;
