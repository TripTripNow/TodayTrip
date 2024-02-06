import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    accept: 'application/json',
  },
});

const redirectToLoginPage = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_URL}/signin`;
};

instance.interceptors.request.use(
  async (config) => {
    // 요청 바로 직전
    const session = await getSession();

    if (!session || !session.user.accessToken) {
      return config;
    }

    config.headers.Authorization = `Bearer ${session.user.accessToken}`;

    return config;
  },
  (error: AxiosError) => {
    // 요청 에러 처리
    console.log(error.message);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401 && error.response.data.message === 'Unauthorized') {
      const originalRequest = config;
      const session = await getSession();

      try {
        if (!session) throw new Error();
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}auth/tokens`,
          {},
          {
            headers: {
              Authorization: `Bearer ${session?.user.refreshToken}`,
            },
          },
        );
        session.user.accessToken = data.accessToken;

        originalRequest.headers.authorization = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (e) {
        redirectToLoginPage();
      }
    }

    console.log(error.message);
    return Promise.reject(error);
  },
);

export default instance;
