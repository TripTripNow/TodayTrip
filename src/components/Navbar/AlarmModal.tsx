import styles from './AlarmModal.module.css';
import CloseIcon from '#/icons/icon-close.svg';
import LightCloseIcon from '#/icons/icon-lightClose.svg';
import RedEllipse from '#/icons/icon-redEllipse.svg';
import BlueEllipse from '#/icons/icon-blueEllipse.svg';
import { Dispatch, SetStateAction, useState } from 'react';
import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';

interface AlarmModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const COUNT = 6;
const TIME = '7분';
const TITLE = '함께하면 즐거운 종민 댄스';
const WHEN = '2023-01-14 15:00-18:00';
const ALARMS = [1, 2, 3];
const APPROVE_STATUS = false;

function AlarmModal({ setIsModalOpen }: AlarmModalProps) {
  const [openStatus, setOpenStatus] = useState(true);

  const handleModalClose = () => {
    setOpenStatus((prev) => !prev);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 250);
  };

  const handleAlarmDelete = () => {};
  return (
    <ModalLayout handleModalClose={handleModalClose} isAlarmModal={true}>
      <div className={openStatus ? styles.alarmModalContainer : styles.alarmModalCloseContainer}>
        <div className={styles.alarmModalHeader}>
          <p>알림 {COUNT}개</p>
          <button onClick={handleModalClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.alarmModalContentContainer}>
          {ALARMS.map((item, index) => (
            <div key={index}>
              <div className={styles.alarmModalContentWrapper}>
                <div className={styles.alarmModalContentHeader}>
                  <div>{APPROVE_STATUS ? <BlueEllipse /> : <RedEllipse />}</div>
                  <button onClick={handleAlarmDelete}>
                    <LightCloseIcon />
                  </button>
                </div>
                <p className={styles.alarmModalContent}>
                  {TITLE}({WHEN}) 예약이{' '}
                  <span className={APPROVE_STATUS ? styles.approveTrue : styles.approveFalse}>
                    {APPROVE_STATUS ? '승인' : '거절'}
                  </span>
                  되었어요.
                </p>
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
