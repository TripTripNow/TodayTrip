import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function Test2() {
  const [value, onChange] = useState<Value>(new Date());

  return <div></div>;
}
export default Test2;
