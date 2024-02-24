import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import MyPageLayout from '@/components/MyPage/MyPageLayout';
import Dropdown from '@/components/common/DropDown/Dropdown';
import Calendar from '@/components/ReservationDashboard/Calendar/Calendar';
import NoResult from '@/components/common/NoResult/NoResult';
import { setContext } from '@/api/axiosInstance';
import QUERY_KEYS from '@/constants/queryKeys';
import { getMyActivities } from '@/api/myActivities';
import { useReservationDashboard } from '@/hooks/ReservationDashboard/useReservationDashboard';
import styles from './ReservationDashboard.module.css';
import HeadMeta from '@/components/HeadMeta/HeadMeta';
import { META_TAG } from '@/constants/metaTag';

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [QUERY_KEYS.myActivities],
    queryFn: ({ pageParam }) => getMyActivities({ size: 5, cursorId: pageParam }),
    initialPageParam: 0,
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

function ReservationDashboard() {
  const { dropdownData, dropDownItem, setDropdownItem, fetchNextPage } = useReservationDashboard();

  return (
    <>
      <HeadMeta
        title={META_TAG.reservationDashboard['title']}
        description={META_TAG.reservationDashboard['description']}
      />
      <h1 className={styles.title}>예약 현황</h1>
      {dropdownData!.length > 0 ? (
        <>
          <Dropdown
            type="체험"
            dropDownItems={dropdownData}
            setDropdownItem={setDropdownItem}
            placeholder={dropdownData[0].title}
            fetchNextPage={fetchNextPage}
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
