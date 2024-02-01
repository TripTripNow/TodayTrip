import { ReactElement, useState } from 'react';

import MyPageLayout from '@/components/MyPage/MyPageLayout';
import Dropdown from '@/components/common/DropDown/Dropdown';
import Calendar from '@/components/ReservationDashboard/Calendar/Calendar';

import styles from './ReservationDashboard.module.css';
import { RESERVATION_DETAILS_MONTH_MOCK_DATA, RESERVATION_TITLE_MOCK_DATA } from '@/constants/mock';
import NoResult from '@/components/Home/NoResult/NoResult';

function ReservationDashboard() {
  const [dropdownItem, setDropdownItem] = useState<string>(''); // 드랍다운 value 값
  const experiencesData = RESERVATION_TITLE_MOCK_DATA?.activities.map((activity) => activity.title) ?? [];

  const calendarItems = RESERVATION_DETAILS_MONTH_MOCK_DATA;

  return (
    <>
      <h1 className={styles.title}>예약 현황</h1>
      {experiencesData.length > 0 ? (
        <>
          <Dropdown type="체험" items={experiencesData} setDropdownItem={setDropdownItem} />
          <Calendar items={calendarItems} />
        </>
      ) : (
        <NoResult text="아직 등록한 체험이 없어요" />
      )}
    </>
  );
}

export default ReservationDashboard;

ReservationDashboard.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
