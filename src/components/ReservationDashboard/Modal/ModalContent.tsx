import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  keepPreviousData,
  useInfiniteQuery,
} from '@tanstack/react-query';

import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import ModalDetailedCard from '@/components/ReservationDashboard/Modal/ModalDetailedCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import NoResult from '@/components/common/NoResult/NoResult';
import { GetReservedScheduleRes } from '@/types/myActivities';
import { DailyReservationStatusCount, ScheduledReservation } from '@/types/common/api';
import QUERY_KEYS from '@/constants/queryKeys';
import { getReservationsByTime } from '@/api/myActivities';
import styles from './ModalContent.module.css';

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
  handleModalClose: () => void;
}

interface ReservationDetailsProps {
  items: ScheduledReservation[];
  tabStatus: keyof DailyReservationStatusCount;
  handleModalClose: () => void;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<ScheduledReservation[], Error>>;
}

type ReservationDateProps = Pick<ModalContentProps, 'setDropdownItem' | 'items' | 'dropdownItem' | 'date'>;

function ModalContent({
  setDropdownItem,
  items: timeItems,
  dropdownItem,
  date,
  tabStatus,
  activityId,
  handleModalClose,
}: ModalContentProps) {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.timeReservation, dropdownItem.id, tabStatus],
    queryFn: ({ pageParam }) =>
      getReservationsByTime({
        activityId,
        cursorId: pageParam,
        size: 3,
        scheduleId: dropdownItem.id,
        status: tabStatus,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
    select: (data) => (data.pages ?? []).flatMap((page) => page.reservations),
    placeholderData: keepPreviousData,
  });
  const showItems = data?.filter((item) => item.status === tabStatus);

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
            handleModalClose={handleModalClose}
            fetchNextPage={fetchNextPage}
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

function ReservationDetails({ items, tabStatus, handleModalClose, fetchNextPage }: ReservationDetailsProps) {
  const { isVisible, targetRef, setIsVisible } = useInfiniteScroll();

  useEffect(() => {
    setIsVisible(false);
  }, [tabStatus]);

  useEffect(() => {
    if (isVisible) fetchNextPage();
  }, [isVisible]);

  return (
    <div>
      <h2 className={styles.subTitle}>예약 내역</h2>
      {items.length > 0 ? (
        <div className={styles.cardsWrapper}>
          {items.map((item) => (
            <ModalDetailedCard item={item} key={item.id} tabStatus={tabStatus} handleModalClose={handleModalClose} />
          ))}
          <div ref={targetRef}></div>
        </div>
      ) : (
        <NoResult text={NO_DATA_IN_RESERVATION_MODAL[tabStatus]} />
      )}
    </div>
  );
}
