import { type DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: JWT;
      refreshToken: JWT;
      type: string;
    } & DefaultSession['user'];
  }
  interface User {
    errorCode: number;
    accessToken: JWT;
    refreshToken: JWT;
    nickname: string;
  }
}
