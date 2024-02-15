import { ReactElement, useEffect, useState } from 'react';

import { INITIAL_DROPDOWN_ITEM } from '@/constants/dropdown';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import Calendar from '@/components/ReservationDashboard/Calendar/Calendar';
import NoResult from '@/components/common/NoResult/NoResult';
import styles from './ReservationDashboard.module.css';
import { GetServerSideProps } from 'next';
import { setContext } from '@/api/axiosInstance';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import { getMyActivities } from '@/api/myActivities';

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

  /** @todo 체험명 변경 시 API 요청 후 받아 온 데이터들을 날짜 데이터에 뿌리기 */
  const handleExperienceTitle = async () => {};

  useEffect(() => {
    handleExperienceTitle();
  }, [dropDownItem]);

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
