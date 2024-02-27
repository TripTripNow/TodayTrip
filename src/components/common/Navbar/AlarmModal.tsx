import styles from './AlarmModal.module.css';
import CloseIcon from '#/icons/icon-close.svg';
import LightCloseIcon from '#/icons/icon-lightClose.svg';
import RedEllipse from '#/icons/icon-redEllipse.svg';
import BlueEllipse from '#/icons/icon-blueEllipse.svg';
import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMyNotifications } from '@/api/myNotifications';
import QUERY_KEYS from '@/constants/queryKeys';
import toast from 'react-hot-toast';
import { changeDateForm } from '@/utils/chageDateForm';
import { Notifications } from '@/types/myNotifications';

interface AlarmModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  targetRef: RefObject<HTMLDivElement>;
  alarmData: Notifications[];
  totalCount: number;
}

function AlarmModal({ setIsModalOpen, targetRef, alarmData, totalCount }: AlarmModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const queryClient = useQueryClient();

  const handleModalClose = () => {
    setIsOpen((prev) => !prev);
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myNotifications] });
    // queryClient.removeQueries({ queryKey: [QUERY_KEYS.myNotifications] });
    setTimeout(() => {
      setIsModalOpen(false);
    }, 250);
  };

  const deleteNotificationMutation = useMutation({
    mutationFn: (notificationId: number) => deleteMyNotifications(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myNotifications] });
    },
    onError: () => {
      toast.error('실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleAlarmDelete = (id: number) => {
    if (
      !deleteNotificationMutation.isPending &&
      queryClient.getQueryState([QUERY_KEYS.myNotifications])?.fetchStatus !== 'fetching'
    ) {
      deleteNotificationMutation.mutate(id);
    }
  };

  return (
    <ModalLayout handleModalClose={handleModalClose} isAlarmModal={true}>
      {alarmData && (
        <div className={isOpen ? styles.alarmModalContainer : styles.alarmModalCloseContainer}>
          <div className={styles.alarmModalHeader}>
            <p>알림 {totalCount}개</p>
            <button onClick={handleModalClose}>
              <CloseIcon alt="닫기 아이콘" />
            </button>
          </div>
          {totalCount ? (
            <>
              <div className={styles.alarmModalContentContainer}>
                {alarmData.map((item: Notifications, index: number) => (
                  <div key={index}>
                    <div className={styles.alarmModalContentWrapper}>
                      <div className={styles.alarmModalContentHeader}>
                        <div className={styles.ellipse}>
                          {item.content.includes('승인') ? (
                            <BlueEllipse alt="예약 승인을 나타내는 아이콘" />
                          ) : (
                            <RedEllipse alt="예약 거절을 나타내는 아이콘" />
                          )}
                        </div>
                        <button onClick={() => handleAlarmDelete(item.id)}>
                          <LightCloseIcon alt="닫기 아이콘" />
                        </button>
                      </div>
                      <p className={styles.alarmModalContent}>{item.content}</p>
                      <p className={styles.alarmModalContentTime}>{changeDateForm(item.createdAt)}</p>
                    </div>
                  </div>
                ))}
                <div ref={targetRef} className={styles.refContainer}>
                  <div></div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.noAlarmWrapper}>알림이 없습니다.</div>
          )}
        </div>
      )}
    </ModalLayout>
  );
}

export default AlarmModal;
