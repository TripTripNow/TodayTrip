import { RESERVATION_STATUS } from '@/constants/reservation';

type Activity = {
  bannerImageUrl: string;
  title: string;
  id: number;
};

type Status = keyof typeof RESERVATION_STATUS;

export interface Reservations {
  data: {
    id: number;
    activity: Activity;
    scheduleId: number;
    status: Status;
    reviewSubmitted: boolean;
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
  };
}
