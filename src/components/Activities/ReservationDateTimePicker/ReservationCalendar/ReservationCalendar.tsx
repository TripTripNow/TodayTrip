import clsx from 'clsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './ReservationCalendar.module.css';
import dayjs from 'dayjs';

function ReservationCalendar({ dateValue, setDateValue, handleCalendarDateChange, handleCalendarMonthChangeInModal }) {
  return (
    <Calendar
      prev2Label={null}
      next2Label={null}
      calendarType="gregory"
      locale="en"
      onChange={handleCalendarDateChange}
      className={styles.customCalendar}
      onActiveStartDateChange={({ activeStartDate }) => {
        setClickedTimeButtonId(null);
        setDateValue(activeStartDate);
      }}
      value={dateValue}
      tileDisabled={({ date }) => {
        // monthlyAvailableScheduleData 배열에서 해당 날짜와 동일한 날짜를 가진 객체가 있는지 확인
        const isDateAvailable = monthlyAvailableScheduleData?.some(
          (item) => item.date === dayjs(date).format('YYYY-MM-DD'),
        );

        // 해당 날짜가 존재하지 않으면 disabled
        return !isDateAvailable;
      }}
      minDate={new Date()}
    />
  );
}

export default ReservationCalendar;
