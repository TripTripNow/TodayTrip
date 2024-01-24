import Image from 'next/image';
import styles from './Card.module.css';
import clsx from 'clsx';
import formatDateString from '@/utils/formatDateString';
import CancelModal from '@/components/Modal/CancelModal/CancelModal';
import { useState } from 'react';

type Activity = {
  bannerImageUrl: string;
  title: string;
  id: number;
};

type Status = 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';

export interface CardProps {
  data: {
    id: number;
    activity: Activity;
    scheduleId: number;
    status: Status;
    reviewSubmitted: boolean;
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
  };
}

function Card({ data }: CardProps) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsCancelModalOpen((prev) => !prev);
  };

  const convertStatusToDisplayText = (status: Status) => {
    switch (status) {
      case 'pending':
        return '예약 완료';
      case 'confirmed':
        return '예약 승인';
      case 'declined':
        return '예약 거절';
      case 'canceled':
        return '예약 취소';
      case 'completed':
        return '체험 완료';
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper}>
        <Image fill src={data.activity.bannerImageUrl} alt="체험 이미지" />
      </div>

      <div className={styles.detailContainer}>
        <span className={clsx(styles.status, styles[data.status])}>{convertStatusToDisplayText(data.status)}</span>
        <h2 className={styles.h2}>{data.activity.title}</h2>
        <div className={styles.dateDetail}>
          <span>{formatDateString(data.date)}</span>
          <div>·</div>
          <span>
            {data.startTime} - {data.endTime}
          </span>
          <div>·</div>
          <span>{data.headCount}명</span>
        </div>
        <div className={styles.bottom}>
          <span className={styles.price}>₩{data.totalPrice.toLocaleString('ko-KR')}</span>
          {data.status === 'pending' && (
            <button onClick={handleModalToggle} className={styles.button}>
              예약 취소
            </button>
          )}
          {isCancelModalOpen && <CancelModal handleModalClose={handleModalToggle} handleCancel={handleModalToggle} />}
          {data.status === 'completed' && (
            <button disabled={data.reviewSubmitted} className={styles.button}>
              후기 작성
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Card;
