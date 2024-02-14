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

export type GetReviewsRes = {
  reviews: Review[];
  totalCount: number;
};

interface PostReservationRes extends ReservationBase {}
