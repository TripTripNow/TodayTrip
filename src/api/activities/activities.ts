import { PostActivitiesReq } from '@/types/Activities';
import instance from '../axiosInstance';

export const postActivities = async (ActivityData: PostActivitiesReq) => {
  try {
    const res = await instance.post<PostActivitiesReq>('/activities', ActivityData);

    const status = res.status;

    return status;
  } catch (error) {
    // 오류 처리
    console.error('Error:', error);
    throw error; // 오류를 상위로 다시 던짐
  }
};
