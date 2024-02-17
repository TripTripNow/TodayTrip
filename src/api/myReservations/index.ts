import instance from '@/api/axiosInstance';
import { GetMyReservationsRes, GetMyReservationsParam, PostMyReservationReviewReq } from '@/types/myReservations';

export const getMyReservations = async ({
  cursorId,
  size,
  status,
}: GetMyReservationsParam): Promise<GetMyReservationsRes> => {
  return await instance.get(
    `/my-reservations?${cursorId ? `cursorId=${cursorId}` : ''}&size=${size}${status ? `&status=${status}` : ''}`,
  );
};

export const postMyReservationReview = async ({ reservationId, rating, content }: PostMyReservationReviewReq) => {
  return await instance.post(`/my-reservations/${reservationId}/reviews`, {
    rating,
    content,
  });
};
