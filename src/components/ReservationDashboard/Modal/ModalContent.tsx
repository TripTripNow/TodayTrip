import { Dispatch, RefObject, SetStateAction } from 'react';

import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import ModalDetailedCard from '@/components/ReservationDashboard/Modal/ModalDetailedCard';
import NoResult from '@/components/common/NoResult/NoResult';
import { GetReservedScheduleRes } from '@/types/myActivities';
import { DailyReservationStatusCount, ScheduledReservation } from '@/types/common/api';
import styles from './ModalContent.module.css';
import useModalContent from '@/hooks/ReservationDashboard/useModalContent';
import { NO_DATA_RESERVATION } from '@/constants/reservation';

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
  isFetchingGetReservationByTime: boolean;
  activityId: number;
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
  const { targetRef, isFetchingGetReservationByTime, data, showItems, isPassedTime } = useModalContent({
    tabStatus,
    dropdownItem,
    activityId,
    date,
  });

  return (
    <div className={styles.mainContainer}>
      {timeItems && data && (
        <>
          <ReservationDate
            setDropdownItem={setDropdownItem}
            items={timeItems}
            dropdownItem={dropdownItem}
            date={date}
          />
          <ReservationDetails
            activityId={activityId}
            items={showItems!}
            tabStatus={tabStatus}
            targetRef={targetRef}
            isPassedTime={isPassedTime}
            isFetchingGetReservationByTime={isFetchingGetReservationByTime}
          />
        </>
      )}
      {!isFetchingGetReservationByTime && timeItems.length <= 0 && !data && <NoResult text="예약 정보가 없습니다." />}
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

function ReservationDetails({
  items,
  tabStatus,
  targetRef,
  isPassedTime,
  isFetchingGetReservationByTime,
  activityId,
}: ReservationDetailsProps) {
  return (
    <div>
      <h2 className={styles.subTitle}>예약 내역</h2>
      {items.length > 0 && (
        <div className={styles.cardsWrapper}>
          {items.map((item) => (
            <ModalDetailedCard
              item={item}
              key={item.id}
              tabStatus={tabStatus}
              isPassedTime={isPassedTime}
              activityId={activityId}
            />
          ))}
          <div ref={targetRef} style={{ position: 'absolute', bottom: '50px' }}></div>
        </div>
      )}
      {!isFetchingGetReservationByTime && items.length <= 0 && <NoResult text={NO_DATA_RESERVATION[tabStatus]} />}
    </div>
  );
}
