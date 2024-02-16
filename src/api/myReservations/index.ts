import instance from '@/api/axiosInstance';
import { GetMyReservationsRes, GetMyReservationsParams } from '@/types/myReservations';

export const getMyReservations = async ({
  cursorId,
  size,
  status,
  accessToken,
}: GetMyReservationsParams): Promise<GetMyReservationsRes> => {
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  return await instance.get(
    `/my-reservations?${cursorId ? `cursorId=${cursorId}` : ''}&size=${size}${status ? `&status=${status}` : ''}`,
    { headers },
  );
};
