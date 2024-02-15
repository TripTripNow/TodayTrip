import { PostActivitiesReq } from '@/types/Activities';
import instance from '../axiosInstance';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const postActivities = async (activityData: PostActivitiesReq) => {
  try {
    const res = await instance.post<PostActivitiesReq>('/activities', activityData);
    const status = res.status;
    return status;
  } catch (error) {
    if (error instanceof AxiosError) toast(`${error.response?.data.message}`);
  }
};

export const getActivitiesId = async (activityId: number) => {
  try {
    activityId = 62;
    const res = await instance.get(`/activities/${activityId}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) toast(`${error.response?.data.message}`);
  }
};
