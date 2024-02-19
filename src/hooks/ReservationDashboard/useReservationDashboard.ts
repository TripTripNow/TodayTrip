import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { getMyActivities } from '@/api/myActivities';
import { DropdownItems } from '@/components/common/DropDown/Dropdown';
import { INITIAL_DROPDOWN_ITEM } from '@/constants/dropdown';
import QUERY_KEYS from '@/constants/queryKeys';

export const useReservationDashboard = () => {
  const { data, fetchNextPage, isError } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.myActivities],
    queryFn: ({ pageParam }) => getMyActivities({ cursorId: pageParam, size: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
    select: (data) => (data?.pages ?? []).flatMap((page) => page.activities),
  });

  const dropdownData =
    data?.map((activity) => {
      return {
        id: activity.id,
        title: activity.title,
      };
    }) ?? [];
  const [dropDownItem, setDropdownItem] = useState<DropdownItems>(dropdownData[0] ?? INITIAL_DROPDOWN_ITEM); // 드랍다운 value 값

  useEffect(() => {
    if (isError) toast.error('데이터를 불러올 수 없습니다.');
  }, [isError]);

  return { dropdownData, dropDownItem, setDropdownItem, fetchNextPage };
};
