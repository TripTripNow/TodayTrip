import styles from './Activities.module.css';
import { ReactElement } from 'react';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import ActivitiesCard from '@/components/MyPage/Activities/ActivitiesCard';
import Link from 'next/link';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getMyActivities } from '@/api/myActivities';
import { setContext } from '@/api/axiosInstance';
import { GetServerSidePropsContext } from 'next';
import QUERY_KEYS from '@/constants/queryKeys';
import NoResult from '@/components/common/NoResult/NoResult';
import useMyActivities from '@/hooks/Mypage/Activities/useMyActivities';
import HeadMeta from '@/components/HeadMeta/HeadMeta';
import { META_TAG } from '@/constants/metaTag';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();

  setContext(context);
  await queryClient.prefetchInfiniteQuery({
    queryKey: [QUERY_KEYS.myActivities],
    queryFn: () => getMyActivities({}),
    initialPageParam: 0,
  });
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

function Activities() {
  const { filteredMyActivities, targetRef } = useMyActivities();
  return (
    <>
      <HeadMeta title={META_TAG.activityManage['title']} description={META_TAG.activityManage['description']} />
      <div className={styles.activitiesContainer}>
        <div className={styles.activitiesContent}>
          <div className={styles.activitiesContentHeader}>
            <h1 className={styles.activitiesContentTitle}>내 체험 관리</h1>
            <Link className={styles.activitiesButton} href={'/mypage/activities/add'}>
              체험 등록하기
            </Link>
          </div>
          <div className={styles.activitiesItemContainer}>
            {filteredMyActivities?.length ? (
              filteredMyActivities?.map((item) => (
                <div key={item.id}>
                  <ActivitiesCard item={item} />
                </div>
              ))
            ) : (
              <NoResult text="아직 등록한 체험이 없어요" />
            )}
          </div>
        </div>
      </div>
      <div ref={targetRef}></div>
    </>
  );
}

export default Activities;
Activities.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
