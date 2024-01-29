import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

const Id = () => {
  const router = useRouter();
  return <div onClick={() => router.push('/mypage/reservations/3')}>a</div>;
};
export default Id;

Id.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
