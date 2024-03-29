import styles from '@/pages/mypage/activities/Activities.module.css';
import Image from 'next/image';
import KebabIcon from '#/icons/icon-kebab.svg';
import StarIcon from '#/icons/icon-star.svg';
import { useState } from 'react';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMyActivity } from '@/api/myActivities';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import QUERY_KEYS from '@/constants/queryKeys';
import { priceFormat } from '@/utils/priceFormat';
import Link from 'next/link';
import clsx from 'clsx';

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
  const queryClient = useQueryClient();

  const deleteMyActivitiesMutation = useMutation({
    mutationFn: (id: number) => deleteMyActivity({ activityId: id }),
    onSuccess: () => {
      toast.success('체험이 성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myActivities] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const handleKebabBlur = () => {
    setIsKebabOpen(false);
  };

  const handleKebabToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsKebabOpen((prev) => !prev);
  };

  const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    router.push(`/mypage/activities/${id}/edit`);
  };

  const handleDeleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDeleteOpen((prev) => !prev);
  };

  const handleDeleteToggle = () => {
    setIsDeleteOpen((prev) => !prev);
  };

  const handleDeleteClick = (id: number) => {
    deleteMyActivitiesMutation.mutate(id);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <Link href={`/activities/${item.id}`}>
        <div className={clsx(styles.activitiesItemWrapper, styles.cardAnimation)}>
          <div className={styles.activitiesItemImgDiv}>
            <Image
              className={styles.activitiesImg}
              src={item.bannerImageUrl}
              alt="체험이미지"
              priority
              width={204}
              height={204}
            />
          </div>
          <div className={styles.activitiesItemContent}>
            <div className={styles.activitiesItemContentHeader}>
              <StarIcon alt="별모양아이콘" />
              <p className={styles.activitiesReviewCount}>
                {item.rating} ({item.reviewCount})
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
                  <button
                    className={styles.activitiesKebabContent}
                    onMouseDown={(e) => handleEditButtonClick(e, item.id)}
                  >
                    수정하기
                  </button>
                  <hr className={styles.styleHr} />
                  <button className={styles.activitiesKebabContent} onMouseDown={handleDeleteButtonClick}>
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
      {isDeleteOpen && (
        <AlertModal
          handleModalClose={handleDeleteToggle}
          handleActionButtonClick={() => handleDeleteClick(item.id)}
          text="체험을 삭제하시겠습니까?"
          buttonText="삭제하기"
          prevent={true}
        />
      )}
    </>
  );
}

export default ActivitiesCard;
