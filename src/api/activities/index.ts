import instance from '@/api/axiosInstance';
import { GetActivitiesParam, GetActivitiesRes } from '@/types/activities';

/**
 * 체험 리스트 조회
 */
export const getActivities = async ({
  method,
  cursorId,
  category,
  keyword,
  sort = 'latest',
  page = 1,
  size = 9,
}: GetActivitiesParam): Promise<GetActivitiesRes> => {
  let path = '';
  if (cursorId) path += `&cursorId=${cursorId}`;
  if (category) path += `&category=${category}`;
  if (keyword) path += `&keyword=${keyword}`;
  if (sort) path += `&sort=${sort}`;

  return await instance.get(`/activities?method=${method}&page=${page}&size=${size}${path}`);
};
