import { ReactElement } from 'react';

import MyPageLayout from '@/components/MyPage/MyPageLayout';

import styles from './ReservationDashboard.module.css';
import Dropdown from '@/components/common/DropDown/Dropdown';

function ReservationDashboard() {
  return (
    <div>
      <h1 className={styles.title}>예약 현황</h1>
      <Dropdown />
      <div></div>
    </div>
  );
}

export default ReservationDashboard;

ReservationDashboard.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
