import ArrowRightIcon from '#/icons/icon-arrowRight.svg';
import { CANCELED, COMPLETED, CONFIRMED, DECLINED, PENDING, RESERVATION_STATUS } from '@/constants/reservation';
import styles from '@/pages/mypage/reservations/[id]/ReservationId.module.css';

interface CheckStatusProps {
  status: string;
}

function CheckStatus({ status }: CheckStatusProps) {
  return (
    <div className={styles.status}>
      {status === CANCELED || status === DECLINED ? (
        <div className={styles[status]}>{RESERVATION_STATUS[status]}</div>
      ) : (
        <>
          <div className={status === PENDING ? styles.active : styles.inactive}>{RESERVATION_STATUS['pending']}</div>
          <ArrowRightIcon alt="예약 신청에서 예약 승인으로 가는 화살표" />
          <div className={status === CONFIRMED ? styles.active : styles.inactive}>
            {RESERVATION_STATUS['confirmed']}
          </div>
          <ArrowRightIcon alt="예약 승인에서 체험 완료로 가는 화살표" />
          <div className={status === COMPLETED ? styles.active : styles.inactive}>
            {RESERVATION_STATUS['completed']}
          </div>
        </>
      )}
    </div>
  );
}

export default CheckStatus;
