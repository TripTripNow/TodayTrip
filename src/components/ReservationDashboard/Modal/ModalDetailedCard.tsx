import clsx from 'clsx';

import { RESERVATION_DETAILS_MODAL_DETAILED_TIME_MOCK_DATA_PROPS } from '@/components/ReservationDashboard/mock';
import { CONFIRMED, PENDING } from '@/constants/calendar';
import Button from '@/components/common/Button/Button';
import styles from './ModalDetailedCard.module.css';

function ModalDetailedCard({
  item,
  tabStatus,
}: {
  item: RESERVATION_DETAILS_MODAL_DETAILED_TIME_MOCK_DATA_PROPS['reservations'][0];
  tabStatus: string;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <p>
          <span className={styles.subTitle}>닉네임</span>
          <span className={styles.subText}>{item.nickname}</span>
        </p>
        <p>
          <span className={styles.subTitle}>인원</span>
          <span className={styles.subText}>{item.headCount}명</span>
        </p>
      </div>

      {tabStatus === PENDING ? (
        <div className={styles.btnWrapper}>
          <Button type="modalDouble" color="green">
            확정하기
          </Button>
          <Button type="modalDouble" color="white">
            거절하기
          </Button>
        </div>
      ) : tabStatus === CONFIRMED ? (
        <div className={clsx(styles.statusBtn, styles.statusConfirmed)}>
          <p>예약 승인</p>
        </div>
      ) : (
        <div className={clsx(styles.statusBtn, styles.statusDeclined)}>
          <p>예약 거절</p>
        </div>
      )}
    </div>
  );
}

export default ModalDetailedCard;
