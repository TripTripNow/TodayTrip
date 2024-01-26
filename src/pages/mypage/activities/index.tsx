import styles from './Activities.module.css';
import KebabIcon from '#/icons/icon-kebab.svg';
import { useState } from 'react';

function Activities() {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const myActivitiesMock = [1, 2, 3];

  const handleKebabButton = () => {
    setIsKebabOpen((prev) => !prev);
  };
  return (
    <>
      <div>Navbar</div>
      <div className={styles.activitiesContainer}>
        <div className={styles.mystatus}>왼쪽 상태창</div>
        <div className={styles.activitiesContent}>
          <div className={styles.activitiesContentHeader}>
            <div>내 체험 관리</div>
            <button className={styles.activitiesButton}>체험 등록하기</button>
          </div>
          <div className={styles.activitiesItemContainer}>
            {myActivitiesMock.map((item, index) => (
              <div className={styles.activitiesItemWrapper} key={index}>
                <div className={styles.activitiesItemImg}>이미지</div>
                <div className={styles.activitiesItemContent}>
                  <div className={styles.activitiesItemContentHeader}>
                    <div>별</div>
                    <div>평점 (리뷰수)</div>
                  </div>
                  <div className={styles.activitiesItemContentTitle}>함께 배우면 즐거운 스트릿 댄스</div>
                  <div className={styles.activitiesItemContentFooter}>
                    <div>￦10,000 /인</div>
                    <button onClick={handleKebabButton}>
                      <KebabIcon />
                    </button>
                    {isKebabOpen ? (
                      <div className={styles.activitiesKebabWrapper}>
                        <div className={styles.activitiesKebabContent}>수정하기</div>
                        <hr />
                        <div className={styles.activitiesKebabContent}>삭제하기</div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>Footer</div>
    </>
  );
}

export default Activities;
