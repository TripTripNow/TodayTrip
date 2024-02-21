import { patchReservationsById } from '@/api/myActivities';
import { ModalDetailedCardProps } from '@/components/ReservationDashboard/Modal/ModalDetailedCard';
import QUERY_KEYS from '@/constants/queryKeys';
import { PatchReservationsParam } from '@/types/myActivities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useModalDetailedCard = ({ item, tabStatus }: ModalDetailedCardProps) => {
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

  return { handleConfirm, handleDecline, alertModalState, handleAlertModalToggle };
};

export default useModalDetailedCard;
