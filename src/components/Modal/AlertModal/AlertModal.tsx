import styles from './AlertModal.module.css';
import CheckIcon from '#/icons/icon-check.svg';
import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import clsx from 'clsx';

interface AlertModalProps {
  handleModalClose: () => void;
  handleActionButtonClick: () => void;
  text: string;
  buttonText: string;
  prevent?: boolean;
}
function AlertModal({ handleModalClose, handleActionButtonClick, text, buttonText, prevent }: AlertModalProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleActionButtonClick();
  };

  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <div className={styles.wrapper}>
        <CheckIcon alt="체크 모양 아이콘" />
        <p className={styles.text}>{text}</p>
        <div className={styles.buttonContainer}>
          <button className={clsx(styles.button, styles.white)} onClick={handleModalClose}>
            닫기
          </button>
          <button
            className={clsx(styles.button, styles.primary)}
            onClick={prevent ? handleClick : handleActionButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
export default AlertModal;
