import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';
import ActivitiesForm from '@/components/MyPage/Activities/ActivitiesForm';
import { getActivitiesId } from '@/api/activities';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import useMyActivitiesEdit from '@/hooks/Mypage/Activities/Edit/useMyActivitiesEdit';
import HeadMeta from '@/components/HeadMeta/HeadMeta';
import { META_TAG } from '@/constants/metaTag';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const activityId = Number(context.query['id']);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.activityEnroll, activityId],
    queryFn: () => getActivitiesId(activityId),
  });

  return { props: { activityId, dehydratedState: dehydrate(queryClient) } };
};

function ActivityEdit({ activityId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { methods, handleOnSubmit, latlng } = useMyActivitiesEdit(activityId);
  return (
    <>
      <HeadMeta title={META_TAG.activitiesEdit['title']} description={META_TAG.activitiesEdit['description']} />
      <ActivitiesForm methods={methods} handleOnSubmit={handleOnSubmit} latlng={latlng} isEdit={true} />
    </>
  );
}

export default ActivityEdit;
ActivityEdit.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
