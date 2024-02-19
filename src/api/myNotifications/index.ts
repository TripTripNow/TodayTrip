import instance from '@/api/axiosInstance';
import { GetNotificationsRes } from '@/types/myNotifications';

export const getMyNotifications = async (cursorId: any): Promise<GetNotificationsRes> => {
  let path = '/my-notifications?size=3';
  if (cursorId) path += '?cursorId=' + cursorId;

  return await instance.get(path);
};
