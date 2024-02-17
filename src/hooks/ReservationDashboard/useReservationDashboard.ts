import { getMyActivities } from '@/api/myActivities';
import { DropdownItems } from '@/components/common/DropDown/Dropdown';
import { INITIAL_DROPDOWN_ITEM } from '@/constants/dropdown';
import QUERY_KEYS from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useReservationDashboard = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.myActivities],
    queryFn: () => getMyActivities({}),
  });
  const dropdownData =
    data?.activities.map((activity) => {
      return {
        id: activity.id,
        title: activity.title,
      };
    }) ?? [];
  const [dropDownItem, setDropdownItem] = useState<DropdownItems>(dropdownData[0] ?? INITIAL_DROPDOWN_ITEM); // 드랍다운 value 값

  return { dropdownData, dropDownItem, setDropdownItem };
};
