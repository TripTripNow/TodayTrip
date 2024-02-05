export const WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
export const DAYS_IN_SHORT_MONTH = 35; // 달력 생성 시 빈칸을 체크하기 위한 전체 칸의 수 - 5줄일 경우
export const DAYS_IN_LONG_MONTH = 42; // 달력 생성 시 빈칸을 체크하기 위한 전체 칸의 수 - 6줄일 경우

export const PENDING = 'pending';
export const CONFIRMED = 'confirmed';
export const COMPLETED = 'completed';

export const CHIP_MAP = {
  pending: '예약',
  confirmed: '승인',
  completed: '완료',
};

export const CALENDAR_MODAL_MAP = {
  pending: '신청',
  confirmed: '승인',
  declined: '거절',
};

export const STATUS_ARR = ['pending', 'confirmed', 'declined'] as const; // 예약 현황 모달 안의 탭 순서
