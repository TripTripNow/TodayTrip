import { MouseEventHandler } from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

export interface ButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  outline?: boolean;
  inactive?: boolean;
}

function Button({ text, onClick, outline, inactive }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.button, styles.common, outline && styles.outline, inactive && styles.inactive)}
    >
      {text}
    </button>
  );
}

export default Button;
