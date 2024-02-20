import clsx from 'clsx';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

import { CONFIRMED, PENDING } from '@/constants/calendar';
import Button from '@/components/common/Button/Button';
import { DailyReservationStatusCount, ScheduledReservation } from '@/types/common/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchReservationsById } from '@/api/myActivities';
import QUERY_KEYS from '@/constants/queryKeys';
import { PatchReservationsParam } from '@/types/myActivities';
import styles from './ModalDetailedCard.module.css';

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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.timeReservation, item.scheduleId, tabStatus] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.dailyReservation, item.date] });
    },
    onError: () => {
      toast.error('동작에 실패하였습니다.');
    },
  });
  const handleConfirm = async () => {
    Swal.fire({
      title: '승인하시겠습니까?',
      showDenyButton: true,
      confirmButtonColor: 'var(--green0B)',
      denyButtonColor: 'var(--gray79)',
      confirmButtonText: '승인',
      denyButtonText: `취소`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await confirmMutate.mutate({ activityId: item.activityId, reservationId: item.id, status: 'confirmed' });
        Swal.fire({ title: '승인에 성공하셨습니다!', icon: 'success', confirmButtonColor: 'var(--green0B)' });
      }
    });
  };

  const handleDecline = async () => {
    Swal.fire({
      title: '거절하시겠습니까?',
      showDenyButton: true,
      confirmButtonColor: '#DC3741',
      denyButtonColor: 'var(--gray79)',
      confirmButtonText: '거절',
      denyButtonText: `취소`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await confirmMutate.mutate({ activityId: item.activityId, reservationId: item.id, status: 'declined' });
        Swal.fire({ title: '거절에 성공하셨습니다!', icon: 'info', confirmButtonColor: 'var(--green0B)' });
      }
    });
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
