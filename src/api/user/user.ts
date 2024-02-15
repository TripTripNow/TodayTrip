import instance from '@/api/axiosInstance';
import { PatchUsersMeReq, PatchUsersMeRes, PostSignupReq } from '@/types/users';

export const postSignup = async (userData: PostSignupReq) => {
  await instance.post(`/users`, userData);
  return {
    email: userData.email,
    password: userData.password,
  };
};

export const getUsersMe = async () => {
  return await instance.get('/users/me');
};

export const patchUsersMe = async (userData: PatchUsersMeReq) => {
  const data: PatchUsersMeRes = await instance.patch('/users/me', userData);
  return data;
};

export const postUsersMeImage = async (image: FormData) => {
  return await instance.post('/users/me/image', image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
