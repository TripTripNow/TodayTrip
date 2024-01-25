import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';

function MyPage() {
  return (
    <div>
      <div>내 정보 페이지</div>
    </div>
  );
}

export default MyPage;

MyPage.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
