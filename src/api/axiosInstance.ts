import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    accept: 'application/json',
  },
});

let context = <GetServerSidePropsContext>{};

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

const redirectToLoginPage = () => {
  //window.location.href = `${process.env.NEXT_PUBLIC_URL}/signin`;
  //TODO window.location 에러 발생함, 이후 수정 필요
  console.log('refresh token 만료됨');
};

instance.interceptors.request.use(
  async (config) => {
    const session = await getSession(context);

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
    return response.data;
  },
  async (error) => {
    const { config, response } = error;

    if (response && response.status === 401 && error.response.data.message === 'Unauthorized') {
      const originalRequest = config;
      const session = await getSession(context);

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
