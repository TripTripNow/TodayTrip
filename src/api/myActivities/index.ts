import instance from '@/api/axiosInstance';
import { PatchMyActivityReq, GetMyActivitiesRes } from '@/types/myActivities';

export const patchActivitiesId = async (activityId: number, activityData: PatchMyActivityReq) => {
  return await instance.patch(`/my-activities/${activityId}`, activityData);
};

export const getMyActivities = async (cursorId?: number | undefined): Promise<GetMyActivitiesRes> => {
  return await instance.get(`/my-activities?size=6${cursorId ? `&cursorId=${cursorId}` : ''}`);
};

export const deleteMyActivity = async (activityId: number) => {
  return await instance.delete(`/my-activities/${activityId}`);
};
