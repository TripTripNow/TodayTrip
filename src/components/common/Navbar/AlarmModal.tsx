import styles from './AlarmModal.module.css';
import CloseIcon from '#/icons/icon-close.svg';
import LightCloseIcon from '#/icons/icon-lightClose.svg';
import RedEllipse from '#/icons/icon-redEllipse.svg';
import BlueEllipse from '#/icons/icon-blueEllipse.svg';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyNotifications } from '@/api/myNotifications';
import QUERY_KEYS from '@/constants/queryKeys';

interface AlarmModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function AlarmModal({ setIsModalOpen }: AlarmModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleModalClose = () => {
    setIsOpen((prev) => !prev);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 250);
  };

  const handleAlarmDelete = () => {};

  const { isVisible, targetRef } = useInfiniteScroll();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.myNotifications],
    queryFn: ({ pageParam }) => getMyNotifications(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentCursorId = lastPage.cursorId;
      return currentCursorId;
    },
  });

  const alarmData = data?.pages.flatMap((page) => page.notifications);
  const totalCount = data?.pages.flatMap((page) => page.totalCount);

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible]);

  useEffect(() => {
    console.log(data);
    console.log(alarmData);
  }, [alarmData]);

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
                          {/* {item.status === 'approve' ? (
                            <BlueEllipse alt="예약 승인을 나타내는 아이콘" />
                          ) : (
                            <RedEllipse alt="예약 거절을 나타내는 아이콘" />
                          )} */}
                        </div>
                        <button onClick={handleAlarmDelete}>
                          <LightCloseIcon alt="닫기 아이콘" />
                        </button>
                      </div>
                      {/* <p className={styles.alarmModalContent}>{item}</p> */}
                      <p className={styles.alarmModalContentTime}>전</p>
                    </div>
                  </div>
                ))}
              </div>
              <div ref={targetRef}></div>
            </>
          ) : (
            <div className={styles.noAlarmWrapper}>
              <div>알람이 없습니다.</div>
            </div>
          )}
        </div>
      )}
    </ModalLayout>
  );
}

export default AlarmModal;
