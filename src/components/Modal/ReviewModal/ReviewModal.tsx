import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import styles from './ReviewModal.module.css';
import CloseIcon from '#/icons/icon-close.svg';
function ReviewModal() {
  return (
    <ModalLayout>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.h2}>후기 작성</h2>
          <CloseIcon />
        </div>
      </div>
    </ModalLayout>
  );
}
export default ReviewModal;
