import clsx from 'clsx';
import toast from 'react-hot-toast';

import { CONFIRMED, PENDING } from '@/constants/calendar';
import Button from '@/components/common/Button/Button';
import { DailyReservationStatusCount, ScheduledReservation } from '@/types/common/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchReservationsById } from '@/api/myActivities';
import QUERY_KEYS from '@/constants/queryKeys';
import { PatchReservationsParam } from '@/types/myActivities';
import styles from './ModalDetailedCard.module.css';
import Toast from '@/components/common/Toast/Toast';
import { useState } from 'react';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';

interface ModalDetailedCardProps {
  item: ScheduledReservation;
  tabStatus: keyof DailyReservationStatusCount;
}

function ModalDetailedCard({ item, tabStatus }: ModalDetailedCardProps) {
  const [alertModalState, setAlertModalState] = useState<{ isConfirmModalOpen: boolean; isDeclineModalOpen: boolean }>({
    isConfirmModalOpen: false,
    isDeclineModalOpen: false,
  });
  const queryClient = useQueryClient();

  const { mutate: patchReservationMutate } = useMutation({
    mutationFn: (res: PatchReservationsParam) => patchReservationsById(res),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.monthlyReservation] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.timeReservation, item.scheduleId, tabStatus] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.dailyReservation, item.date] });
    },
    onError: () => {
      toast.error('동작에 실패하였습니다.');
    },
  });
  const handleConfirm = async () => {
    toast.success('승인에 성공하셨습니다!');
    handleAlertModalToggle('isConfirmModalOpen');
    await patchReservationMutate({ activityId: item.activityId, reservationId: item.id, status: 'confirmed' });
  };

  const handleDecline = async () => {
    toast.success('거절에 성공하셨습니다!');
    handleAlertModalToggle('isDeclineModalOpen');
    await patchReservationMutate({ activityId: item.activityId, reservationId: item.id, status: 'declined' });
  };

  const handleAlertModalToggle = (modalState: 'isConfirmModalOpen' | 'isDeclineModalOpen') => {
    setAlertModalState((prevState) => ({ ...prevState, [modalState]: !prevState[modalState] }));
  };

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

        {tabStatus === PENDING ? (
          <div className={styles.btnWrapper}>
            <Button type="modalDouble" color="green" onClick={() => handleAlertModalToggle('isConfirmModalOpen')}>
              승인하기
            </Button>
            <Button type="modalDouble" color="white" onClick={() => handleAlertModalToggle('isDeclineModalOpen')}>
              거절하기
            </Button>
          </div>
        ) : tabStatus === CONFIRMED ? (
          <div className={clsx(styles.statusWrapper, styles.statusConfirmed)}>
            <p>예약 승인</p>
          </div>
        ) : (
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
