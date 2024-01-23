import { MouseEventHandler } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
}

export default Button;
