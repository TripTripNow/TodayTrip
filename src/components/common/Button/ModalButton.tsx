import styles from './Button.module.css';
import clsx from 'clsx';
import { ButtonProps } from '@/components/common/Button/Button';

interface ModalButtonProps extends ButtonProps {
  type: 'confirm' | 'time';
}

function ModalButton({ text, onClick, outline, type }: ModalButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.button, outline && styles.outline, type === 'confirm' ? styles.confirm : styles.time)}
    >
      {text}
    </button>
  );
}

export default ModalButton;
