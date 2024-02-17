import { ReserveFilterOption } from '@/types/dropdown';

export const RESERVATION_STATUS = {
  pending: '예약 신청',
  confirmed: '예약 승인',
  declined: '예약 거절',
  canceled: '예약 취소',
  completed: '체험 완료',
};

export const PENDING = 'pending';
export const CONFIRMED = 'confirmed';
export const DECLINED = 'declined';
export const CANCELED = 'canceled';
export const COMPLETED = 'completed';

export const BACKEND_RESERVATION_STATUS: Record<ReserveFilterOption, keyof typeof RESERVATION_STATUS | undefined> = {
  전체: undefined,
  '예약 상태': undefined,
  '예약 신청': 'pending',
  '예약 승인': 'confirmed',
  '예약 거절': 'declined',
  '예약 취소': 'canceled',
  '체험 완료': 'completed',
};
