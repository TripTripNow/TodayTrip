import instance from '@/api/axiosInstance';
import { GetMyActivitiesRes } from '@/types/myActivities';

export const getMyActivities = async (cursorId?: number | undefined): Promise<GetMyActivitiesRes> => {
  return await instance.get(`/my-activities?size=6${cursorId ? `&cursorId=${cursorId}` : ''}`);
};
