import { Reservation, ReservationStatus } from '@/types/common/api';

export interface GetMyReservationsParams {
  cursorId?: number;
  size?: number;
  status: ReservationStatus | undefined;
  accessToken?: string;
}

export interface GetMyReservationsRes {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
}
