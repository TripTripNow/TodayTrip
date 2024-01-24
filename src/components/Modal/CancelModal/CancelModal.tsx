import styles from './CancelModal.module.css';
import CheckIcon from '#/icons/icon-check.svg';
import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import clsx from 'clsx';

interface CancelModalProps {
  handleModalClose: () => void;
  handleCancel: () => void;
}
function CancelModal({ handleModalClose, handleCancel }: CancelModalProps) {
  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <div className={styles.wrapper}>
        <CheckIcon />
        <span className={styles.span}>예약을 취소하시겠습니까?</span>
        <div className={styles.buttonContainer}>
          <button className={clsx(styles.button, styles.white)} onClick={handleModalClose}>
            닫기
          </button>
          <button className={clsx(styles.button, styles.primary)} onClick={handleCancel}>
            취소하기
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
export default CancelModal;
