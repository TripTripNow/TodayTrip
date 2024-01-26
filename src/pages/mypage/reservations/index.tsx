import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';

function Reservations() {
  return (
    <div>
      <div>예약 내역</div>
    </div>
  );
}

export default Reservations;
Reservations.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
