import styles from './Button.module.css';
import clsx from 'clsx';
import { ButtonProps } from '@/components/common/Button/Button';

function CategoryButton({ text, onClick, outline }: ButtonProps) {
  return (
    <button onClick={onClick} className={clsx(styles.button, styles.category, outline && styles.outline)}>
      {text}
    </button>
  );
}

export default CategoryButton;
