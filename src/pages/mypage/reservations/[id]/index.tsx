import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';

const Id = () => {
  return <div>a</div>;
};
export default Id;

Id.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
