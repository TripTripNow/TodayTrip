import { ReactElement, useState } from 'react';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';

import { INITIAL_DROPDOWN_ITEM } from '@/constants/dropdown';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import Calendar from '@/components/ReservationDashboard/Calendar/Calendar';
import NoResult from '@/components/common/NoResult/NoResult';
import { setContext } from '@/api/axiosInstance';
import QUERY_KEYS from '@/constants/queryKeys';
import { getMyActivities } from '@/api/myActivities';
import styles from './ReservationDashboard.module.css';
import { useReservationDashboard } from '@/hooks/ReservationDashboard/useReservationDashboard';

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.myActivities],
    queryFn: () => getMyActivities({}),
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

function ReservationDashboard() {
  const { dropdownData, dropDownItem, setDropdownItem } = useReservationDashboard();

  return (
    <>
      <h1 className={styles.title}>예약 현황</h1>
      {dropdownData!.length > 0 ? (
        <>
          <Dropdown
            type="체험"
            dropDownItems={dropdownData}
            setDropdownItem={setDropdownItem}
            placeholder={dropdownData[0].title}
          />
          <Calendar activityId={dropDownItem.id} />
        </>
      ) : (
        <NoResult text="아직 등록한 체험이 없어요" />
      )}
    </>
  );
}

export default ReservationDashboard;

ReservationDashboard.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
