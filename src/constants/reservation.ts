import { ReserveFilterOption } from '@/types/dropdown';

export const ReservationStatus = {
  initial: '예약 상태',
  all: '전체',
  pending: '예약 신청',
  confirmed: '예약 승인',
  declined: '예약 거절',
  canceled: '예약 취소',
  completed: '체험 완료',
} as const;

export const BACKEND_RESERVATION_STATUS: Record<ReserveFilterOption, keyof typeof ReservationStatus> = {
  '예약 상태': 'initial',
  전체: 'all',
  '예약 신청': 'pending',
  '예약 승인': 'confirmed',
  '예약 거절': 'declined',
  '예약 취소': 'canceled',
  '체험 완료': 'completed',
};

export const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  DECLINED: 'declined',
  CANCELED: 'canceled',
  COMPLETED: 'completed',
};

export const NO_DATA_RESERVATION: Record<keyof typeof ReservationStatus, string> = {
  all: '예약 내역이 없습니다.',
  initial: '예약 내역이 없습니다.',
  pending: '신청 내역이 없습니다.',
  confirmed: '승인 내역이 없습니다.',
  declined: '거절 내역이 없습니다.',
  canceled: '취소 내역이 없습니다.',
  completed: '완료 내역이 없습니다.',
};
