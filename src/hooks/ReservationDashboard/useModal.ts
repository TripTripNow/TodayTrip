import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { getReservedSchedule } from '@/api/myActivities';
import QUERY_KEYS from '@/constants/queryKeys';
import { DailyReservationStatusCount } from '@/types/common/api';

interface UseModalProps {
  date: string;
  activityId: number;
}

const useModal = ({ date, activityId }: UseModalProps) => {
  const { data: dailyReservationData, isError } = useQuery({
    queryKey: [QUERY_KEYS.dailyReservation, date],
    queryFn: () => getReservedSchedule({ activityId, date }),
  });

  const [dropdownItem, setDropdownItem] = useState<{ id: number; title: string }>({ id: 0, title: '' });
  const [tabStatus, setTabStatus] = useState<keyof DailyReservationStatusCount>('pending');

  const handleStatus = (status: keyof DailyReservationStatusCount) => {
    setTabStatus(status);
  };

  const tabCount = dailyReservationData?.find((item) => item.scheduleId === dropdownItem.id)?.count;

  useEffect(() => {
    if (dailyReservationData && dailyReservationData.length > 0 && dropdownItem.id === 0)
      setDropdownItem({
        id: dailyReservationData[0].scheduleId,
        title: `${dailyReservationData[0].startTime} ~ ${dailyReservationData[0].endTime}`,
      });
  }, [dailyReservationData]);

  useEffect(() => {
    if (isError) toast.error('데이터를 불러올 수 없습니다.');
  }, [isError]);

  return { dailyReservationData, handleStatus, tabStatus, tabCount, setDropdownItem, dropdownItem };
};
export default useModal;
