import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import ReviewModal from '@/components/Modal/ReviewModal/ReviewModal';
import Button from '@/components/common/Button/Button';
import { COMPLETED, PENDING, RESERVATION_STATUS } from '@/constants/reservation';

import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './Card.module.css';
import { priceFormat } from '@/utils/priceFormat';
import dayjs from 'dayjs';
import { Reservation } from '@/types/common/api';

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

  return (
    <>
      <div className={styles.cardWrapper} onClick={() => router.push(`/mypage/reservations/${data.id}`)}>
        <div className={styles.imageWrapper}>
          <Image fill src={data.activity.bannerImageUrl} alt="체험 이미지" />
        </div>
        <div className={styles.detailContainer}>
          <p className={clsx(styles.status, styles[data.status])}>{RESERVATION_STATUS[data.status]}</p>
          <h2 className={styles.h2}>{data.activity.title}</h2>
          <p className={styles.dateDetail}>
            <span>{dayjs(data.date).format('YYYY.MM.DD')}</span>
            <span>·</span>
            <span>
              {data.startTime} - {data.endTime}
            </span>
            <span>·</span>
            <span>{data.headCount}명</span>
          </p>
          <div className={styles.bottom}>
            <p className={styles.price}>￦{priceFormat(data.totalPrice)}</p>
            {data.status === PENDING && (
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
            {data.status === COMPLETED && (
              <Button
                color="green"
                isDisabled={data.reviewSubmitted}
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
          handleCancel={handleCancelModalToggle}
        />
      )}
      {isReviewModalOpen && <ReviewModal handleModalClose={handleReviewModalToggle} data={data} />}
    </>
  );
}
export default Card;
