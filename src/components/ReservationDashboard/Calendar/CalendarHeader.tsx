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
      <CalendarArrow
        className={styles.calendarArrow}
        alt="캘린더 왼쪽 화살표"
        style={{ rotate: '180deg' }}
        onClick={onPrevMonth}
      />
      <em>
        {year}년 {month}월
      </em>
      <CalendarArrow className={styles.calendarArrow} alt="캘린더 오른쪽 화살표" onClick={onNextMonth} />
    </div>
  );
}

export default CalendarHeader;
