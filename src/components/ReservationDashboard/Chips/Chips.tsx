import clsx from 'clsx';
import styles from './Chips.module.css';
import { CHIP_MAP } from '@/constants/calendar';

interface ChipsProps {
  status: 'pending' | 'confirmed' | 'completed';
  number: number;
}

function Chips({ status, number }: ChipsProps) {
  return (
    <div className={clsx(styles.container, styles[`${status}State`])}>
      <span>{CHIP_MAP[status]}</span>
      <span>{number}</span>
    </div>
  );
}

export default Chips;
