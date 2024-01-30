import Image from 'next/image';
import styles from './Card.module.css';
import clsx from 'clsx';
import formatDateString from '@/utils/formatDateString';
import { useState } from 'react';
import ReviewModal from '@/components/Modal/ReviewModal/ReviewModal';
import { Reservations } from '@/types/reservations';
import { STATUS } from '@/constants/reservation';
import Button from '@/components/common/Button/Button';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';

function Card({ data }: Reservations) {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const handleCancelModalToggle = () => {
    setIsAlertModalOpen((prev) => !prev);
  };

  const handleReviewModalToggle = () => {
    setIsReviewModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper}>
        <Image fill src={data.activity.bannerImageUrl} alt="체험 이미지" />
      </div>

      <div className={styles.detailContainer}>
        <p className={clsx(styles.status, styles[data.status])}>{STATUS[data.status]}</p>
        <h2 className={styles.h2}>{data.activity.title}</h2>
        <p className={styles.dateDetail}>
          <span>{formatDateString(data.date)}</span>
          <span>·</span>
          <span>
            {data.startTime} - {data.endTime}
          </span>
          <span>·</span>
          <span>{data.headCount}명</span>
        </p>
        <div className={styles.bottom}>
          <p className={styles.price}>￦{data.totalPrice.toLocaleString('ko-KR')}</p>
          {data.status === 'pending' && (
            <Button color="white" onClick={handleCancelModalToggle} type="reservation">
              예약 취소
            </Button>
          )}
          {/* TODO : api 연결 후 handleCancel에 적절한 함수 연결 필요 */}
          {isAlertModalOpen && (
            <AlertModal
              text="예약을 취소하시겠습니까?"
              buttonText="취소하기"
              handleModalClose={handleCancelModalToggle}
              handleCancel={handleCancelModalToggle}
            />
          )}
          {/* 체험 완료일 때만 후기 작성 버튼 보이고, reviewSubmit이 true면 disabled */}
          {data.status === 'completed' && (
            <Button
              color="green"
              isDisabled={data.reviewSubmitted}
              onClick={handleReviewModalToggle}
              type="reservation"
            >
              후기 작성
            </Button>
          )}
          {isReviewModalOpen && <ReviewModal handleModalClose={handleReviewModalToggle} data={data} />}
        </div>
      </div>
    </div>
  );
}
export default Card;
