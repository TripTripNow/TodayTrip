import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import ModalDetailedCard from '@/components/ReservationDashboard/Modal/ModalDetailedCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import NoResult from '@/components/common/NoResult/NoResult';
import { GetReservedScheduleRes } from '@/types/myActivities';
import { DailyReservationStatusCount, ScheduledReservation } from '@/types/common/api';
import QUERY_KEYS from '@/constants/queryKeys';
import { getReservationsByTime } from '@/api/myActivities';
import styles from './ModalContent.module.css';

interface ModalContentProps {
  setDropdownItem: Dispatch<SetStateAction<DropdownItems>>;
  items: GetReservedScheduleRes[];
  dropdownItem: DropdownItems;
  date: string;
  tabStatus: keyof DailyReservationStatusCount;
  activityId: number;
}

interface ReservationDetailsProps {
  items: ScheduledReservation[];
  tabStatus: keyof DailyReservationStatusCount;
}

type ReservationDateProps = Pick<ModalContentProps, 'setDropdownItem' | 'items' | 'dropdownItem' | 'date'>;

function ModalContent({
  setDropdownItem,
  items: timeItems,
  dropdownItem,
  date,
  tabStatus,
  activityId,
}: ModalContentProps) {
  const [cursorId, setCursorId] = useState<number | undefined | null>();
  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEYS.timeReservation],
    queryFn: () =>
      getReservationsByTime({ activityId, cursorId, size: 3, scheduleId: dropdownItem.id, status: tabStatus }),
  });

  useEffect(() => {
    refetch();
    if (data?.cursorId !== null) setCursorId(data?.cursorId);
  }, [dropdownItem.id, tabStatus]);

  return (
    <div className={styles.mainContainer}>
      {timeItems && data?.reservations ? (
        <>
          <ReservationDate
            setDropdownItem={setDropdownItem}
            items={timeItems}
            dropdownItem={dropdownItem}
            date={date}
          />
          <ReservationDetails items={data?.reservations} tabStatus={tabStatus} />
        </>
      ) : (
        <NoResult text="예약 정보가 없습니다." />
      )}
    </div>
  );
}

export default ModalContent;

function ReservationDate({ setDropdownItem, items, dropdownItem, date }: ReservationDateProps) {
  const showDateArr = date.split('-');

  const timeItems = items.map((item) => {
    return {
      id: item.scheduleId,
      title: `${item.startTime} ~ ${item.endTime}`,
    };
  });

  return (
    <div className={styles.dateContainer}>
      <h2 className={styles.subTitle}>예약 날짜</h2>
      <p className={styles.date}>{`${showDateArr[0]}년 ${showDateArr[1]}월 ${showDateArr[2]}일`}</p>
      <Dropdown
        type="예약한 시간"
        setDropdownItem={setDropdownItem}
        dropDownItems={timeItems}
        placeholder={dropdownItem.title}
      />
    </div>
  );
}

function ReservationDetails({ items, tabStatus }: ReservationDetailsProps) {
  const [visibleItems, setVisibleItems] = useState(3);
  const { isVisible, targetRef, setIsVisible } = useInfiniteScroll();
  const showItems = items.filter((item) => item.status === tabStatus).slice(0, visibleItems);

  useEffect(() => {
    setVisibleItems(3);
    setIsVisible(false);
  }, [tabStatus]);

  useEffect(() => {
    if (isVisible && items.length > visibleItems) {
      setVisibleItems((prev) => prev + 2);
    }
  }, [isVisible]);

  let text = '신청 내역이 없습니다.';
  switch (tabStatus) {
    case 'confirmed':
      text = '승인 내역이 없습니다.';
      break;
    case 'declined':
      text = '거절 내역이 없습니다.';
      break;
    case 'pending':
      text = '신청 내역이 없습니다.';
      break;
  }

  return (
    <div>
      <h2 className={styles.subTitle}>예약 내역</h2>
      {showItems.length > 0 ? (
        <div className={styles.cardsWrapper}>
          {showItems.map((item) => (
            <ModalDetailedCard item={item} key={item.id} tabStatus={tabStatus} />
          ))}
          <div ref={targetRef}></div>
        </div>
      ) : (
        <NoResult text={text} />
      )}
    </div>
  );
}
