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
} from '@/types/myActivities';

/** 내 체험 리스트 조회 */
export const getMyActivities = async ({ cursorId, size = 20 }: GetMyActivitiesParam) => {
  let path = '';
  if (cursorId) path += `&cursorId=${cursorId}`;

  const { data } = await instance.get<GetMyActivitiesRes>(`/my-activities?size=${size}${path}`);
  return data;
};

/** 내 체험 월별 예약 현황 조회 */
export const getReservationDashboard = async ({ activityId, year, month }: GetReservationDashboardParam) => {
  const { data } = await instance.get<GetReservationDashboardRes[]>(
    `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
  );
  return data;
};

/** 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회 */
export const getReservedSchedule = async ({ activityId, date }: GetReservedScheduleParam) => {
  const { data } = await instance.get<GetReservedScheduleRes[]>(
    `my-activities/${activityId}/reserved-schedule?date=${date}`,
  );
  return data;
};

/** 내 체험 예약 시간대별 예약 내역 조회 */
export const getReservationsByTime = async ({
  activityId,
  cursorId,
  size = 10,
  scheduleId,
  status,
}: GetReservationsParam) => {
  let path = '';
  if (cursorId) path += `&cursorId=${cursorId}`;

  const { data } = await instance.get<GetReservationsRes>(
    `my-activities/${activityId}/reservations?size=${size}&scheduleId=${scheduleId}&status=${status}`,
  );
  return data;
};
