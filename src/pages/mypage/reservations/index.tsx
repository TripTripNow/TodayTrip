import styles from './Reservations.module.css';
import { ReactElement, useEffect, useState } from 'react';
import Card from '@/components/Reservations/Card/Card';
import { reservations } from '@/components/Reservations/mock';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import FilterDropDown from '@/components/FilterDropdown/FilterDropdown';
import { STATUS } from '@/constants/reservation';
import { ReserveFilterOption } from '@/types/dropdown';

function Reservation() {
  const [selectedStatus, setSelectedStatus] = useState<ReserveFilterOption>('예약 상태');
  const [visibleReservations, setVisibleReservations] = useState(6);
  const { isVisible, targetRef } = useInfiniteScroll();

  useEffect(() => {
    if (isVisible) {
      setVisibleReservations((prev) => prev + 6);
    }
  }, [isVisible]);

  // TODO : api 연동 후 지울 예정
  const filteredReservations =
    selectedStatus === '전체' || selectedStatus === '예약 상태'
      ? reservations.slice(0, visibleReservations)
      : reservations
          .filter((reservation) => STATUS[reservation.status] === selectedStatus)
          .slice(0, visibleReservations);

  //TODO : api 연동 이후 쿼리 업데이트를 위해 해당 코드 사용 예정
  // const router = useRouter();
  // useEffect(() => {
  //   router.push(`/mypage/reservations?status=${selectedStatus}`);
  // }, [selectedStatus]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.h2}>예약 내역</h2>

        <FilterDropDown type="예약 상태" value={selectedStatus} setValue={setSelectedStatus} />
      </div>

      {filteredReservations.map((reservation) => (
        <Card key={reservation.id} data={reservation} />
      ))}
      {/* 무한 스크롤을 위한 target */}
      <div ref={targetRef}></div>
    </div>
  );
}

export default Reservation;
Reservation.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
