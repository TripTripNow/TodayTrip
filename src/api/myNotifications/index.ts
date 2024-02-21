import instance from '@/api/axiosInstance';
import { GetNotificationsRes } from '@/types/myNotifications';

export const getMyNotifications = async (cursorId: number | undefined): Promise<GetNotificationsRes> => {
  let path = '/my-notifications?size=3';
  if (cursorId) path += '&cursorId=' + cursorId;

  return await instance.get(path);
};

export const deleteMyNotifications = async (notificationId: number): Promise<GetNotificationsRes> => {
  return await instance.delete(`/my-notifications/${notificationId}`);
};
