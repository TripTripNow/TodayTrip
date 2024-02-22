import DatePickerInput from '@/components/common/DatePicker/DatePicker';
import { useState } from 'react';

function Test() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  return <DatePickerInput setIsSelectedDate={Date}/>;
}

export default Test;
