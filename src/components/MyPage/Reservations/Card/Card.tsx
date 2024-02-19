import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { patchMyReservationsId } from '@/api/reservations';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import ReviewModal from '@/components/Modal/ReviewModal/ReviewModal';
import Button from '@/components/common/Button/Button';
import { COMPLETED, PENDING, RESERVATION_STATUS } from '@/constants/reservation';
import { Reservation } from '@/types/common/api';
import { priceFormat } from '@/utils/priceFormat';
import styles from './Card.module.css';

interface CardProps {
  data: Reservation;
}

function Card({ data }: CardProps) {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const router = useRouter();

  const handleCancelModalToggle = () => {
    setIsAlertModalOpen((prev) => !prev);
  };

  const handleReviewModalToggle = () => {
    setIsReviewModalOpen((prev) => !prev);
  };

  const patchMyReservationMutation = useMutation({
    mutationFn: () => patchMyReservationsId(data.id),
    onSuccess: () => {
      toast.success('예약이 취소되었습니다.');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const handleCancelReservation = () => {
    patchMyReservationMutation.mutate();
    setIsAlertModalOpen(false);
  };

  const { activity, status, reviewSubmitted, headCount, date, startTime, endTime, totalPrice, id } = data;
  const activityId = data.activity.id;

  return (
    <>
      <div
        className={styles.cardWrapper}
        onClick={() =>
          router.push(
            {
              pathname: `/mypage/reservations/${id}`,
              query: {
                activityId,
                status,
                reviewSubmitted,
                headCount,
                date,
                startTime,
                endTime,
                totalPrice,
              },
            },
            `/mypage/reservations/${id}`,
          )
        }
      >
        <div className={styles.imageWrapper}>
          <Image fill src={activity.bannerImageUrl} alt="체험 이미지" />
        </div>
        <div className={styles.detailContainer}>
          <p className={clsx(styles.status, styles[status])}>{RESERVATION_STATUS[status]}</p>
          <h2 className={styles.h2}>{activity.title}</h2>
          <p className={styles.dateDetail}>
            <span>{dayjs(date).format('YYYY.MM.DD')}</span>
            <span>·</span>
            <span>
              {startTime} - {endTime}
            </span>
            <span>·</span>
            <span>{headCount}명</span>
          </p>
          <div className={styles.bottom}>
            <p className={styles.price}>￦{priceFormat(totalPrice)}</p>
            {status === PENDING && (
              <Button
                color="white"
                type="reservation"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelModalToggle();
                }}
              >
                예약 취소
              </Button>
            )}
            {/* TODO : api 연결 후 handleCancel에 적절한 함수 연결 필요 */}
            {/* 체험 완료일 때만 후기 작성 버튼 보이고, reviewSubmit이 true면 disabled */}
            {status === COMPLETED && (
              <Button
                color="green"
                isDisabled={reviewSubmitted}
                onClick={(e) => {
                  e.stopPropagation();
                  handleReviewModalToggle();
                }}
                type="reservation"
              >
                후기 작성
              </Button>
            )}
          </div>
        </div>
      </div>
      {isAlertModalOpen && (
        <AlertModal
          text="예약을 취소하시겠습니까?"
          buttonText="취소하기"
          handleModalClose={handleCancelModalToggle}
          handleActionButtonClick={handleCancelModalToggle}
        />
      )}
      {isReviewModalOpen && <ReviewModal handleModalClose={handleReviewModalToggle} data={data} />}
    </>
  );
}
export default Card;
