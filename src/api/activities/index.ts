import instance from '@/api/axiosInstance';
import { GetReviewsParams, GetReviewsRes } from '@/types/Activities';
import { Activity } from '@/types/common/api';

export const getActivityById = async ({ activityId }: { activityId: number }): Promise<Activity> => {
  return await instance.get(`/activities/${activityId}`);
};

export const getReviews = async ({ activityId, page, size }: GetReviewsParams): Promise<GetReviewsRes> => {
  return await instance.get(`/activities/${activityId}/reviews?page=${page}&size=${size}`);
};
