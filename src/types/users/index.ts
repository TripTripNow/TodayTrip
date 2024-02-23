export interface GetUsersMeRes {
  email: string;
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface PatchUsersMeReq {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}

export interface PatchUsersMeRes {
  profileImageUrl: string;
  nickname: string;
}

export interface PostSignupReq {
  email: string;
  nickname: string;
  password: string;
}
