import { Activity, Category } from '@/types/common/api';
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

/** 체험 리스트 조회 Parameter */
export interface GetActivitiesParam {
  method: 'offset' | 'cursor';
  cursorId?: number | null;
  category?: Category;
  keyword?: string;
  sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
  page?: number;
  size?: number;
}

/** 체험 리스트 조회 Response */
export interface GetActivitiesRes {
  cursorId: number;
  totalCount: number;
  activities: Omit<Activity, 'subImageUrls'>[];
}

export type GetReviewsRes = {
  reviews: Review[];
  totalCount: number;
};

export interface GetReviewsParams {
  activityId: number;
  page: number;
  size: 3;
}

export interface GetAvailableScheduleParams {
  activityId: number;
  year: string;
  month: string;
}

export interface PostReservationReq {
  activityId: number;
  scheduleId: number;
  headCount: number;
}

export interface PostReservationRes extends ReservationBase {
  activityId: number;
}
