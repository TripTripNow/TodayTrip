import { MouseEventHandler } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ text }: ButtonProps) {
  return <button className={styles.button}>{text}</button>;
}

export default Button;
