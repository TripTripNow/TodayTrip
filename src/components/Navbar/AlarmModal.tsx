import styles from './AlarmModal.module.css';
import CloseIcon from '#/icons/icon-close.svg';
import LightCloseIcon from '#/icons/icon-lightClose.svg';
import RedEllipse from '#/icons/icon-redEllipse.svg';
import { Dispatch, SetStateAction, useState } from 'react';
import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import clsx from 'clsx';

interface AlarmModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function AlarmModal({ setIsModalOpen }: AlarmModalProps) {
  const count = 6;
  const time = '7분';
  const title = '함께하면 즐거운 종민 댄스';
  const when = '2023-01-14 15:00-18:00';
  const approve = '승인';
  const alarms = [1, 2, 3];
  const [openStatus, setOpenStatus] = useState(true);

  const handleModalClose = () => {
    setOpenStatus((prev) => !prev);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 250);
  };

  const handleAlarmDelete = () => {};
  return (
    <ModalLayout handleModalClose={handleModalClose} alarmModal={true}>
      <div className={clsx(openStatus ? styles.alarmModalContainer : styles.alarmModalCloseContainer)}>
        <div className={styles.alarmModalHeader}>
          <div>알림 {count}개</div>
          <button onClick={handleModalClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.alarmModalContentContainer}>
          {alarms.map((item, index) => (
            <div key={index}>
              <div className={styles.alarmModalContentWrapper}>
                <div className={styles.alarmModalContentHeader}>
                  <div>
                    <RedEllipse />
                  </div>
                  <button onClick={handleAlarmDelete}>
                    <LightCloseIcon />
                  </button>
                </div>
                <div>
                  {title}({when})예약이 {approve}되었어요.
                </div>
                <div className={styles.alarmModalContentTime}>{time} 전</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalLayout>
  );
}

export default AlarmModal;
