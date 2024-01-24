import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePickerInput.module.css';
import CalendarIcon from '#/icons/icon-calendar.svg';

interface Props {
  value?: Date | string;
  onClick?: () => void;
}

function DatePickerInput() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const CustomInput = forwardRef<HTMLButtonElement | null>(({ value, onClick }: Props, ref) => (
    <label className={styles.container}>
      <button className={styles.input} onClick={onClick} ref={ref}>
        {value !== undefined ? String(value) : ''}
      </button>
      <CalendarIcon className={styles.icon} />
    </label>
  ));

  CustomInput.displayName = 'CustomInput';

  return (
    <div>
      <h3>Date Picker</h3>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        dateFormat={'yy/MM/dd'}
        customInput={<CustomInput />}
      />
    </div>
  );
}

export default DatePickerInput;
