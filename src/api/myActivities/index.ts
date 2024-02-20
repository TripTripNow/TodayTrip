import instance from '@/api/axiosInstance';
import { PatchMyActivityReq } from '@/types/myActivities';

export const patchActivitiesId = async (activityId: number, activityData: PatchMyActivityReq) => {
  activityId = 61;
  return await instance.patch(`/my-activities/${activityId}`, activityData);
};
