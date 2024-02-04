import instance from '@/api/axiosInstance';
import { AxiosError } from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
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
        console.log('in');
        try {
          const data = {
            email: credentials?.email,
            password: credentials?.password,
          };

          const res = await instance.post(`/auth/login`, data);
          return res.data.accessToken || null;
        } catch (e: unknown) {
          if (e instanceof AxiosError) {
            throw new Error(e.response?.data.message || e);
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if (user.id) token.accessToken = user.id;
        else token.accessToken = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token;
      return session;
    },
    async signIn({ user }) {
      const { name, email, image } = user;

      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          image,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) return false;

      return true;
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
