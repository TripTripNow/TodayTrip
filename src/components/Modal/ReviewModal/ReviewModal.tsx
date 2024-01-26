import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import styles from './ReviewModal.module.css';
import CloseIcon from '#/icons/icon-close.svg';
import clsx from 'clsx';
import { reservations } from '@/pages/mypage/reservations/mock';
import formatDateString from '@/utils/formatDateString';
import Image from 'next/image';

function ReviewModal() {
  const data = reservations[4];

  return (
    <ModalLayout>
      <div className={styles.modalWrapper}>
        <div className={styles.header}>
          <h2 className={styles.h2}>후기 작성</h2>
          <CloseIcon />
        </div>
        <div className={styles.cardWrapper}>
          <div className={styles.imageWrapper}>
            <Image fill src={data.activity.bannerImageUrl} alt="체험 이미지" />
          </div>

          <div className={styles.detailContainer}>
            <h2 className={styles.title}>{data.activity.title}</h2>
            <div className={styles.dateDetail}>
              <span>{formatDateString(data.date)}</span>
              <div>·</div>
              <span>
                {data.startTime} - {data.endTime}
              </span>
              <div>·</div>
              <span>{data.headCount}명</span>
            </div>
            <div className={styles.separator}></div>
            <span className={styles.price}>₩{data.totalPrice.toLocaleString('ko-KR')}</span>
          </div>
        </div>

        <div></div>
      </div>
    </ModalLayout>
  );
}
export default ReviewModal;
