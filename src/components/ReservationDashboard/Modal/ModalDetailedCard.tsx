import clsx from 'clsx';

import { CONFIRMED, PENDING } from '@/constants/calendar';
import Button from '@/components/common/Button/Button';
import { DailyReservationStatusCount, ScheduledReservation } from '@/types/common/api';
import styles from './ModalDetailedCard.module.css';
import Toast from '@/components/common/Toast/Toast';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import useModalDetailedCard from '@/hooks/ReservationDashboard/useModalDetailedCard';

export interface ModalDetailedCardProps {
  item: ScheduledReservation;
  tabStatus: keyof DailyReservationStatusCount;
  isPassedTime: boolean;
  activityId: number;
}

function ModalDetailedCard({ item, tabStatus, isPassedTime, activityId }: ModalDetailedCardProps) {
  const { handleConfirm, handleDecline, alertModalState, handleAlertModalToggle } = useModalDetailedCard({
    item,
    tabStatus,
    activityId,
  });

  return (
    <>
      <Toast />
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
        {tabStatus === PENDING && !isPassedTime && (
          <div className={styles.btnWrapper}>
            <Button type="modalDouble" color="green" onClick={() => handleAlertModalToggle('isConfirmModalOpen')}>
              승인하기
            </Button>
            <Button type="modalDouble" color="white" onClick={() => handleAlertModalToggle('isDeclineModalOpen')}>
              거절하기
            </Button>
          </div>
        )}
        {tabStatus === PENDING && isPassedTime && (
          <div className={clsx(styles.statusWrapper, styles.statusExpired)}>
            <p>만료된 예약</p>
          </div>
        )}

        {tabStatus === CONFIRMED && (
          <div className={clsx(styles.statusWrapper, styles.statusConfirmed)}>
            <p>예약 승인</p>
          </div>
        )}

        {tabStatus !== PENDING && tabStatus !== CONFIRMED && (
          <div className={clsx(styles.statusWrapper, styles.statusDeclined)}>
            <p>예약 거절</p>
          </div>
        )}
      </div>

      {alertModalState.isConfirmModalOpen && (
        <AlertModal
          text="승인하시겠습니까?"
          buttonText="승인"
          handleModalClose={() => handleAlertModalToggle('isConfirmModalOpen')}
          handleActionButtonClick={handleConfirm}
        />
      )}
      {alertModalState.isDeclineModalOpen && (
        <AlertModal
          text="거절하시겠습니까?"
          buttonText="거절"
          handleModalClose={() => handleAlertModalToggle('isDeclineModalOpen')}
          handleActionButtonClick={handleDecline}
        />
      )}
    </>
  );
}

export default ModalDetailedCard;
