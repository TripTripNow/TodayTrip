import { ReactElement } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import MyPageLayout from '@/components/MyPage/MyPageLayout';
import ActivitiesForm from '@/components/MyPage/Activities/ActivitiesForm';
import { getActivitiesId } from '@/api/activities';
import QUERY_KEYS from '@/constants/queryKeys';
import useMyActivitiesEdit from '@/hooks/Mypage/Activities/Edit/useMyActivitiesEdit';
import HeadMeta from '@/components/HeadMeta/HeadMeta';
import { META_TAG } from '@/constants/metaTag';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const activityId = Number(context.query['id']);
  const queryClient = new QueryClient();
  const sessionData = await getSession(context);

  try {
    const data = await queryClient.fetchQuery({
      queryKey: [QUERY_KEYS.activityEnroll, activityId],
      queryFn: () => getActivitiesId(activityId),
    });

    if (data.userId !== sessionData?.user.id) {
      return {
        notFound: true,
      };
    }

    return { props: { activityId, dehydratedState: dehydrate(queryClient) } };
  } catch {
    return {
      notFound: true,
    };
  }
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
