import { useState } from 'react';
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
      {value ? <>{value}</> : <span>{'YY/MM/DD'}</span>}
    </button>
    <CalendarIcon className={styles.icon} alt="달력 모양 아이콘" />
  </label>
);

function DatePickerInput() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className={styles['react-datepicker-custom']}>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        dateFormat={'yy/MM/dd'}
        customInput={<CustomInput value={selectedDate ? String(selectedDate) : ''} />}
      />
    </div>
  );
}

export default DatePickerInput;
