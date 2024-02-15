import instance from '@/api/axiosInstance';
import { PostAuthLoginReq, PostAuthLoginRes } from '@/types/auth';

export const postAuthLogin = async (req: PostAuthLoginReq) => {
  const data: PostAuthLoginRes = await instance.post(`/auth/login`, req);

  return data;
};
