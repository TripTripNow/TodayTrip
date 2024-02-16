import styles from './Activities.module.css';
import { useState, ReactElement, useEffect } from 'react';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { myActivitiesMock } from '@/components/MyPage/Activities/ActivitiesMock';
import ActivitiesCard from '@/components/MyPage/Activities/ActivitiesCard';
import NoDataImg from '#/images/img-noData.png';
import Image from 'next/image';
import Link from 'next/link';
import { QueryClient, dehydrate, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMyActivities } from '@/api/myActivities';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['myActivities'],
    queryFn: () => getMyActivities(),
  });
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

function Activities() {
  const { isVisible, targetRef } = useInfiniteScroll();

  const { data: myActivityItems, fetchNextPage } = useInfiniteQuery({
    queryKey: ['myActivities'],
    queryFn: ({ pageParam }) => {
      console.log(pageParam);
      return getMyActivities(pageParam);
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      const currentCursorId = lastPage.cursorId;
      return currentCursorId;
    },
  });
  // console.log(myActivityItems);
  // console.log(activityItems);
  // console.log(
  //   'myActivityItems',
  //   myActivityItems?.pages.flatMap((page) => page.activities),
  // );
  // console.log(myActivityItems?.pages[myActivityItems?.pages.length - 1].cursorId);

  const filteredMyActivities = myActivityItems?.pages.flatMap((page) => page.activities);

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible]);
  return (
    <>
      <div className={styles.activitiesContainer}>
        <div className={styles.activitiesContent}>
          <div className={styles.activitiesContentHeader}>
            <p>내 체험 관리</p>
            <Link className={styles.activitiesButton} href={'/mypage/activities/add'}>
              체험 등록하기
            </Link>
          </div>
          <div className={styles.activitiesItemContainer}>
            {myActivitiesMock.totalCount ? (
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
