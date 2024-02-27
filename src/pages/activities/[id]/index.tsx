import Header from '@/components/Activities/Header/Header';
import styles from './Activity.module.css';
import MainContent from '@/components/Activities/MainContent/MainContent';
import ReservationDateTimePicker from '@/components/Activities/ReservationDateTimePicker/ReservationDateTimePicker';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { Activity } from '@/types/common/api';
import QUERY_KEYS from '@/constants/queryKeys';
import { getActivityById } from '@/api/activities';
import HeadMeta from '@/components/HeadMeta/HeadMeta';
import { META_TAG } from '@/constants/metaTag';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const activityId = Number(context.query['id']);

  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: [QUERY_KEYS.activity, activityId],
      queryFn: () => getActivityById({ activityId }),
    });
    return { props: { activityId, dehydratedState: dehydrate(queryClient) } };
  } catch {
    return { notFound: true };
  } finally {
    queryClient.clear();
  }
};

function ActivityID({ activityId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: activityData } = useQuery<Activity>({
    queryKey: [QUERY_KEYS.activity, activityId],
    queryFn: () => getActivityById({ activityId }),
  });

  if (!activityData) return;

  return (
    <>
      <HeadMeta title={META_TAG.activityDetail['title']} description={META_TAG.activityDetail['description']} />
      <div className={styles.wrapper}>
        <div className={styles.mainContainer}>
          <Header data={activityData} />
          <main className={styles.contentContainer}>
            <MainContent data={activityData} />
            <ReservationDateTimePicker data={activityData} />
          </main>
        </div>
      </div>
    </>
  );
}

export default ActivityID;
