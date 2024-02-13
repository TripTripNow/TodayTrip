import { PostActivitiesReq } from '@/types/Activities';
import instance from '../axiosInstance';

export const postActivities = async (ActivityData: PostActivitiesReq) => {
  //   console.log(ActivityData);
  const { data } = await instance.post<PostActivitiesReq>('/activities', ActivityData);
  console.log(data);
  return data;
};
