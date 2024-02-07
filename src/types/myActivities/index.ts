export interface Reservations {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface Activities {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReservedScheduleCount {
  declined: number;
  confirmed: number;
  pending: number;
}

export interface ScheduleReservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 내 체험 리스트 조회 Parameter
 */

export interface GetMyActivitiesParam {
  teamId: string;
  cursorId?: number;
  size?: number;
}

/**
 * 내 체험 리스트 조회 Response
 */

export interface GetMyActivitiesRes {
  cursorId: number;
  totalCount: number;
  activities: Activities[];
}

/**
 * 내 체험 월별 예약 현황 조회 Parameter
 */

export interface GetReservationDashboardParam {
  teamId: string;
  activityId: number;
  year: string;
  month: string;
}

/**
 * 내 체험 월별 예약 현황 조회 Response
 */

export interface GetReservationDashboardRes {
  date: string;
  reservations: Reservations;
}

/**
 * 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회 Parameter
 */

export interface GetReservedScheduleParam {
  teamId: string;
  activityId: number;
  date: string;
}

/**
 * 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회 Response
 */

export interface GetReservedScheduleRes {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: ReservedScheduleCount;
}

/**
 * 내 체험 예약 시간대별 예약 내역 조회 Parameter
 */

export interface GetReservationsParam {
  teamId: string;
  activityId: number;
  cursorId?: number;
  size?: number;
  scheduleId: number;
  status: 'declined' | 'pending' | 'confirmed';
}

/**
 * 내 체험 예약 시간대별 예약 내역 조회 Response
 */

export interface GetReservationsRes {
  cursorId: number;
  totalCount: number;
  reservations: ScheduleReservation[];

  // nickname 없이
}

/**
 * 내 체험 예약 상태(승인, 거절) 업데이트 Param
 */

export interface PatchReservationsParam {
  teamId: string;
  activityId: number;
  reservationId: number;
}

/**
 * 내 체험 예약 상태(승인, 거절) 업데이트 Request
 */

export interface PatchReservationsReq {
  status: string;
}

/**
 * 내 체험 예약 상태(승인, 거절) 업데이트 Response
 */

export type PatchReservationsRes = Omit<ScheduleReservation, 'nickname'>;

/**
 * 내 체험 삭제 Parameter
 */

export interface DeleteMyActivityParam {
  teamId: string;
  activityId: number;
}

/**
 * 내 체험 수정 Parameter
 */

export interface PatchMyActivityParam {
  teamId: string;
  activity: number;
}

/**
 * 내 체험 수정 Request
 */

export interface PatchMyActivityReq {
  title: string;
  category: '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: unknown[];
  subImageUrlsToAdd: unknown[];
  scheduleIdsToRemove: unknown[];
  schedulesToAdd: unknown[];
}

/**
 * 내 체험 수정 Response
 */

export interface PatchMyActivityRes {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: { imageUrl: string; id: number }[];
  schedules: {
    times: {
      endTime: string;
      startTime: string;
      id: number;
    }[];
    date: string;
  }[];
}
