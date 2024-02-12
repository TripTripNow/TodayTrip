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
