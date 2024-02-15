import instance from '@/api/axiosInstance';
import { PatchMyActivityReq } from '@/types/myActivities';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const patchActivitiesId = async (activityId: number, activityData: PatchMyActivityReq) => {
  try {
    activityId = 62;
    const res = await instance.patch<PatchMyActivityReq>(`/my-activities/${activityId}`, activityData);
    const status = res.status;
    return status;
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) console.log(error.response?.data.message);
  }
};
