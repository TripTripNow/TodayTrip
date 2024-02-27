import { Dispatch, RefObject, SetStateAction } from 'react';

import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import ModalDetailedCard from '@/components/ReservationDashboard/Modal/ModalDetailedCard';
import NoResult from '@/components/common/NoResult/NoResult';
import { GetReservedScheduleRes } from '@/types/myActivities';
import { DailyReservationStatusCount, ScheduledReservation } from '@/types/common/api';
import styles from './ModalContent.module.css';
import useModalContent from '@/hooks/ReservationDashboard/useModalContent';

const NO_DATA_IN_RESERVATION_MODAL = {
  confirmed: '승인 내역이 없습니다.',
  declined: '거절 내역이 없습니다.',
  pending: '신청 내역이 없습니다.',
};

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
  targetRef: RefObject<HTMLDivElement>;
  isPassedTime: boolean;
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
  const { targetRef, isPending, data, showItems, isPassedTime } = useModalContent({
    tabStatus,
    dropdownItem,
    activityId,
    date,
  });

  if (isPending) return null;
  return (
    <div className={styles.mainContainer}>
      {timeItems && data ? (
        <>
          <ReservationDate
            setDropdownItem={setDropdownItem}
            items={timeItems}
            dropdownItem={dropdownItem}
            date={date}
          />
          <ReservationDetails
            items={showItems!}
            tabStatus={tabStatus}
            targetRef={targetRef}
            isPassedTime={isPassedTime}
          />
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
      <p
        className={styles.date}
      >{`${Number(showDateArr[0])}년 ${Number(showDateArr[1])}월 ${Number(showDateArr[2])}일`}</p>
      <Dropdown
        type="예약한 시간"
        setDropdownItem={setDropdownItem}
        dropDownItems={timeItems}
        placeholder={dropdownItem.title}
      />
    </div>
  );
}

function ReservationDetails({ items, tabStatus, targetRef, isPassedTime }: ReservationDetailsProps) {
  return (
    <div>
      <h2 className={styles.subTitle}>예약 내역</h2>
      {items.length > 0 ? (
        <div className={styles.cardsWrapper}>
          {items.map((item) => (
            <ModalDetailedCard item={item} key={item.id} tabStatus={tabStatus} isPassedTime={isPassedTime} />
          ))}
          <div ref={targetRef}></div>
        </div>
      ) : (
        <NoResult text={NO_DATA_IN_RESERVATION_MODAL[tabStatus]} />
      )}
    </div>
  );
}
