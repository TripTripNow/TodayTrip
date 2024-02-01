import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    accept: 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => {
    // 요청 바로 직전
    const session = await getSession();

    if (!session || !session.user.accessToken) {
      //refresh token
      return config;
    }

    config.headers.Authorization = `Bearer ${session.user.accessToken.accessToken}`;

    return config;
  },
  (error: AxiosError) => {
    // 요청 에러 처리
    console.log(error.message);
    return Promise.reject(error);
  },
);

export default instance;
