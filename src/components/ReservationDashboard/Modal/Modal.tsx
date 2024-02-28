import clsx from 'clsx';

import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import ModalContent from '@/components/ReservationDashboard/Modal/ModalContent';
import { CALENDAR_MODAL_MAP, STATUS_ARR } from '@/constants/calendar';
import { DailyReservationStatusCount } from '@/types/common/api';
import CloseIcon from '#/icons/icon-close.svg';
import styles from './Modal.module.css';
import useModal from '@/hooks/ReservationDashboard/useModal';

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
  const { dailyReservationData, handleStatus, tabStatus, tabCount, setDropdownItem, dropdownItem } = useModal({
    date,
    activityId,
  });

  if (!dailyReservationData || dropdownItem.id === 0) return null;
  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <div className={styles.container}>
        {dailyReservationData && (
          <>
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
          </>
        )}
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
