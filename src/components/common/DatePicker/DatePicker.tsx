import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';
import CalendarIcon from '#/icons/icon-calendar.svg';

interface Props {
  value: string;
  onClick?: () => void;
}

const CustomInput = ({ value, onClick }: Props) => (
  <label className={styles.container}>
    <button className={styles.input} onClick={onClick}>
      {String(value)}
    </button>
    <CalendarIcon className={styles.icon} />
  </label>
);

function DatePickerInput() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className={styles['react-datepicker-custom']}>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        dateFormat={'yy/MM/dd'}
        customInput={<CustomInput value={String(selectedDate)} />}
      />
    </div>
  );
}

export default DatePickerInput;
