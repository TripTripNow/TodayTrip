import { useState } from 'react';

import Chips from '@/components/ReservationDashboard/Chips/Chips';
import CalendarHeader from '@/components/ReservationDashboard/Calendar/CalendarHeader';
import Modal from '@/components/ReservationDashboard/Modal/Modal';
import { COMPLETED, CONFIRMED, PENDING, WEEK } from '@/constants/calendar';
import { useCalendar } from '@/hooks/ReservationDashboard/useCalendar';
import { RESERVATION_DETAILS_MODAL_MOCK_DATA } from '@/components/ReservationDashboard/mock';
import { formatDateStringByDot } from '@/utils/ReservationDashboard/formatDateStringByDot';
import styles from './Calendar.module.css';
import { MonthlyReservationStatusCount } from '@/types/myActivities';

interface CalendarProps {
  activityId: number;
}

/** 예약 승인 완료 상태를 검사 후 날짜 옆의 동그라미 띄우는 함수 */
const renderCircle = (reservation: MonthlyReservationStatusCount) => {
  const { completed, confirmed, pending } = reservation;
  if (completed + confirmed + pending === 0) return null;
  else if (pending + confirmed === 0 && completed !== 0) return <p className={styles.grayCircle}></p>;
  else if (pending + confirmed > 0) return <p className={styles.blueCircle}></p>;
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
  } = useCalendar({ activityId });

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
          date={formatDateStringByDot({ year, month, day })}
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

            {allDays.map((day) => {
              const hasData = !!monthData[day];
              return (
                <div key={day} className={styles.calendarDayWrapper} onClick={() => handleOpenModal(day, hasData)}>
                  <div className={styles.calendarDayWrapperTop}>
                    <p>{day}</p>
                    {hasData && renderCircle(monthData[day])}
                  </div>
                  {hasData && (
                    <div className={styles.chipWrapper}>
                      {!!monthData[day][PENDING] && <Chips status={PENDING} number={monthData[day][PENDING]} />}
                      {!!monthData[day][CONFIRMED] && <Chips status={CONFIRMED} number={monthData[day][CONFIRMED]} />}
                      {!!monthData[day][COMPLETED] && <Chips status={COMPLETED} number={monthData[day][COMPLETED]} />}
                    </div>
                  )}
                </div>
              );
            })}
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
