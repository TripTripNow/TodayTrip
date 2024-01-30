import styles from './Activities.module.css';
import { useState, ReactElement, useEffect } from 'react';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { myActivitiesMock } from '@/components/MyPage/Activities/ActivitiesMock';
import ActivitiesCard from '@/components/MyPage/Activities/ActivitiesCard';
import NoDataImg from '#/images/img-noData.png';
import Image from 'next/image';
import Link from 'next/link';

function Activities() {
  const [visibleMock, setVisibleMock] = useState(6);
  const { isVisible, targetRef } = useInfiniteScroll();

  const filteredMyActivities = [myActivitiesMock.activities.slice(0, visibleMock)][0];

  const handleEnrollButton = () => {};

  useEffect(() => {
    if (isVisible) {
      setVisibleMock((prev) => prev + 6);
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
              filteredMyActivities.map((item) => (
                <div key={item.id}>
                  <ActivitiesCard item={item} />
                </div>
              ))
            ) : (
              <div className={styles.noDataImgContainer}>
                <div className={styles.noDataImgWrapper}>
                  <Image src={NoDataImg} alt="없는데이터" className={styles.noDataImg} />
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
