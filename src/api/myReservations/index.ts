import instance from '@/api/axiosInstance';
import { GetMyReservationsRes, GetMyReservationsParam, PostMyReservationReviewReq } from '@/types/myReservations';

export const getMyReservations = async ({
  cursorId,
  size,
  status,
}: GetMyReservationsParam): Promise<GetMyReservationsRes> => {
  const cursorParam = cursorId ? `&cursorId=${cursorId}` : '';
  const statusParam = status ? `&status=${status}` : '';

  return await instance.get(`/my-reservations?size=${size}${cursorParam}${statusParam}`);
};

export const postMyReservationReview = async ({ reservationId, rating, content }: PostMyReservationReviewReq) => {
  return await instance.post(`/my-reservations/${reservationId}/reviews`, {
    rating,
    content,
  });
};

export const patchMyReservationsId = async (reservationId: number) => {
  return await instance.patch(`/my-reservations/${reservationId}`, { status: 'canceled' });
};
