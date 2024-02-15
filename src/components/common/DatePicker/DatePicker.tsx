import { Dispatch, SetStateAction, forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';
import CalendarIcon from '#/icons/icon-calendar.svg';
import dayjs from 'dayjs';

interface Props {
  value: string;
  onClick?: () => void;
}

interface DatePickerInputProps {
  setIsSelectedDate: Dispatch<SetStateAction<string>>;
}

const CustomInput = forwardRef<HTMLButtonElement, Props>(({ value, onClick }, ref) => (
  <label className={styles.container}>
    <button
      ref={ref}
      className={styles.input}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      {value ? <>{value}</> : <span>{'YY/MM/DD'}</span>}
    </button>
    <CalendarIcon className={styles.icon} alt="달력 모양 아이콘" />
  </label>
));

CustomInput.displayName = 'CustomInput';

function DatePickerInput({ setIsSelectedDate }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className={styles['react-datepicker-custom']}>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => {
          setSelectedDate(date);
          setIsSelectedDate(dayjs(date).format('YYYY-MM-DD'));
        }}
        dateFormat={'yy/MM/dd'}
        customInput={<CustomInput value={selectedDate ? String(selectedDate) : ''} />}
        dayClassName={(d) => (d.getDate() === selectedDate?.getDate() ? styles.selectedDay : styles.unselectedDay)}
      />
    </div>
  );
}

export default DatePickerInput;
