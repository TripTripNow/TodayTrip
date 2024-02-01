import styles from './Modal.module.css';

import CloseIcon from '#/icons/icon-close.svg';
import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import ModalContent from '@/components/ReservationDashboard/Modal/ModalContent';
import { useState } from 'react';

interface ModalProps {
  handleModalClose: () => void;
  date: string;
}

function ModalHeader({ handleModalClose }: Pick<ModalProps, 'handleModalClose'>) {
  return (
    <div className={styles.header}>
      <h1>예약 정보</h1>
      <CloseIcon className={styles.closeIcon} alt="닫기" onClick={handleModalClose} />
    </div>
  );
}

function ModalTab() {
  return (
    <div className={styles.tabWrapper}>
      <div className={styles.stroke}></div>
      <div className={styles.tabInnerWrapper}>
        <div className={styles.tab}>
          <span className={styles.tabTextEnabled}>신청</span>
          <span className={styles.tabTextEnabled}>{2}</span>
          <div className={styles.tabEnabledStroke}></div>
        </div>
      </div>
      <div className={styles.tabInnerWrapper}>
        <div className={styles.tab}>
          <span className={styles.tabTextDisabled}>승인</span>
          <span className={styles.tabTextDisabled}>{0}</span>
        </div>
      </div>
      <div className={styles.tabInnerWrapper}>
        <div className={styles.tab}>
          <span className={styles.tabTextDisabled}>거절</span>
          <span className={styles.tabTextDisabled}>{0}</span>
        </div>
      </div>
    </div>
  );
}

function Modal({ handleModalClose, date }: ModalProps) {
  const [dropdownItem, setDropdownItem] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);
  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <div className={styles.container}>
        <ModalHeader handleModalClose={handleModalClose} />
        <ModalTab />
        <ModalContent setDropdownItem={setDropdownItem} items={items} dropdownItem={dropdownItem} />
      </div>
    </ModalLayout>
  );
}

export default Modal;
