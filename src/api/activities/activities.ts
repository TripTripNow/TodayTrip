import instance from '@/api/axiosInstance';
import { GetActivitiesParam, GetActivitiesRes } from '@/types/activities';

export const getActivities = async ({
  method,
  cursorId,
  category,
  keyword,
  sort = 'latest',
  page = 1,
  size = 9,
}: GetActivitiesParam) => {
  let path = '';
  if (cursorId) path += `&cursorId=${cursorId}`;
  if (category) path += `&category=${category}`;
  if (keyword) path += `&keyword=${keyword}`;
  if (sort) path += `&sort=${sort}`;

  const { data } = await instance.get<GetActivitiesRes>(
    `/activities?method=${method}&page=${page}&size=${size}${path}`,
  );
  return data;
};
