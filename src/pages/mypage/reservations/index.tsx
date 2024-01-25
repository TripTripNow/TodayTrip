// Reservation.tsx
import styles from './Reservations.module.css';
import { useEffect, useState } from 'react';
import Card from '@/components/Reservations/Card/Card';
import { reservations } from '@/pages/mypage/reservations/mock';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

function Reservation() {
  const statusOptions = [
    { id: 1, value: 'pending', name: '예약 완료' },
    { id: 2, value: 'canceled', name: '예약 취소' },
    { id: 3, value: 'confirmed', name: '예약 승인' },
    { id: 4, value: 'declined', name: '예약 거절' },
    { id: 6, value: 'completed', name: '체험 완료' },
  ];

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [visibleReservations, setVisibleReservations] = useState(5);
  const { isVisible, targetRef } = useInfiniteScroll();

  useEffect(() => {
    if (isVisible) {
      setVisibleReservations((prev) => prev + 5);
    }
  }, [isVisible]);

  const filteredReservations =
    selectedStatus === 'all'
      ? reservations.slice(0, visibleReservations)
      : reservations.filter((reservation) => reservation.status === selectedStatus).slice(0, visibleReservations);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.h2}>예약 내역</h2>
          <select defaultValue="" onChange={(e) => setSelectedStatus(e.target.value)}>
            <option disabled value="" hidden>
              예약 상태
            </option>
            <option value="all">전체</option>
            {statusOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        {filteredReservations.map((reservation) => (
          <Card key={reservation.id} data={reservation} />
        ))}
        <div ref={targetRef}></div>
      </div>
    </div>
  );
}

export default Reservation;
