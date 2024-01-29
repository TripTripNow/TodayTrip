import styles from './Reservations.module.css';
import { ReactElement, useEffect, useState } from 'react';
import Card from '@/components/Reservations/Card/Card';
import { reservations } from '@/components/Reservations/mock';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import MyPageLayout from '@/components/MyPage/MyPageLayout';

const STATUS_OPTIONS = [
  { id: 1, value: 'pending', name: '예약 완료' },
  { id: 2, value: 'canceled', name: '예약 취소' },
  { id: 3, value: 'confirmed', name: '예약 승인' },
  { id: 4, value: 'declined', name: '예약 거절' },
  { id: 6, value: 'completed', name: '체험 완료' },
];

function Reservation() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [visibleReservations, setVisibleReservations] = useState(6);
  const { isVisible, targetRef } = useInfiniteScroll();

  useEffect(() => {
    if (isVisible) {
      setVisibleReservations((prev) => prev + 6);
    }
  }, [isVisible]);

  // TODO : api 연동 후 지울 예정
  const filteredReservations =
    selectedStatus === 'all'
      ? reservations.slice(0, visibleReservations)
      : reservations.filter((reservation) => reservation.status === selectedStatus).slice(0, visibleReservations);

  //TODO : api 연동 이후 쿼리 업데이트를 위해 해당 코드 사용 예정
  // const router = useRouter();
  // useEffect(() => {
  //   router.push(`/mypage/reservations?status=${selectedStatus}`);
  // }, [selectedStatus]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.h2}>예약 내역</h2>

        {/* TODO : 소은님 드롭다운으로 변경할 예정 */}
        <select defaultValue="" onChange={(e) => setSelectedStatus(e.target.value)}>
          <option disabled value="" hidden>
            예약 상태
          </option>
          <option value="all">전체</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
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
