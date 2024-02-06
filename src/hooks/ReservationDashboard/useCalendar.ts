import { useEffect, useState } from 'react';

import { DAYS_IN_LONG_MONTH, DAYS_IN_SHORT_MONTH } from '@/constants/calendar';
import { calculateDaysInMonth } from '@/utils/ReservationDashboard/calculateDaysInMonth';
import { showTodayDate } from '@/utils/ReservationDashboard/showTodayDate';
import { ReservationDashboardItem } from '@/types/api';
import { RESERVATION_DETAILS_MONTH_MOCK_DATA } from '@/components/ReservationDashboard/mock';

export type DateObj = Record<string, { pending: number; confirmed: number; completed: number }>;

interface useCalendarProps {
  activityId: number;
}

export const useCalendar = ({ activityId }: useCalendarProps) => {
  const dateItems: ReservationDashboardItem[] = RESERVATION_DETAILS_MONTH_MOCK_DATA;
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

  const handlePrevMonth = () => {
    setYear((prev) => prev - (month === 1 ? 1 : 0));
    setMonth((prev) => (prev === 1 ? 12 : prev - 1));
  };

  const handleNextMonth = () => {
    setYear((prev) => {
      if (month === 12) return prev + 1;
      return prev;
    });
    setMonth((prev) => (prev === 12 ? 1 : prev + 1));
  };

  /** @todo 내 체험 월별 예약 현황 조회 API 요청 with activityId */
  const handleMonthData = () => {
    const dateObj: DateObj = {};
    dateItems.forEach((item) => {
      const [y, m, d] = item.date.split('-').map(Number);
      if (y === year && m === month) {
        dateObj[String(d)] = item.reservations;
      }
    });

    setMonthData(dateObj);
  };

  useEffect(() => {
    handleMonthData();
  }, [month, dateItems, year, activityId]);

  return {
    year,
    month,
    day,
    emptyLastCards,
    emptyFirstCards,
    handlePrevMonth,
    handleNextMonth,
    monthData,
    setDay,
    allDays,
  };
};
