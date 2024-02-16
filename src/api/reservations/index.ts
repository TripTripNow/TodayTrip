import instance from '@/api/axiosInstance';
import { getMyReservationsRes } from '@/types/myReservations';

// 내 예약 리스트 조회

export const getMyReservations = async () => {
  const { data } = await instance.get<getMyReservationsRes>('my-reservations');

  return data;
};
