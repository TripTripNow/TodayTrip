import { setContext } from '@/api/axiosInstance';
import { getMyReservations } from '@/api/myReservations';
import FilterDropDown from '@/components/FilterDropdown/FilterDropdown';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import ReservationCard from '@/components/MyPage/Reservations/ReservationCard/ReservationCard';
import QUERY_KEYS from '@/constants/queryKeys';
import { BACKEND_RESERVATION_STATUS, NO_DATA_RESERVATION, ReservationStatus } from '@/constants/reservation';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { ReserveFilterOption } from '@/types/dropdown';
import { QueryClient, dehydrate, keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect, useState } from 'react';
import styles from './Reservations.module.css';
import NoResult from '@/components/common/NoResult/NoResult';
import HeadMeta from '@/components/HeadMeta/HeadMeta';
import { META_TAG } from '@/constants/metaTag';

const RESERVE_LIST: ReserveFilterOption[] = ['전체', '예약 신청', '예약 취소', '예약 승인', '예약 거절', '체험 완료'];
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
      const status =
        BACKEND_RESERVATION_STATUS[selectedStatus] === 'all' || BACKEND_RESERVATION_STATUS[selectedStatus] === 'initial'
          ? null
          : BACKEND_RESERVATION_STATUS[selectedStatus];
      return getMyReservations({ size: 6, status, cursorId: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
    select: (data) => (data.pages ?? []).flatMap((page) => page.reservations),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible]);

  return (
    <>
      <HeadMeta title={META_TAG.reseravationsList['title']} description={META_TAG.reseravationsList['description']} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.label}>예약 내역</h2>

          <FilterDropDown list={RESERVE_LIST} value={selectedStatus} setValue={setSelectedStatus} />
        </div>

        {reservationData?.length ? (
          reservationData?.map((reservation) => <ReservationCard key={reservation.id} data={reservation} />)
        ) : (
          <NoResult text={NO_DATA_RESERVATION[BACKEND_RESERVATION_STATUS[selectedStatus]]} />
        )}

        {/* 무한 스크롤을 위한 target */}
        <div ref={targetRef}></div>
      </div>
    </>
  );
}

export default Reservations;
Reservations.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
