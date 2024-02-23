import instance from '@/api/axiosInstance';
import {
  PostActivitiesReq,
  GetActivitiesParam,
  GetActivitiesRes,
  GetReviewsParams,
  GetReviewsRes,
  GetAvailableScheduleParams,
  PostReservationRes,
  PostReservationReq,
} from '@/types/activities';
import { Activity, TimeSlot } from '@/types/common/api';
import { ActivityId } from '@/types/common/api';

/**
 * 체험 리스트 조회
 */
export const getActivities = async ({
  method,
  cursorId,
  category,
  keyword,
  sort = 'latest',
  page = 1,
  size = 9,
}: GetActivitiesParam): Promise<GetActivitiesRes> => {
  let path = '';
  if (cursorId) path += `&cursorId=${cursorId}`;
  if (category) path += `&category=${category}`;
  if (keyword) path += `&keyword=${keyword}`;
  if (sort) path += `&sort=${sort}`;

  return await instance.get(`/activities?method=${method}&page=${page}&size=${size}${path}`);
};
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

export const postActivities = async (activityData: PostActivitiesReq) => {
  return await instance.post('/activities', activityData);
};

export const getActivitiesId = async (activityId: number): Promise<Activity> => {
  return await instance.get(`/activities/${activityId}`);
};

export const postImageUrl = async (formData: FormData) => {
  const res: { activityImageUrl: string } = await instance.post('/activities/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.activityImageUrl;
};
