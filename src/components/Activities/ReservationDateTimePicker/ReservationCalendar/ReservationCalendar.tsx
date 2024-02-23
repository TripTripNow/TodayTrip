import clsx from 'clsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './ReservationCalendar.module.css';
import style from '@/components/Activities/ReservationDateTimePicker/ReservationDateTimePicker.module.css';

function ReservationCalendar({
  dateValue,
  dateButtonText,
  handleReserveModalToggle,
  handleCalendarDateChange,
  handleOnActiveStartDateChange,
  handleTileDisabled,
}: any) {
  return (
    <div className={styles.calendar}>
      <h2 className={style.label}>날짜</h2>
      <button className={styles.selectButton} onClick={handleReserveModalToggle}>
        {dateButtonText}
      </button>

      <Calendar
        prev2Label={null}
        next2Label={null}
        calendarType="gregory"
        locale="en"
        onChange={handleCalendarDateChange}
        className={styles.customCalendar}
        onActiveStartDateChange={handleOnActiveStartDateChange}
        value={dateValue}
        tileDisabled={handleTileDisabled}
        minDate={new Date()}
      />
    </div>
  );
}

export default ReservationCalendar;
