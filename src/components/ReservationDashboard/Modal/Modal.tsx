import { useEffect, useState } from 'react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import ModalContent from '@/components/ReservationDashboard/Modal/ModalContent';
import { CALENDAR_MODAL_MAP, STATUS_ARR } from '@/constants/calendar';
import { DailyReservationStatusCount } from '@/types/common/api';
import { getReservedSchedule } from '@/api/myActivities';
import QUERY_KEYS from '@/constants/queryKeys';
import CloseIcon from '#/icons/icon-close.svg';
import styles from './Modal.module.css';

interface ModalProps {
  handleModalClose: () => void;
  date: string;
  activityId: number;
}

interface ModalTabProps {
  handleStatus: (val: keyof DailyReservationStatusCount) => void;
  tabStatus: string;
  item: DailyReservationStatusCount | undefined;
}

function Modal({ handleModalClose, date, activityId }: ModalProps) {
  const {
    data: dailyReservationData,
    isError,
    isPending,
  } = useQuery({
    queryKey: [QUERY_KEYS.dailyReservation, date],
    queryFn: () => getReservedSchedule({ activityId, date }),
  });

  const [dropdownItem, setDropdownItem] = useState<{ id: number; title: string }>({ id: 0, title: '' });
  const [tabStatus, setTabStatus] = useState<keyof DailyReservationStatusCount>('pending');

  const handleStatus = (status: keyof DailyReservationStatusCount) => {
    setTabStatus(status);
  };

  const tabCount = dailyReservationData?.find((item) => item.scheduleId === dropdownItem.id)?.count;

  useEffect(() => {
    if (dailyReservationData && dailyReservationData.length > 0 && dropdownItem.id === 0)
      setDropdownItem({
        id: dailyReservationData[0].scheduleId,
        title: `${dailyReservationData[0].startTime} ~ ${dailyReservationData[0].endTime}`,
      });
  }, [dailyReservationData]);

  useEffect(() => {
    if (isError) toast.error('데이터를 불러올 수 없습니다.');
  }, [isError]);

  if (!dailyReservationData || dailyReservationData.length === 0 || dropdownItem.id === 0 || isPending) return null;
  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <div className={styles.container}>
        <ModalHeader handleModalClose={handleModalClose} />
        <ModalTab handleStatus={handleStatus} tabStatus={tabStatus} item={tabCount} />
        <ModalContent
          setDropdownItem={setDropdownItem}
          items={dailyReservationData}
          dropdownItem={dropdownItem}
          date={date}
          tabStatus={tabStatus}
          activityId={activityId}
        />
      </div>
    </ModalLayout>
  );
}

function ModalHeader({ handleModalClose }: Pick<ModalProps, 'handleModalClose'>) {
  return (
    <div className={styles.header}>
      <h1>예약 정보</h1>
      <button>
        <CloseIcon alt="닫기" onClick={handleModalClose} />
      </button>
    </div>
  );
}

function ModalTab({ handleStatus, tabStatus, item: tabItem }: ModalTabProps) {
  if (!tabItem) return null;
  return (
    <div className={styles.tabWrapper}>
      <div className={styles.stroke}></div>
      {STATUS_ARR.map((status, index) => (
        <div className={styles.tabInnerWrapper} key={index}>
          <div className={styles.tab} onClick={() => handleStatus(status)}>
            <button className={clsx(styles.tabButton, status === tabStatus && styles.tabTextEnabled)}>
              {`${CALENDAR_MODAL_MAP[status]} ${tabItem[status]}`}
            </button>
            {status === tabStatus && <div className={styles.tabEnabledStroke}></div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Modal;
