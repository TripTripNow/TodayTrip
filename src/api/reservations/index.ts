import instance from '@/api/axiosInstance';
import { getMyReservationsRes } from '@/types/myReservations';

// 내 예약 리스트 조회

export const getMyReservations = async (): Promise<getMyReservationsRes> => {
  return await instance.get('my-reservations');
};
