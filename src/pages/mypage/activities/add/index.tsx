import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';
import ActivitiesForm from '@/components/MyPage/Activities/ActivitiesForm';
import useMyActivitiesAdd from '@/hooks/Mypage/Activities/Add/useMyActivitiesAdd';

function ActivityAdd() {
  const { methods, handleOnSubmit } = useMyActivitiesAdd();
  return <ActivitiesForm methods={methods} handleOnSubmit={handleOnSubmit} />;
}

export default ActivityAdd;
ActivityAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
