import instance from '@/api/axiosInstance';
import { ActivityId } from '@/types/common/api';

export const deleteMyActivity = async ({ activityId }: ActivityId) => {
  return await instance.delete(`/my-activities/${activityId}`);
};
