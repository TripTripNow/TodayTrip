import clsx from 'clsx';
import styles from './Chips.module.css';

interface ChipsProps {
  status: '예약' | '완료' | '승인';
  number: number;
}

const CHIP_MAP = {
  예약: 'reserve',
  완료: 'complete',
  승인: 'approve',
};

function Chips({ status, number }: ChipsProps) {
  return (
    <div className={clsx(styles.container, styles[`${CHIP_MAP[status]}State`])}>
      <span className={clsx(styles.text, styles[`${CHIP_MAP[status]}State`])}>{status}</span>
      <span className={clsx(styles.text, styles[`${CHIP_MAP[status]}State`])}>{number}</span>
    </div>
  );
}

export default Chips;
