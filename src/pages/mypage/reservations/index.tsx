import { setContext } from '@/api/axiosInstance';
import { getMyReservations } from '@/api/myReservations';
import FilterDropDown from '@/components/FilterDropdown/FilterDropdown';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import ReservationCard from '@/components/MyPage/Reservations/ReservationCard/ReservationCard';
import QUERY_KEYS from '@/constants/queryKeys';
import { BACKEND_RESERVATION_STATUS, ReservationStatus } from '@/constants/reservation';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { ReserveFilterOption } from '@/types/dropdown';
import { QueryClient, dehydrate, useInfiniteQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect, useState } from 'react';
import styles from './Reservations.module.css';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  setContext(context);

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QUERY_KEYS.reservations, QUERY_KEYS.all],
    queryFn: ({ pageParam }) => {
      const status = BACKEND_RESERVATION_STATUS[QUERY_KEYS.all];
      return getMyReservations({ size: 6, status, cursorId: pageParam });
    },
    initialPageParam: 0,
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

function Reservations() {
  const [selectedStatus, setSelectedStatus] = useState<ReserveFilterOption>(ReservationStatus.initial);
  const { isVisible, targetRef } = useInfiniteScroll();

  const queryKey = selectedStatus === ReservationStatus.initial ? ReservationStatus.all : selectedStatus;

  const { data: reservationData, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.reservations, queryKey],
    queryFn: ({ pageParam }) => {
      const status = BACKEND_RESERVATION_STATUS[selectedStatus];
      return getMyReservations({ size: 6, status, cursorId: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
    select: (data) => (data.pages ?? []).flatMap((page) => page.reservations),
  });

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.label}>예약 내역</h2>

        <FilterDropDown type="예약 상태" value={selectedStatus} setValue={setSelectedStatus} />
      </div>

      {reservationData?.map((reservation) => <ReservationCard key={reservation.id} data={reservation} />)}

      {/* 무한 스크롤을 위한 target */}
      <div ref={targetRef}></div>
    </div>
  );
}

export default Reservations;
Reservations.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
