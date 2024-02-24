import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession, signIn } from 'next-auth/react';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let context = <GetServerSidePropsContext>{};

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

const updateSession = async (data: { accessToken: string; refreshToken: string; user: Session['user'] }) => {
  await signIn('signin-credentials', {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    type: data.user.type,
    id: data.user.id,
    image: data.user.image,
    name: data.user.name,
    email: data.user.email,
    redirect: false,
  });
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

        updateSession({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: session.user,
        });

        originalRequest.headers.authorization = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (e) {
        window.location.replace('/signin');
      }
    }

    console.log(error.message);
    return Promise.reject(error);
  },
);

export default instance;
