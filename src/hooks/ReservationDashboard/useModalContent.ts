import { useEffect } from 'react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { getReservationsByTime } from '@/api/myActivities';
import QUERY_KEYS from '@/constants/queryKeys';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { DropdownItems } from '@/components/common/DropDown/Dropdown';
import { DailyReservationStatusCount } from '@/types/common/api';

interface UseModalContentProps {
  tabStatus: keyof DailyReservationStatusCount;
  activityId: number;
  dropdownItem: DropdownItems;
}

const useModalContent = ({ tabStatus, activityId, dropdownItem }: UseModalContentProps) => {
  const { data, fetchNextPage, isError, isPending } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.timeReservation, dropdownItem.id, tabStatus],
    queryFn: ({ pageParam }) =>
      getReservationsByTime({
        activityId,
        cursorId: pageParam,
        size: 3,
        scheduleId: dropdownItem.id,
        status: tabStatus,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
    select: (data) => (data.pages ?? []).flatMap((page) => page.reservations),
    placeholderData: keepPreviousData,
  });
  const showItems = data?.filter((item) => item.status === tabStatus);

  useEffect(() => {
    setRerender((prev) => !prev);
  }, [tabStatus, data]);

  const { isVisible, targetRef, setRerender } = useInfiniteScroll();
  useEffect(() => {
    if (isVisible) fetchNextPage();
  }, [isVisible]);

  useEffect(() => {
    if (isError) toast.error('데이터를 불러올 수 없습니다.');
  }, [isError]);

  return { isPending, targetRef, data, showItems };
};

export default useModalContent;
