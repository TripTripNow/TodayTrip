import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import {
  RESERVATION_DETAILS_MODAL_DETAILED_TIME_MOCK_DATA,
  RESERVATION_DETAILS_MODAL_DETAILED_TIME_MOCK_DATA_PROPS,
} from '@/components/ReservationDashboard/mock';
import ModalDetailedCard from '@/components/ReservationDashboard/Modal/ModalDetailedCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import NoResult from '@/components/common/NoResult/NoResult';
import { GetReservedScheduleRes } from '@/types/myActivities';
import styles from './ModalContent.module.css';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import { getReservationsByTime } from '@/api/myActivities';

interface ModalContentProps {
  setDropdownItem: Dispatch<SetStateAction<DropdownItems>>;
  items: GetReservedScheduleRes[];
  dropdownItem: DropdownItems;
  date: string;
  tabStatus: string;
  activityId: number;
}

function ModalContent({ setDropdownItem, items, dropdownItem, date, tabStatus, activityId }: ModalContentProps) {
  const [cursorId, setCursorId] = useState();
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.timeReservation],
    queryFn: () =>
      getReservationsByTime({ activityId, cursorId, size: 3, scheduleId: dropdownItem.id, status: tabStatus }),
  });

  console.log('데이터', data);

  const cardItems = RESERVATION_DETAILS_MODAL_DETAILED_TIME_MOCK_DATA.reservations;

  return (
    <div className={styles.mainContainer}>
      {items ? (
        <>
          <ReservationDate setDropdownItem={setDropdownItem} items={items} dropdownItem={dropdownItem} date={date} />
          <ReservationDetails items={data?.reservations} tabStatus={tabStatus} />
        </>
      ) : (
        <NoResult text="예약 정보가 없습니다." />
      )}
    </div>
  );
}

export default ModalContent;

function ReservationDate({ setDropdownItem, items, dropdownItem, date }: Omit<ModalContentProps, 'tabStatus'>) {
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

function ReservationDetails({
  items,
  tabStatus,
}: {
  items: RESERVATION_DETAILS_MODAL_DETAILED_TIME_MOCK_DATA_PROPS['reservations'];
  tabStatus: string;
}) {
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

  return (
    <div>
      <h2 className={styles.subTitle}>예약 내역</h2>
      <div className={styles.cardsWrapper}>
        {showItems.map((item) => (
          <ModalDetailedCard item={item} key={item.id} tabStatus={tabStatus} />
        ))}
        <div ref={targetRef}></div>
      </div>
    </div>
  );
}
