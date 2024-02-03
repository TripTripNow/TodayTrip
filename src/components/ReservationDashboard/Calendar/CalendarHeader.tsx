import CalendarArrow from '#/icons/icon-calendararrow.svg';
import styles from './CalendarHeader.module.css';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function CalendarHeader({ year, month, onPrevMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className={styles.container}>
      <button onClick={onPrevMonth}>
        <CalendarArrow className={styles.rotate} alt="이전 달로 이동" />
      </button>
      <em>
        {year}년 {month}월
      </em>
      <button onClick={onNextMonth}>
        <CalendarArrow alt="다음 달로 이동" />
      </button>
    </div>
  );
}

export default CalendarHeader;
