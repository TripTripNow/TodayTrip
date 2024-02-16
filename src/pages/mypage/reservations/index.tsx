import { ReactElement, useEffect, useState } from 'react';
import FilterDropDown from '@/components/FilterDropdown/FilterDropdown';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { BACKEND_RESERVATION_STATUS } from '@/constants/reservation';
import { ReserveFilterOption } from '@/types/dropdown';
import styles from './Reservations.module.css';
import Card from '@/components/MyPage/Reservations/ReservationCard/ReservationCard';

import { useInfiniteQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import { getMyReservations } from '@/api/myReservations';

function Reservations() {
  const [selectedStatus, setSelectedStatus] = useState<ReserveFilterOption>('예약 상태');
  const { isVisible, targetRef } = useInfiniteScroll();

  const reservations = useInfiniteQuery({
    queryKey: [QUERY_KEYS.reservations],
    queryFn: ({ pageParam }) => {
      const status = BACKEND_RESERVATION_STATUS[selectedStatus];
      return getMyReservations({ size: 6, status, cursorId: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  // // TODO : api 연동 후 지울 예정
  // const filteredReservations =
  //   selectedStatus === '전체' || selectedStatus === '예약 상태'
  //     ? reservations.slice(0, visibleReservations)
  //     : reservations
  //         .filter((reservation) => RESERVATION_STATUS[reservation.status] === selectedStatus)
  //         .slice(0, visibleReservations);

  useEffect(() => {
    // if (reservations?.data?.pages[0].cursorId === null) return;
    if (isVisible) {
      reservations.fetchNextPage();
    }
  }, [isVisible]);

  //TODO : api 연동 이후 쿼리 업데이트를 위해 해당 코드 사용 예정
  // const router = useRouter();
  // useEffect(() => {
  //   router.push(`/mypage/reservations?status=${selectedStatus}`);
  // }, [selectedStatus]);

  // useEffect(() => {
  //   if(reservationsData)
  // } )
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.label}>예약 내역</h2>

        <FilterDropDown type="예약 상태" value={selectedStatus} setValue={setSelectedStatus} />
      </div>

      {reservations?.data?.pages.map((reservations) =>
        reservations.reservations.map((reservation) => <Card key={reservation.id} data={reservation} />),
      )}

      {/* 무한 스크롤을 위한 target */}
      <div ref={targetRef}></div>
    </div>
  );
}

export default Reservations;
Reservations.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
