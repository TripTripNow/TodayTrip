export interface PostAuthLoginRes {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    nickname: string;
    email: string;
    profileImageUrl: string;
  };
}

export interface PostAuthLoginReq {
  email: string;
  password: string;
}
