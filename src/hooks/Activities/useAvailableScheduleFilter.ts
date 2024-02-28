import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { getAvailableSchedule } from '@/api/activities';
import QUERY_KEYS from '@/constants/queryKeys';
import { Time } from '@/types/common/api';
import { Value } from '@/types/Calendar';

interface useAvailableScheduleFilterProps {
  dateValue: Value;
  activityId: number;
}
const useAvailableScheduleFilter = ({ dateValue, activityId }: useAvailableScheduleFilterProps) => {
  const [filteredTimes, setFilteredTimes] = useState<Time[]>();
  const formattedDate = dayjs(dateValue as Date).format('YYYY-MM-DD');
  const formattedYear = dayjs(dateValue as Date).format('YYYY');
  const formattedMonth = dayjs(dateValue as Date).format('MM');
  const currentTime = dayjs();

  const { data: monthlyAvailableScheduleData } = useQuery({
    queryKey: [QUERY_KEYS.activity, activityId, formattedYear, formattedMonth],
    queryFn: () => getAvailableSchedule({ activityId, year: formattedYear, month: formattedMonth }),
  });

  useEffect(() => {
    if (!dateValue || !monthlyAvailableScheduleData) {
      setFilteredTimes([]);
      return;
    }

    const availableDate = monthlyAvailableScheduleData.find((slot) => slot.date === formattedDate);

    const filteredTimes = availableDate?.times.filter((time) => {
      const startTime = time.startTime;

      /* 오늘 날짜의 경우 현재 시간이 시작 시간 이전인 것만 보여줘야함 
      만약 현재 시간이 시작 시간 이후라면 false를 리턴시켜 필터링 */
      return currentTime.isSame(formattedDate, 'date') ? currentTime.isBefore(dayjs(startTime, 'HH:mm')) : true;
    });

    setFilteredTimes(filteredTimes);
  }, [dateValue, monthlyAvailableScheduleData]);

  return { filteredTimes, setFilteredTimes, monthlyAvailableScheduleData };
};

export default useAvailableScheduleFilter;
