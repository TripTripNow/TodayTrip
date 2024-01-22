import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <h3>Date Picker</h3>
      <ReactDatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
    </div>
  );
}

export default DatePicker;
