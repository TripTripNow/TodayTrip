import instance from '@/api/axiosInstance';
import { Activity, ActivityId } from '@/types/common/api';

export const getActivityById = async ({ activityId }: ActivityId): Promise<Activity> => {
  // return await instance.get(`/activities/${activityId}`);
  const { data } = await instance.get(`/activities/${activityId}`);
  return data;
};
