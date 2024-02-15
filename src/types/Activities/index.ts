import { ReservationBase } from '@/types/common/api';

interface UserInfo {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

interface Review {
  id: number;
  user: UserInfo;
  activityId: number;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetReviewsRes {
  reviews: Review[];
  totalCount: number;
}

export interface GetReviewsParams {
  activityId: number;
  page: number;
  size: 3;
}

export interface PostReservationRes extends ReservationBase {
  activityId: number;
}
