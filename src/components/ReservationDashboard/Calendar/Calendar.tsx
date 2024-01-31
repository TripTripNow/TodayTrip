import { useState } from 'react';

import Chips from '@/components/ReservationDashboard/Chips/Chips';
import CalendarHeader from '@/components/ReservationDashboard/Calendar/CalendarHeader';

import styles from './Calendar.module.css';
import { calculateDaysInMonth } from '@/utils/calculateDaysInMonth';
import Modal from '@/components/ReservationDashboard/Modal/Modal';

const WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
const DAYS_IN_SHORT_MONTH = 35;
const DAYS_IN_LONG_MONTH = 42;

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);

  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;

  const [year, setYear] = useState(curYear);
  const [month, setMonth] = useState(curMonth);

  const date = `${year}.${String(month).padStart(2, '0')}.${String(1).padStart(2, '0')}`;
  const dayOfWeek = new Date(date).getDay(); // Sunday: 0 ~ Saturday: 6

  const MONTH_DAY = calculateDaysInMonth(curYear);

  const handleMonth = (num: number) => {
    setYear((prev) => {
      if (num === 1 && month === 12) return prev + 1;
      if (num === -1 && month === 1) return prev - 1;
      return prev;
    });
    setMonth((prev) => (num === 1 ? (prev === 12 ? 1 : prev + 1) : prev === 1 ? 12 : prev - 1));
  };

  const allDays = Array.from({ length: MONTH_DAY[String(month)] }, (_, v) => v + 1);
  const emptyFirstCards = Array.from({ length: dayOfWeek }, (_, v) => v + 1);
  const lengthCondition =
    allDays.length + emptyFirstCards.length <= DAYS_IN_SHORT_MONTH
      ? DAYS_IN_SHORT_MONTH - allDays.length - dayOfWeek
      : DAYS_IN_LONG_MONTH - allDays.length - dayOfWeek;

  const emptyLastCards = Array.from({ length: lengthCondition }, (_, v) => v + 1);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <CalendarHeader
        year={year}
        month={month}
        onPrevMonth={() => handleMonth(-1)}
        onNextMonth={() => handleMonth(1)}
      />

      {modalOpen && <Modal setModalOpen={setModalOpen} />}

      <div className={styles.calendarContainer}>
        <div className={styles.calendarWeekWrapper}>
          {WEEK.map((day) => (
            <div className={styles.calendarWeekCard} key={day}>
              <p>{day}</p>
            </div>
          ))}
        </div>
        <div className={styles.calendarDayContainer}>
          {emptyFirstCards.map((day) => (
            <div key={day} className={styles.calendarDayWrapper}></div>
          ))}

          {allDays.map((day) => (
            <div key={day} className={styles.calendarDayWrapper} onClick={handleOpenModal}>
              <p>{day}</p>
              <div className={styles.chipWrapper}>
                <Chips status="예약" number={2} />
                <Chips status="승인" number={2} />
                <Chips status="완료" number={2} />
              </div>
            </div>
          ))}
          {emptyLastCards.map((day) => (
            <div key={day} className={styles.calendarDayWrapper}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
