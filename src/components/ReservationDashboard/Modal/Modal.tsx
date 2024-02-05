import { useState } from 'react';
import clsx from 'clsx';

import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import ModalContent from '@/components/ReservationDashboard/Modal/ModalContent';
import { RESERVATION_DETAILS_MONTH_DECLIEND_MOCK_DATA } from '@/components/ReservationDashboard/mock';
import { ReservedScheduleItem } from '@/types/api';
import { CALENDAR_MODAL_MAP, STATUS_ARR } from '@/constants/calendar';
import CloseIcon from '#/icons/icon-close.svg';
import styles from './Modal.module.css';

interface ModalProps {
  handleModalClose: () => void;
  date: string;
  items: ReservedScheduleItem[];
  activityId: number;
}

interface ModalTabProps {
  handleStatus: (val: string) => void;
  tabStatus: string;
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

function ModalTab({ handleStatus, tabStatus }: ModalTabProps) {
  const item = RESERVATION_DETAILS_MONTH_DECLIEND_MOCK_DATA;

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
              {item[0].reservations[status]}
            </span>
            {status === tabStatus && <div className={styles.tabEnabledStroke}></div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function Modal({ handleModalClose, date, activityId, items }: ModalProps) {
  const INITIAL_DROPDOWN_ITEM = {
    id: items[0].scheduleId,
    title: `${items[0].startTime} ~ ${items[0].endTime}`,
  };

  const [dropdownItem, setDropdownItem] = useState(INITIAL_DROPDOWN_ITEM);
  const [tabStatus, setTabStatus] = useState('pending');

  const handleStatus = (status: string) => {
    setTabStatus(status);
  };

  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <div className={styles.container}>
        <ModalHeader handleModalClose={handleModalClose} />
        <ModalTab handleStatus={handleStatus} tabStatus={tabStatus} />
        <ModalContent
          setDropdownItem={setDropdownItem}
          items={items}
          dropdownItem={dropdownItem}
          date={date}
          tabStatus={tabStatus}
        />
      </div>
    </ModalLayout>
  );
}

export default Modal;
