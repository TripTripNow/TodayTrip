import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';
import ActivitiesForm from '@/components/MyPage/Activities/ActivitiesForm';
import useMyActivitiesAdd from '@/hooks/Mypage/Activities/Add/useMyActivitiesAdd';
import HeadMeta from '@/components/HeadMeta/HeadMeta';
import { META_TAG } from '@/constants/metaTag';

function ActivityAdd() {
  const { methods, handleOnSubmit } = useMyActivitiesAdd();
  return (
    <>
      <HeadMeta title={META_TAG.activitiesEdit['title']} description={META_TAG.activitiesEdit['description']} />
      <ActivitiesForm methods={methods} handleOnSubmit={handleOnSubmit} />
    </>
  );
}

export default ActivityAdd;
ActivityAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
