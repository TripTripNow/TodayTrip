import { ReactElement, useEffect, useState } from 'react';
import FilterDropDown from '@/components/FilterDropdown/FilterDropdown';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { BACKEND_RESERVATION_STATUS } from '@/constants/reservation';
import { ReserveFilterOption } from '@/types/dropdown';
import styles from './Reservations.module.css';
import { QueryClient, dehydrate, useInfiniteQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import { getMyReservations } from '@/api/myReservations';
import ReservationCard from '@/components/MyPage/Reservations/ReservationCard/ReservationCard';
import { GetServerSidePropsContext } from 'next';
import { setContext } from '@/api/axiosInstance';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  setContext(context);

  const a = await queryClient.fetchInfiniteQuery({
    queryKey: [QUERY_KEYS.reservations, '전체'],
    queryFn: ({ pageParam }) => {
      const status = BACKEND_RESERVATION_STATUS['전체'];
      return getMyReservations({ size: 6, status, cursorId: pageParam });
    },
    initialPageParam: 0,
  });
  console.log('출력', a.pages);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
function Reservations() {
  const [selectedStatus, setSelectedStatus] = useState<ReserveFilterOption>('예약 상태');
  const { isVisible, targetRef } = useInfiniteScroll();

  const queryKey = selectedStatus === '예약 상태' ? '전체' : selectedStatus;
  const reservations = useInfiniteQuery({
    queryKey: [QUERY_KEYS.reservations, queryKey],
    queryFn: ({ pageParam }) => {
      const status = BACKEND_RESERVATION_STATUS[selectedStatus];
      return getMyReservations({ size: 6, status, cursorId: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  useEffect(() => {
    if (isVisible) {
      reservations.fetchNextPage();
    }
  }, [isVisible]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.label}>예약 내역</h2>

        <FilterDropDown type="예약 상태" value={selectedStatus} setValue={setSelectedStatus} />
      </div>

      {reservations?.data?.pages.map((reservations) =>
        reservations.reservations?.map((reservation) => <ReservationCard key={reservation.id} data={reservation} />),
      )}

      {/* 무한 스크롤을 위한 target */}
      <div ref={targetRef}></div>
    </div>
  );
}

export default Reservations;
Reservations.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
