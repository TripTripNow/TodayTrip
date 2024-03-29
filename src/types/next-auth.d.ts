import { type DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: JWT;
      refreshToken: JWT;
      type: string;
      id: number;
    } & DefaultSession['user'];
  }
  interface User {
    isError: boolean;
    accessToken: JWT;
    refreshToken: JWT;
    nickname: string;
    type: string;
  }
}
