import { postSignup } from '@/api/user';
import { AxiosError } from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import { postAuthLogin } from '@/api/auth';
import { PostAuthLoginRes } from '@/types/auth';

const handleData = (data: PostAuthLoginRes, type: string) => {
  const userset = {
    id: data.user.id,
    image: data.user.profileImageUrl,
    name: data.user.nickname,
    email: data.user.email,
    type: type,
  };

  const tokenset = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };

  return {
    ...tokenset,
    ...userset,
  };
};

const handleSocialLogin = async (profile: any) => {
  const email = profile.id + '@todaytrip.com';
  const password = profile.id + 'todaytrip';
  const nickname = profile.name || '';

  try {
    const req = { email, password };
    const data = await postAuthLogin(req);

    return handleData(data, profile.type);
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response && e.response.status === 404) {
        try {
          const req = { email, password, nickname };
          const res = await postSignup(req);
          // 회원가입 성공한 경우 로그인
          if (res) {
            const req = {
              email: res.email,
              password: res.password,
            };
            const data = await postAuthLogin(req);
            return handleData(data, profile.type);
          }

          // 회원가입 실패한 경우 error
          throw new Error();
        } catch (e) {
          profile.isError = true;
          return { ...profile };
        }
      }
    }
    // 예상하지 못한 에러 발생한 경우
    profile.isError = true;
    return { ...profile };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      async profile(profile) {
        profile.name = profile.properties.nickname;
        profile.type = 'kakao';

        return handleSocialLogin(profile);
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      async profile(profile) {
        profile.id = profile.response.id;
        profile.name = profile.response.nickname;
        profile.type = 'naver';

        return handleSocialLogin(profile);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        profile.id = profile.sub;
        profile.type = 'google';

        return handleSocialLogin(profile);
      },
    }),
    CredentialsProvider({
      id: 'signin-credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
        accessToken: {},
        refreshToken: {},
        type: {},
        id: {},
        image: {},
        name: {},
      },
      async authorize(credentials): Promise<any> {
        if (credentials?.accessToken) {
          return {
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
            type: credentials.type,
            id: credentials.id,
            image: credentials.image,
            name: credentials.name,
            email: credentials.email,
          };
        }
        try {
          const req = {
            email: credentials?.email || '',
            password: credentials?.password || '',
          };

          const data = await postAuthLogin(req);
          const { user } = data;
          return (
            {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              type: 'credentials',
              id: user.id,
              image: user.profileImageUrl,
              name: user.nickname,
              email: user.email,
            } || null
          );
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
      if (user.isError) {
        return false;
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && (session.image || session.name)) {
        token.picture = session.image;
        token.name = session.name;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (typeof token.type === 'string') session.user.type = token.type;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.email = token.email;
      session.user.image = token.picture;
      session.user.id = Number(token.sub);
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
    error: '/signin',
  },
};

export default NextAuth(authOptions);
