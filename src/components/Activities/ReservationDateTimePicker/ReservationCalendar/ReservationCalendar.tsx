import dayjs from 'dayjs';
import Calendar, { OnArgs, TileArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Value } from '@/types/Calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './ReservationCalendar.module.css';
import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { TimeSlot } from '@/types/common/api';
dayjs.extend(customParseFormat);

interface ReservationCalendarProps {
  dateValue: Value;
  setDateValue: Dispatch<SetStateAction<Value>>;
  timeButtonId: number | null;
  setTimeButtonId: Dispatch<SetStateAction<number | null>>;
  monthlyAvailableScheduleData: TimeSlot[] | undefined;
  usage?: 'outer';
  handleResetDateButtonText?: () => void;
}
function ReservationCalendar({
  dateValue,
  setDateValue,
  timeButtonId,
  setTimeButtonId,
  monthlyAvailableScheduleData,
  usage,
  handleResetDateButtonText,
}: ReservationCalendarProps) {
  const handleCalendarDateChange = (value: Value) => {
    setDateValue(value);
    if (timeButtonId) {
      setTimeButtonId(null);
    }
    if (handleResetDateButtonText) {
      handleResetDateButtonText();
    }
  };

  const handleOnActiveStartDateChange = ({ activeStartDate }: OnArgs) => {
    setTimeButtonId(null);
    setDateValue(activeStartDate);

    if (handleResetDateButtonText) {
      handleResetDateButtonText();
    }
  };

  const currentTime = dayjs();

  const handleTileDisabled = ({ date, view }: TileArgs) => {
    if (view === 'year') {
      return false; // 연도 뷰에서는 비활성화하지 않음
    }

    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const availableDate = monthlyAvailableScheduleData?.find((item) => item.date === formattedDate);

    if (!availableDate) {
      return true; // 해당 날짜에 사용 가능한 일정이 없으면 비활성화
    }

    // 오늘이지만, 이미 시간이 지나버린 데이터만 존재한다면 거르기
    let filteredTimes;
    if (currentTime.isSame(date, 'date')) {
      filteredTimes = availableDate.times.filter((time) => {
        const startTime = time.startTime;
        return currentTime.isBefore(dayjs(startTime, 'HH:mm'));
      });
    } else {
      filteredTimes = availableDate.times;
    }

    return filteredTimes.length === 0;
  };

  return (
    <Calendar
      prev2Label={null}
      next2Label={null}
      calendarType="gregory"
      locale="en"
      onChange={handleCalendarDateChange}
      className={clsx(styles.customCalendar, usage === 'outer' && styles.outer)}
      onActiveStartDateChange={handleOnActiveStartDateChange}
      value={dateValue}
      tileDisabled={handleTileDisabled}
      minDate={new Date()}
      minDetail="year"
    />
  );
}

export default ReservationCalendar;
