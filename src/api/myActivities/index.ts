import instance from '@/api/axiosInstance';
import { GetMyActivitiesRes, PatchMyActivityReq } from '@/types/myActivities';

export const patchActivitiesId = async (activityId: number, activityData: PatchMyActivityReq) => {
  activityId = 62;
  return await instance.patch(`/my-activities/${activityId}`, activityData);
};

export const getMyActivities = async (cursorId?: number | undefined): Promise<GetMyActivitiesRes> => {
  // console.log(cursorId);
  return await instance.get(`/my-activities?size=6${cursorId ? `&cursorId=${cursorId}` : ''}`);
};
