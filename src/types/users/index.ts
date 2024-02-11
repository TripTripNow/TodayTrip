export interface GetUsersMeRes {
  email: string;
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface PatchUsersMeReq {
  nickname?: string;
  parofileImageUrl?: string;
  newPassword?: string;
}
