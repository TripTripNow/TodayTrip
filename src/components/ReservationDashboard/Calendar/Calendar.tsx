import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Chips from '@/components/ReservationDashboard/Chips/Chips';
import CalendarHeader from '@/components/ReservationDashboard/Calendar/CalendarHeader';
import { calculateDaysInMonth } from '@/utils/ReservationDashboard/calculateDaysInMonth';
import Modal from '@/components/ReservationDashboard/Modal/Modal';
import { ReservationDashboardItem } from '@/types/api';
import styles from './Calendar.module.css';
import { DAYS_IN_LONG_MONTH, DAYS_IN_SHORT_MONTH, WEEK } from '@/constants/calendar';

type DateObj = Record<string, { pending: number; confirmed: number; completed: number }>;

interface CalendarProps {
  items: ReservationDashboardItem[];
}

function Calendar({ items: dateItems }: CalendarProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { curYear, curMonth } = showTodayDate();
  const [monthData, setMonthData] = useState<DateObj>({});

  const [year, setYear] = useState(curYear);
  const [month, setMonth] = useState(curMonth);
  const [day, setDay] = useState(0);
  const daysInMonth = calculateDaysInMonth(year);
  const date = `${year}.${String(month).padStart(2, '0')}.${String(1).padStart(2, '0')}`;
  const dayOfWeek = new Date(date).getDay(); // Sunday: 0 ~ Saturday: 6
  const allDays = Array.from({ length: daysInMonth[String(month)] }, (_, v) => v + 1);
  const emptyFirstCards = Array.from({ length: dayOfWeek }, (_, v) => v + 1);
  const lengthCondition =
    allDays.length + emptyFirstCards.length <= DAYS_IN_SHORT_MONTH
      ? DAYS_IN_SHORT_MONTH - allDays.length - dayOfWeek
      : DAYS_IN_LONG_MONTH - allDays.length - dayOfWeek;
  const emptyLastCards = Array.from({ length: lengthCondition }, (_, v) => v + 1);

  const handleMonth = (num: number) => {
    setYear((prev) => {
      if (num === 1 && month === 12) return prev + 1;
      if (num === -1 && month === 1) return prev - 1;
      return prev;
    });
    setMonth((prev) => (num === 1 ? (prev === 12 ? 1 : prev + 1) : prev === 1 ? 12 : prev - 1));
  };

  const handleOpenModal = (selectedDay: number, hasData: boolean) => {
    if (hasData) {
      setModalOpen(true);
      setDay(selectedDay);
    } else {
      toast.error('해당 날짜에 예약 정보가 없습니다!');
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleMonthData = useCallback(() => {
    const dateObj: DateObj = {};
    dateItems.forEach((item) => {
      const [y, m, d] = item.date.split('-').map(Number);
      console.log(y, year, m, month);
      if (y === year && m === month) {
        dateObj[String(d)] = item.reservations;
      }
    });

    setMonthData(dateObj);
  }, [month, dateItems, year]);

  useEffect(() => {
    handleMonthData();
  }, [handleMonthData]);

  return (
    <>
      {modalOpen && <Modal handleModalClose={handleModalClose} date={`${year}.${month}.${day}`} />}

      <div className={styles.container}>
        <CalendarHeader
          year={year}
          month={month}
          onPrevMonth={() => handleMonth(-1)}
          onNextMonth={() => handleMonth(1)}
        />

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
              <div
                key={day}
                className={styles.calendarDayWrapper}
                onClick={() => handleOpenModal(day, !!monthData[day])}
              >
                <p>{day}</p>
                {monthData[day] && (
                  <div className={styles.chipWrapper}>
                    {monthData[day]['pending'] ? <Chips status="예약" number={monthData[day]['pending']} /> : null}
                    {monthData[day]['confirmed'] ? <Chips status="승인" number={monthData[day]['confirmed']} /> : null}
                    {monthData[day]['completed'] ? <Chips status="완료" number={monthData[day]['completed']} /> : null}
                  </div>
                )}
              </div>
            ))}
            {emptyLastCards.map((day) => (
              <div key={day} className={styles.calendarDayWrapper}></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Calendar;
