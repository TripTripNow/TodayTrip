import { Reservation, ReservationStatus } from '@/types/common/api';

export interface GetMyReservationsParam {
  cursorId?: number;
  size?: number;
  status: ReservationStatus | undefined;
}

export interface GetMyReservationsRes {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}

export interface PostMyReservationReviewReq {
  rating: number;
  content: string;
  reservationId: number;
}
