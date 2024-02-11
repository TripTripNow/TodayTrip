import instance from '@/api/axiosInstance';
import { SignupData } from '@/types/user';

export const postSignup = async (userData: SignupData) => {
  await instance.post(`/users`, userData);
  return {
    email: userData.email,
    password: userData.password,
  };
};

export const getUsersMe = async () => {
  const res = await instance.get('/users/me');

  return res.data;
};
