import { MouseEventHandler } from 'react';
import styles from './AuthButton.module.css';

interface ButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function AuthButton({ text, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
}

export default AuthButton;
