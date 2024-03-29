import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { DAYS_IN_LONG_MONTH, DAYS_IN_SHORT_MONTH } from '@/constants/calendar';
import { calculateDaysInMonth } from '@/utils/ReservationDashboard/calculateDaysInMonth';
import { showTodayDate } from '@/utils/ReservationDashboard/showTodayDate';
import QUERY_KEYS from '@/constants/queryKeys';
import { getReservationDashboard } from '@/api/myActivities';

export type DateObj = Record<string, { pending: number; confirmed: number; completed: number }>;

interface useCalendarProps {
  activityId: number;
}

export const useCalendar = ({ activityId }: useCalendarProps) => {
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

  const { data: monthlyData, isError } = useQuery({
    queryKey: [QUERY_KEYS.monthlyReservation, activityId, year, month],
    queryFn: () =>
      getReservationDashboard({
        activityId,
        year: String(year).padStart(2, '0'),
        month: String(month).padStart(2, '0'),
      }),
  });

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

  const handleMonthData = () => {
    if (!monthlyData) return;
    const dateObj: DateObj = {};
    monthlyData.forEach((item) => {
      const [y, m, d] = item.date.split('-').map(Number);
      if (y === year && m === month) {
        dateObj[String(d)] = item.reservations;
      }
    });

    setMonthData(dateObj);
  };

  useEffect(() => {
    handleMonthData();
  }, [monthlyData]);

  useEffect(() => {
    if (isError) toast.error('데이터를 불러올 수 없습니다.');
  }, [isError]);

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
