import { Reservation, ReservationStatus } from '@/types/common/api';

// 내 예약 리스트 조회 Parameter
export interface getMyReservationsParam {
  cursorId?: number;
  size?: number;
  status?: ReservationStatus;
}

// 내 예약 리스트 조회 Response
export interface getMyReservationsRes {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}
