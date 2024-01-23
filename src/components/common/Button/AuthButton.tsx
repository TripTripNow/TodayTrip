import styles from './Button.module.css';
import clsx from 'clsx';
import { ButtonProps } from '@/components/common/Button/Button';

function AuthButton({ text, onClick, inactive }: ButtonProps) {
  return (
    <button onClick={onClick} className={clsx(styles.button, styles.auth, inactive && styles.inactive)}>
      {text}
    </button>
  );
}

export default AuthButton;
