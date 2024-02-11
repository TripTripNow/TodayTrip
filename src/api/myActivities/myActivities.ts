import instance from '@/api/axiosInstance';
import { GetMyActivitiesParam, GetMyActivitiesRes } from '@/types/myActivities';

export const getMyActivities = async ({ cursorId, size = 20 }: GetMyActivitiesParam) => {
  let path = '';
  if (cursorId) path += `&cursorId=${cursorId}`;

  const { data } = await instance.get<GetMyActivitiesRes>(`/my-activities?size=${size}${path}`);
  return data;
};
