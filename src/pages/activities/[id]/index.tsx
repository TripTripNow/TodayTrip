import Header from '@/components/Activities/Header/Header';
import styles from './Activity.module.css';
import MainContent from '@/components/Activities/MainContent/MainContent';
import { activityData } from '@/components/Activities/mock';
import ReservationDateTimePicker from '@/components/Activities/ReservationDateTimePicker/ReservationDateTimePicker';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import instance, { fetchedData } from '@/api/axiosInstance';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Activity } from '@/types/common/api';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const activityId = context.query['id'];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['activity', activityId],
    queryFn: () => fetchedData<Activity>({ url: `/activities/${activityId}` }),
  });
  return { props: { activityId, dehydratedState: dehydrate(queryClient) } };
};

function ActivityID({ activityId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: activityData } = useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => fetchedData<Activity>({ url: `/activities/${activityId}` }),
  });

  if (!activityData) return;

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <Header data={activityData} />
        <main className={styles.contentContainer}>
          <MainContent data={activityData} />
          <ReservationDateTimePicker data={activityData} />
        </main>
      </div>
    </div>
  );
}

export default ActivityID;
