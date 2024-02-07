import { ReactElement, useEffect, useState } from 'react';

import { INITIAL_DROPDOWN_ITEM } from '@/constants/dropdown';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import Calendar from '@/components/ReservationDashboard/Calendar/Calendar';
import { RESERVATION_DETAILS_MY_ACTIVITIES_MOCK_DATA } from '@/components/ReservationDashboard/mock';
import NoResult from '@/components/common/NoResult/NoResult';
import styles from './ReservationDashboard.module.css';

function ReservationDashboard() {
  const [dropDownItem, setDropdownItem] = useState<DropdownItems>(INITIAL_DROPDOWN_ITEM); // 드랍다운 value 값
  const experiencesData =
    RESERVATION_DETAILS_MY_ACTIVITIES_MOCK_DATA?.activities.map((activity) => {
      return {
        id: activity.id,
        title: activity.title,
      };
    }) ?? [];

  /** @todo 체험명 변경 시 API 요청 후 받아 온 데이터들을 날짜 데이터에 뿌리기 */
  const handleExperienceTitle = async () => {};

  useEffect(() => {
    handleExperienceTitle();
  }, [dropDownItem]);

  return (
    <>
      <h1 className={styles.title}>예약 현황</h1>
      {experiencesData.length > 0 ? (
        <>
          <Dropdown
            type="체험"
            dropDownItems={experiencesData}
            setDropdownItem={setDropdownItem}
            placeholder={experiencesData[0].title}
          />
          <Calendar activityId={dropDownItem.id} />
        </>
      ) : (
        <NoResult text="아직 등록한 체험이 없어요" />
      )}
    </>
  );
}

export default ReservationDashboard;

ReservationDashboard.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
