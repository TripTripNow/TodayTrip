import instance from '@/api/axiosInstance';
import { postSignup } from '@/api/user/user';
import { AxiosError } from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      async profile(profile, tokens) {
        try {
          const res = await instance.post(`/auth/login`, {
            email: profile.id + '@todaytrip.com',
            password: profile.id + 'todaytrip',
          });
          const tokenset = {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            expires_at: tokens.expires_at,
            refresh_token_expires_in: tokens.refresh_token_expires_in,
          };
          return {
            ...profile,
            ...tokenset,
          };
        } catch (e) {
          if (e instanceof AxiosError) {
            profile.errorCode = e.response?.status;
            return {
              ...profile,
            };
          }
          profile.errorCode = e;
          return {
            profile: {
              ...profile,
            },
          };
        }
      },
    }),
    CredentialsProvider({
      id: 'signin-credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
        },
        password: { label: 'password', type: 'password' },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any> {
        try {
          const data = {
            email: credentials?.email,
            password: credentials?.password,
          };

          const res = await instance.post(`/auth/login`, data);
          return { accessToken: res.data.accessToken, refreshToken: res.data.refreshToken } || null;
        } catch (e: unknown) {
          if (e instanceof AxiosError) {
            throw new Error(e.response?.data.message || e);
          }
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, credentials }) {
      if (credentials) return true;
      if (user.errorCode && user.errorCode === 404) {
        try {
          const res = await postSignup({
            email: user.id + '@todaytrip.com',
            password: user.id + 'todaytrip',
            nickname: user.properties.nickname || '',
          });
          // 회원가입 성공한 경우 로그인
          if (res) {
            const result = await instance.post(`/auth/login`, {
              email: res.email,
              password: res.password,
            });
            if (result.status !== 201) return false;
            return true;
          }

          // 회원가입 실패한 경우 error
          throw new Error();
        } catch (e) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  // 복호화
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/signin',
  },
});
