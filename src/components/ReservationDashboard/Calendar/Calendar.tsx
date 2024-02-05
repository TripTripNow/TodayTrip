import { useState } from 'react';

import Chips from '@/components/ReservationDashboard/Chips/Chips';
import CalendarHeader from '@/components/ReservationDashboard/Calendar/CalendarHeader';
import Modal from '@/components/ReservationDashboard/Modal/Modal';
import { COMPLETED, CONFIRMED, PENDING, WEEK } from '@/constants/calendar';
import { useCalendar } from '@/hooks/ReservationDashboard/useCalendar';
import { RESERVATION_DETAILS_MODAL_MOCK_DATA } from '@/components/ReservationDashboard/mock';
import styles from './Calendar.module.css';

interface CalendarProps {
  activityId: number;
}

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
                <p>{day}</p>
                {monthData[day] && (
                  <div className={styles.chipWrapper}>
                    {monthData[day][PENDING] ? <Chips status={PENDING} number={monthData[day][PENDING]} /> : null}
                    {monthData[day][CONFIRMED] ? <Chips status={CONFIRMED} number={monthData[day][CONFIRMED]} /> : null}
                    {monthData[day][COMPLETED] ? <Chips status={COMPLETED} number={monthData[day][COMPLETED]} /> : null}
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
