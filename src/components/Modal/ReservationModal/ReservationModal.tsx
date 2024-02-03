import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import styles from './ReservationModal.module.css';
import CloseIcon from '#/icons/icon-modalClose.svg';
function ReservationModal() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.h2}>날짜</h2>
        <CloseIcon alt="모달 닫기 아이콘" />
      </div>
    </div>
  );
}

export default ReservationModal;
