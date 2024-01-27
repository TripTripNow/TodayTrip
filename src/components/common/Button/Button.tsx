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
  isDisabled?: boolean;
}

function Button({ children, onClick, color, type, isDisabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} className={clsx(styles.button, styles[type], styles[color])} disabled={isDisabled}>
      {children}
    </button>
  );
}

export default Button;
