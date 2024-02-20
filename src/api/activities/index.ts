import { PostActivitiesReq } from '@/types/Activities';
import instance from '../axiosInstance';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const postActivities = async (activityData: PostActivitiesReq) => {
  return await instance.post('/activities', activityData);
};

export const getActivitiesId = async (activityId: number) => {
  try {
    activityId = 61;
    const res = await instance.get(`/activities/${activityId}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) toast(`${error.response?.data.message}`);
  }
};
