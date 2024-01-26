import clsx from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.css';

type Color = 'green' | 'white';

type ButtonType =
  | 'default'
  | 'auth'
  | 'search'
  | 'category'
  | 'activity'
  | 'reservation'
  | 'modalSingle'
  | 'modalDouble'
  | 'time';

export interface ButtonProps {
  children: ReactNode;
  color: Color;
  type: ButtonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, onClick, color, type }: ButtonProps) {
  return (
    <button onClick={onClick} className={clsx(styles.button, styles[type], styles[color])}>
      {children}
    </button>
  );
}

export default Button;
