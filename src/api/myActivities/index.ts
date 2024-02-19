import instance from '@/api/axiosInstance';
import { PatchMyActivityReq } from '@/types/myActivities';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const patchActivitiesId = async (activityId: number, activityData: PatchMyActivityReq) => {
  activityId = 62;
  return await instance.patch(`/my-activities/${activityId}`, activityData);
};
