import { useState } from 'react';

import Chips from '@/components/ReservationDashboard/Chips/Chips';
import CalendarHeader from '@/components/ReservationDashboard/Calendar/CalendarHeader';
import Modal from '@/components/ReservationDashboard/Modal/Modal';
import { COMPLETED, CONFIRMED, PENDING, WEEK } from '@/constants/calendar';
import { useCalendar } from '@/hooks/ReservationDashboard/useCalendar';
import { RESERVATION_DETAILS_MODAL_MOCK_DATA } from '@/components/ReservationDashboard/mock';
import styles from './Calendar.module.css';
import { Reservations } from '@/types/api';

interface CalendarProps {
  activityId: number;
}

/** 예약 승인 완료 상태를 검사 후 날짜 옆의 동그라미 띄우는 함수 */
const checkCircle = (obj: Reservations) => {
  if (obj.completed + obj.confirmed + obj.pending === 0) return null;
  else if (obj.pending + obj.confirmed === 0 && obj.completed !== 0) return <div className={styles.grayCircle}></div>;
  else if (obj.pending + obj.confirmed > 0) return <div className={styles.blueCircle}></div>;
};

function Calendar({ activityId }: CalendarProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    year,
    month,
    day,
    emptyFirstCards,
    emptyLastCards,
    handlePrevMonth,
    handleNextMonth,
    monthData,
    setDay,
    allDays,
  } = useCalendar({
    activityId,
  });

  const handleOpenModal = (selectedDay: number, hasData: boolean) => {
    if (!hasData) return;
    setModalOpen(true);
    setDay(selectedDay);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <Modal
          handleModalClose={handleModalClose}
          date={`${year}.${month}.${day}`}
          items={RESERVATION_DETAILS_MODAL_MOCK_DATA}
          activityId={activityId}
        />
      )}

      <div className={styles.container}>
        <CalendarHeader year={year} month={month} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} />

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
                <p className={styles.calendarDayWrapperTop}>
                  {day}
                  {!!monthData[day] && checkCircle(monthData[day])}
                </p>
                {monthData[day] && (
                  <div className={styles.chipWrapper}>
                    {!!monthData[day][PENDING] && <Chips status={PENDING} number={monthData[day][PENDING]} />}
                    {!!monthData[day][CONFIRMED] && <Chips status={CONFIRMED} number={monthData[day][CONFIRMED]} />}
                    {!!monthData[day][COMPLETED] && <Chips status={COMPLETED} number={monthData[day][COMPLETED]} />}
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
