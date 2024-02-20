import instance from '@/api/axiosInstance';
import {
  GetReviewsParams,
  GetReviewsRes,
  GetAvailableScheduleParams,
  PostReservationRes,
  PostReservationReq,
} from '@/types/activities';
import { Activity, TimeSlot } from '@/types/common/api';
import { ActivityId } from '@/types/common/api';

export const getActivityById = async ({ activityId }: ActivityId): Promise<Activity> => {
  return await instance.get(`/activities/${activityId}`);
};

export const getReviews = async ({ activityId, page, size }: GetReviewsParams): Promise<GetReviewsRes> => {
  return await instance.get(`/activities/${activityId}/reviews?page=${page}&size=${size}`);
};

export const getAvailableSchedule = async ({
  activityId,
  year,
  month,
}: GetAvailableScheduleParams): Promise<TimeSlot[]> => {
  return await instance.get(`/activities/${activityId}/available-schedule?year=${year}&month=${month}`);
};

export const postReservation = async ({
  activityId,
  scheduleId,
  headCount,
}: PostReservationReq): Promise<PostReservationRes> => {
  return await instance.post(`/activities/${activityId}/reservations`, {
    scheduleId,
    headCount,
  });
};
