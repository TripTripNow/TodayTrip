import styles from './AlarmModal.module.css';
import CloseIcon from '#/icons/icon-close.svg';
import LightCloseIcon from '#/icons/icon-lightClose.svg';
import RedEllipse from '#/icons/icon-redEllipse.svg';
import BlueEllipse from '#/icons/icon-blueEllipse.svg';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMyNotifications, getMyNotifications } from '@/api/myNotifications';
import QUERY_KEYS from '@/constants/queryKeys';
import toast from 'react-hot-toast';
import { changeDateForm } from '@/utils/chageDateForm';

interface AlarmModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function AlarmModal({ setIsModalOpen }: AlarmModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const queryClient = useQueryClient();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.myNotifications],
    queryFn: ({ pageParam }) => getMyNotifications(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentCursorId = lastPage.cursorId;
      return currentCursorId;
    },
  });

  const handleModalClose = () => {
    setIsOpen((prev) => !prev);
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
    deleteNotificationMutation.mutate(id);
  };

  const { isVisible, targetRef } = useInfiniteScroll();

  const alarmData = data?.pages.flatMap((page) => page.notifications);
  const totalCount = data?.pages[0].totalCount;

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible]);

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
                {alarmData.map((item, index) => (
                  <div key={index}>
                    <div className={styles.alarmModalContentWrapper}>
                      <div className={styles.alarmModalContentHeader}>
                        <div>
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
                <div ref={targetRef}></div>
              </div>
            </>
          ) : (
            <div className={styles.noAlarmWrapper}>
              <div>알람이 없습니다.</div>
            </div>
          )}
        </div>
      )}
      {!alarmData && <div ref={targetRef} />}
    </ModalLayout>
  );
}

export default AlarmModal;
