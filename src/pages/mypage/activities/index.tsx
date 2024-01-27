import styles from './Activities.module.css';
import { useState, ReactElement, useEffect } from 'react';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { myActivitiesMock } from '@/components/MyPage/Activities/ActivitiesMock';
import ActivitiesCard from '@/components/MyPage/Activities/ActivitiesCard';

function Activities() {
  const [visibleMock, setVisibleMock] = useState(6);
  const { isVisible, targetRef } = useInfiniteScroll();

  const filteredReservations = myActivitiesMock.activities.slice(0, visibleMock);

  useEffect(() => {
    if (isVisible) {
      setVisibleMock((prev) => prev + 3);
    }
  }, [isVisible]);
  return (
    <>
      <div className={styles.activitiesContainer}>
        <div className={styles.activitiesContent}>
          <div className={styles.activitiesContentHeader}>
            <p>내 체험 관리</p>
            <button className={styles.activitiesButton}>체험 등록하기</button>
          </div>
          <div className={styles.activitiesItemContainer}>
            {filteredReservations.map((item) => (
              <div key={item.id}>
                <ActivitiesCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div ref={targetRef}></div>
    </>
  );
}

export default Activities;
Activities.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
