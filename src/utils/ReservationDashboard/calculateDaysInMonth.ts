interface MonthDayMap {
  [month: string]: number;
}

const DAYS_IN_MONTH: MonthDayMap = {
  '1': 31,
  '3': 31,
  '4': 30,
  '5': 31,
  '6': 30,
  '7': 31,
  '8': 31,
  '9': 30,
  '10': 31,
  '11': 30,
  '12': 31,
};

/**
 * 윤년일 경우 해당 년도의 각 달의 일 수를 반환합니다.
 * @param year 년도
 * @returns 윤년 여부에 따른 각 달의 일 수
 */
export const calculateDaysInMonth = (year: number): MonthDayMap => {
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  if (isLeapYear) {
    DAYS_IN_MONTH['2'] = 29;
  } else {
    DAYS_IN_MONTH['2'] = 28;
  }

  return DAYS_IN_MONTH;
};
