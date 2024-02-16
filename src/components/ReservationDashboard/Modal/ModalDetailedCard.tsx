import clsx from 'clsx';

import { CONFIRMED, PENDING } from '@/constants/calendar';
import Button from '@/components/common/Button/Button';
import styles from './ModalDetailedCard.module.css';
import { DailyReservationStatusCount, ScheduledReservation } from '@/types/common/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchReservationsById } from '@/api/myActivities';
import QUERY_KEYS from '@/constants/queryKeys';
import { PatchReservationsParam } from '@/types/myActivities';

interface ModalDetailedCardProps {
  item: ScheduledReservation;
  tabStatus: keyof DailyReservationStatusCount;
}

function ModalDetailedCard({ item, tabStatus }: ModalDetailedCardProps) {
  const queryClient = useQueryClient();
  const confirmMutate = useMutation({
    mutationFn: (res: PatchReservationsParam) => patchReservationsById(res),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.monthlyReservation] });
    },
  });
  const handleConfirm = () => {
    confirmMutate.mutate({ activityId: item.activityId, reservationId: item.id, status: 'confirmed' });
  };

  const handleDecline = () => {
    confirmMutate.mutate({ activityId: item.activityId, reservationId: item.id, status: 'declined' });
  };
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
          <Button type="modalDouble" color="green" onClick={handleConfirm}>
            승인하기
          </Button>
          <Button type="modalDouble" color="white" onClick={handleDecline}>
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
  );
}

export default ModalDetailedCard;
