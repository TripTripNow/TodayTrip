import { Activity, Category, ReservationStatus, ScheduledReservation, TimeSlot } from '@/types/common/api';
import { FieldValues } from 'react-hook-form';

export interface MonthlyReservationStatusCount {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface DailyReservationStatusCount {
  declined: number;
  confirmed: number;
  pending: number;
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
  activities: Activity[];
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
  reservations: MonthlyReservationStatusCount;
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
  count: DailyReservationStatusCount;
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
  status: keyof DailyReservationStatusCount;
}

/**
 * 내 체험 예약 시간대별 예약 내역 조회 Response
 */

export interface GetReservationsRes {
  cursorId: number;
  totalCount: number;
  reservations: ScheduledReservation[];

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
  status: ReservationStatus;
}

/**
 * 내 체험 예약 상태(승인, 거절) 업데이트 Response
 */

export type PatchReservationsRes = Omit<ScheduledReservation, 'nickname'>;

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

export interface PatchMyActivityReq extends FieldValues {
  title: string;
  category: Category;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: { date: string; startTime: string; endTime: string }[];
}
