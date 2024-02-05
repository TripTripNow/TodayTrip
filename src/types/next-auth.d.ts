import { type DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: JWT;
    } & DefaultSession['user'];
  }
  interface User {
    errorCode: number;
    properties: { nickname: string };
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string;
  }
}
