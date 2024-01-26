import styles from './AlarmModal.module.css';
import CloseIcon from '#/icons/icon-close.svg';
import LightCloseIcon from '#/icons/icon-lightClose.svg';
import RedEllipse from '#/icons/icon-redEllipse.svg';
import BlueEllipse from '#/icons/icon-blueEllipse.svg';
import { Dispatch, SetStateAction, useState } from 'react';
import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';

interface AlarmModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  alarmData: {
    notifications: { id: number; content: string; status: string; createdAt: string }[];
    totalCount: number;
  };
}

const TIME = '7분';

function AlarmModal({ setIsModalOpen, alarmData }: AlarmModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleModalClose = () => {
    setIsOpen((prev) => !prev);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 250);
  };

  const handleAlarmDelete = () => {};

  return (
    <ModalLayout handleModalClose={handleModalClose} isAlarmModal={true}>
      <div className={isOpen ? styles.alarmModalContainer : styles.alarmModalCloseContainer}>
        <div className={styles.alarmModalHeader}>
          <p>알림 {alarmData.totalCount}개</p>
          <button onClick={handleModalClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.alarmModalContentContainer}>
          {alarmData.notifications.map((item, index) => (
            <div key={index}>
              <div className={styles.alarmModalContentWrapper}>
                <div className={styles.alarmModalContentHeader}>
                  <div>{item.status === 'approve' ? <BlueEllipse /> : <RedEllipse />}</div>
                  <button onClick={handleAlarmDelete}>
                    <LightCloseIcon />
                  </button>
                </div>
                <p className={styles.alarmModalContent}>{item.content}</p>
                <p className={styles.alarmModalContentTime}>{TIME} 전</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalLayout>
  );
}

export default AlarmModal;
