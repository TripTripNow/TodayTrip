import instance from '@/api/axiosInstance';
import {
  GetMyActivitiesParam,
  GetMyActivitiesRes,
  GetReservationDashboardParam,
  GetReservationDashboardRes,
  GetReservationsParam,
  GetReservationsRes,
  GetReservedScheduleParam,
  GetReservedScheduleRes,
  PatchReservationsParam,
  PatchReservationsRes,
} from '@/types/myActivities';

/** 내 체험 리스트 조회 */
export const getMyActivities = async ({ cursorId, size = 20 }: GetMyActivitiesParam): Promise<GetMyActivitiesRes> => {
  return await instance.get(`/my-activities?size=${size}${cursorId ? `&cursorId=${cursorId}` : ''}`);
};

/** 내 체험 월별 예약 현황 조회 */
export const getReservationDashboard = async ({
  activityId,
  year,
  month,
}: GetReservationDashboardParam): Promise<GetReservationDashboardRes[]> => {
  return await instance.get(`my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`);
};

/** 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회 */
export const getReservedSchedule = async ({
  activityId,
  date,
}: GetReservedScheduleParam): Promise<GetReservedScheduleRes[]> => {
  return await instance.get(`my-activities/${activityId}/reserved-schedule?date=${date}`);
};

/** 내 체험 예약 시간대별 예약 내역 조회 */
export const getReservationsByTime = async ({
  activityId,
  cursorId,
  size = 10,
  scheduleId,
  status,
}: GetReservationsParam): Promise<GetReservationsRes> => {
  let path = '';
  if (cursorId) path += `&cursorId=${cursorId}`;

  return await instance.get(
    `my-activities/${activityId}/reservations?size=${size}&scheduleId=${scheduleId}&status=${status}${path}`,
  );
};

/** 내 예약 수정 (취소) */
export const patchReservationsById = async ({
  activityId,
  reservationId,
  status,
}: PatchReservationsParam): Promise<PatchReservationsRes> => {
  return await instance.patch(`my-activities/${activityId}/reservations/${reservationId}`, { status });
};
