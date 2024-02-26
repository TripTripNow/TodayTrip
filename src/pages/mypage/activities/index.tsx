import styles from './Activities.module.css';
import { ReactElement } from 'react';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import ActivitiesCard from '@/components/MyPage/Activities/ActivitiesCard';
import NoDataImg from '#/images/img-noData.png';
import Image from 'next/image';
import Link from 'next/link';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getMyActivities } from '@/api/myActivities';
import { setContext } from '@/api/axiosInstance';
import { GetServerSidePropsContext } from 'next';
import QUERY_KEYS from '@/constants/queryKeys';
import useMyActivities from '@/hooks/Mypage/Activities/useMyActivities';

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
              <div className={styles.noDataImgContainer}>
                <div className={styles.noDataImgWrapper}>
                  <Image src={NoDataImg} alt="등록한 체험이 없는 경우 뜨는 이미지" className={styles.noDataImg} />
                </div>
                <p className={styles.noDataImgContent}>아직 등록한 체험이 없어요</p>
              </div>
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
