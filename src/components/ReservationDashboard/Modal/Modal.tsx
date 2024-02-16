import { useState } from 'react';
import clsx from 'clsx';

import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import ModalContent from '@/components/ReservationDashboard/Modal/ModalContent';
import { GetReservedScheduleRes } from '@/types/myActivities';
import { CALENDAR_MODAL_MAP, STATUS_ARR } from '@/constants/calendar';
import CloseIcon from '#/icons/icon-close.svg';
import styles from './Modal.module.css';
import { DailyReservationStatusCount } from '@/types/common/api';

interface ModalProps {
  handleModalClose: () => void;
  date: string;
  items: GetReservedScheduleRes[];
  activityId: number;
}

interface ModalTabProps {
  handleStatus: (val: keyof DailyReservationStatusCount) => void;
  tabStatus: string;
  item: DailyReservationStatusCount | undefined;
}

function Modal({ handleModalClose, date, activityId, items }: ModalProps) {
  const INITIAL_DROPDOWN_ITEM = {
    id: items ? items[0].scheduleId : 0,
    title: items ? `${items[0].startTime} ~ ${items[0].endTime}` : '0',
  };
  const [dropdownItem, setDropdownItem] = useState(INITIAL_DROPDOWN_ITEM);
  const [tabStatus, setTabStatus] = useState<keyof DailyReservationStatusCount>('pending');

  const handleStatus = (status: keyof DailyReservationStatusCount) => {
    setTabStatus(status);
  };

  const selectedItem = items.find((item) => item.scheduleId === dropdownItem.id);

  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <div className={styles.container}>
        <ModalHeader handleModalClose={handleModalClose} />
        <ModalTab handleStatus={handleStatus} tabStatus={tabStatus} item={selectedItem?.count} />
        <ModalContent
          setDropdownItem={setDropdownItem}
          items={items}
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

function ModalTab({ handleStatus, tabStatus, item }: ModalTabProps) {
  if (!item) return null;

  return (
    <div className={styles.tabWrapper}>
      <div className={styles.stroke}></div>
      {STATUS_ARR.map((status, index) => (
        <div className={styles.tabInnerWrapper} key={index}>
          <div className={styles.tab} onClick={() => handleStatus(status)}>
            <span className={clsx(status === tabStatus ? styles.tabTextEnabled : styles.tabTextDisabled)}>
              {CALENDAR_MODAL_MAP[status]}
            </span>
            <span className={clsx(status === tabStatus ? styles.tabTextEnabled : styles.tabTextDisabled)}>
              {item[status]}
            </span>
            {status === tabStatus && <div className={styles.tabEnabledStroke}></div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Modal;
