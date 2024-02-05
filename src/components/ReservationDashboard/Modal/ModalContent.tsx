import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import {
  RESERVATION_DETAILS_MODAL_DETAILED_TIME_MOCK_DATA,
  RESERVATION_DETAILS_MODAL_DETAILED_TIME_MOCK_DATA_PROPS,
} from '@/components/ReservationDashboard/mock';
import ModalDetailedCard from '@/components/ReservationDashboard/Modal/ModalDetailedCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import NoResult from '@/components/common/NoResult/NoResult';
import { ReservedScheduleItem } from '@/types/api';
import styles from './ModalContent.module.css';

interface ModalContentProps {
  setDropdownItem: Dispatch<SetStateAction<DropdownItems>>;
  items: ReservedScheduleItem[];
  dropdownItem: DropdownItems;
  date: string;
  tabStatus: string;
}

function ReservationDate({ setDropdownItem, items, dropdownItem, date }: Omit<ModalContentProps, 'tabStatus'>) {
  const showDateArr = date.split('.');

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
      <Dropdown type="예약한 시간" setDropdownItem={setDropdownItem} items={timeItems} dropDownItem={dropdownItem} />
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
  const { isVisible, targetRef } = useInfiniteScroll();

  useEffect(() => {
    if (isVisible && items.length > visibleItems) {
      setVisibleItems((prev) => prev + 2);
    }
  }, [isVisible]);

  const showItems = items.filter((item) => item.status === tabStatus).slice(0, visibleItems);

  return (
    <div className={styles.detailsContainer}>
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

function ReservationStatus({ itemCnt }: { itemCnt: number }) {
  return (
    <div className={styles.statusContainer}>
      <h3>예약 현황</h3>
      <h3>{itemCnt}</h3>
    </div>
  );
}

function ModalContent({ setDropdownItem, items, dropdownItem, date, tabStatus }: ModalContentProps) {
  const scheduleId = items.find((item) => {
    const [startTime, endTime] = dropdownItem.title.split(' ~ ');
    if (item.startTime === startTime && item.endTime === endTime) return item;
  })?.scheduleId;

  const cardItems = RESERVATION_DETAILS_MODAL_DETAILED_TIME_MOCK_DATA.reservations;

  return (
    <div className={styles.mainContainer}>
      {items ? (
        <>
          <ReservationDate setDropdownItem={setDropdownItem} items={items} dropdownItem={dropdownItem} date={date} />
          <ReservationDetails items={cardItems} tabStatus={tabStatus} />
          <ReservationStatus itemCnt={cardItems.length} />
        </>
      ) : (
        <NoResult text="예약 정보가 없습니다." />
      )}
    </div>
  );
}

export default ModalContent;
