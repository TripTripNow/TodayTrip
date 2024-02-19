import ArrowRightIcon from '#/icons/icon-arrowRight.svg';
import { RESERVATION_STATUS, ReservationStatus } from '@/constants/reservation';
import styles from '@/pages/mypage/reservations/[id]/ReservationId.module.css';

interface CheckStatusProps {
  status: keyof typeof ReservationStatus;
}

const CheckStatus = ({ status }: CheckStatusProps) => {
  return (
    <div className={styles.status}>
      {status === RESERVATION_STATUS.CANCELED || status === RESERVATION_STATUS.DECLINED ? (
        <div className={styles[status]}>{ReservationStatus[status as keyof typeof ReservationStatus]}</div>
      ) : (
        <>
          <div className={status === RESERVATION_STATUS.PENDING ? styles.active : styles.inactive}>
            {ReservationStatus['pending']}
          </div>
          <ArrowRightIcon alt="예약 신청에서 예약 승인으로 가는 화살표" />
          <div className={status === RESERVATION_STATUS.CONFIRMED ? styles.active : styles.inactive}>
            {ReservationStatus['confirmed']}
          </div>
          <ArrowRightIcon alt="예약 승인에서 체험 완료로 가는 화살표" />
          <div className={status === RESERVATION_STATUS.COMPLETED ? styles.active : styles.inactive}>
            {ReservationStatus['completed']}
          </div>
        </>
      )}
    </div>
  );
};

export default CheckStatus;
