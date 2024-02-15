import { FieldValues } from 'react-hook-form';

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

//체험 등록
export interface PostActivitiesReq extends FieldValues {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export interface GetActivitiesRes {
  id: number;
  userId: number;
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  schedules: {
    times: [
      {
        endTime: string;
        startTime: string;
        id: number;
      },
    ];
    date: string;
  }[];
  bannerImageUrl: string;
  subImages: { imageUrl: string; id: number }[];
}

//체험 이미지 url 생성
export interface PostActivitiesImageReq {
  image: string;
}
export interface PostActivitiesImageRes {
  profileImageUrl: string;
}

export type GetReviewsRes = {
  reviews: Review[];
  totalCount: number;
};
