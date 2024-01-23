import styles from './Button.module.css';
import clsx from 'clsx';
import { ButtonProps } from '@/components/common/Button/Button';

function AddActivityButton({ text, onClick, outline, inactive }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.button, styles.activityAdd, outline && styles.outline, inactive && styles.inactive)}
    >
      {text}
    </button>
  );
}

export default AddActivityButton;
