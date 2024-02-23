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

export const BACKEND_RESERVATION_STATUS: Record<ReserveFilterOption, keyof typeof ReservationStatus | undefined> = {
  전체: undefined,
  '예약 상태': undefined,
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
