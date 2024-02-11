import { RESERVATION_STATUS } from '@/constants/reservation';

export type Category = '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface SubImageUrl {
  id: number;
  imageUrl: string;
}

export interface ActivityWithSubImages extends Activity {
  subImageUrls: SubImageUrl[];
}

interface ActivityInfo {
  bannerImageUrl: string;
  title: string;
  id: number;
}

type ReservationStatus = keyof typeof RESERVATION_STATUS;

export interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: ActivityInfo;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export type Time = {
  id: number;
  startTime: string;
  endTime: string;
};

export type TimeSlot = {
  date: string;
  times: Time[];
};
