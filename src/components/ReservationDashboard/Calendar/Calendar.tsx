import { useState } from 'react';

import Chips from '@/components/ReservationDashboard/Chips/Chips';
import CalendarHeader from '@/components/ReservationDashboard/Calendar/CalendarHeader';
import Modal from '@/components/ReservationDashboard/Modal/Modal';
import { COMPLETED, CONFIRMED, PENDING, WEEK } from '@/constants/calendar';
import { useCalendar } from '@/hooks/ReservationDashboard/useCalendar';
import { formatDateStringByDot } from '@/utils/ReservationDashboard/formatDateStringByDot';
import { MonthlyReservationStatusCount } from '@/types/common/api';
import styles from './Calendar.module.css';
import { showTodayDate } from '@/utils/ReservationDashboard/showTodayDate';

interface CalendarProps {
  activityId: number;
}

const isPassedDate = (year: number, month: number, day: number) => {
  const { curYear, curMonth, curDay } = showTodayDate();
  return new Date(`${curYear}-${curMonth}-${curDay}`) > new Date(`${year}-${month}-${day}`);
};

/** 예약 승인 완료 상태를 검사 후 날짜 옆의 동그라미 띄우는 함수 */
const renderCircle = (reservation: MonthlyReservationStatusCount, isPassedDate: boolean) => {
  const { completed, confirmed, pending } = reservation;
  if (completed + confirmed + pending === 0) return null;
  else if (isPassedDate && completed !== 0) {
    return <div className={styles.grayCircle}></div>;
  } else if (pending + confirmed > 0) {
    if (isPassedDate) return;
    return <div className={styles.blueCircle}></div>;
  }
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

  const handleOpenModal = (selectedDay: number, monthData: MonthlyReservationStatusCount) => {
    if (isPassedDate(year, month, selectedDay)) return;
    if (!monthData) return;

    const sumOfPossibleData = monthData.confirmed + monthData.pending;
    if (monthData.completed > 0 && sumOfPossibleData === 0) return;
    setDay(selectedDay);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
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
                <div
                  key={day}
                  className={styles.calendarDayWrapper}
                  onClick={() => handleOpenModal(day, monthData[day])}
                >
                  <div className={styles.calendarDayWrapperTop}>
                    <p>{day}</p>
                    {hasData && renderCircle(monthData[day], isPassedDate(year, month, day))}
                  </div>
                  {hasData && (
                    <div className={styles.chipWrapper}>
                      {!!monthData[day][PENDING] && !isPassedDate(year, month, day) && (
                        <Chips status={PENDING} number={monthData[day][PENDING]} />
                      )}
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

      {modalOpen && (
        <Modal
          handleModalClose={handleModalClose}
          date={formatDateStringByDot({ year, month, day, padStart: true })}
          activityId={activityId}
        />
      )}
    </>
  );
}

export default Calendar;
