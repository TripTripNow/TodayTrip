import styles from './AlamModal.module.css';
import CloseIcon from '#/icons/icon-close.svg';
import LightCloseIcon from '#/icons/icon-lightClose.svg';
import { Dispatch, SetStateAction, useState } from 'react';

interface AlamModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function AlamModal({ setIsModalOpen }: AlamModalProps) {
  const count = 6;
  const time = '7분';
  const title = '함께하면 즐거운 스트릿 댄스';
  const when = '2023-01-14 15:00-18:00';
  const approve = '승인';
  const alams = [1, 2, 3];
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.alamModalContainer}>
      <div className={styles.alamModalHeader}>
        <div>알림 {count}개</div>
        <button onClick={handleModalClose}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.alamModalContentContainer}>
        {alams.map((item, index) => (
          <div key={index}>
            <div className={styles.alamModalContentWrapper}>
              <div className={styles.alamModalContentHeader}>
                <div>img</div>
                <LightCloseIcon />
              </div>
              <div>
                {title}({when})예약이 {approve}되었어요.
              </div>
              <div className={styles.alamModalContentTime}>{time} 전</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlamModal;
