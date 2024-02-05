import { ReactElement, useState } from 'react';

import MyPageLayout from '@/components/MyPage/MyPageLayout';

import styles from './ReservationDashboard.module.css';
import Dropdown from '@/components/common/DropDown/Dropdown';

function ReservationDashboard() {
  const [dropdownItem, setDropdownItem] = useState<string | number>(''); // 드랍다운 value 값

  return (
    <div>
      <h1 className={styles.title}>예약 현황</h1>
      <Dropdown setDropdownItem={setDropdownItem} />
      <div></div>
    </div>
  );
}

export default ReservationDashboard;

ReservationDashboard.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
