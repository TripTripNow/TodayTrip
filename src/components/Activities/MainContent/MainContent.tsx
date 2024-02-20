import styles from './MainContent.module.css';
import style from '@/pages/activities/[id]/Activity.module.css';

import ReviewList from '@/components/Activities/ReviewList/ReviewList';
import { Activity } from '@/types/common/api';
import Map from '@/components/common/Map/Map';

//지도 크기 설정
const containerStyle = {
  width: '100%',
  height: '45em',
};

interface MainContentProps {
  data: Activity;
}

function MainContent({ data }: MainContentProps) {
  return (
    <div className={styles.leftContentContainer}>
      <hr className={style.hr} />

      <section className={styles.descriptionWrapper}>
        <h2 className={style.label}>체험 설명</h2>
        <p className={styles.description}>{data.description}</p>
      </section>
      <hr className={style.hr} />
      <Map address={data.address} containerStyle={containerStyle} />
      <hr className={style.hr} />
      <ReviewList totalRating={data.rating} activityId={data.id} />
    </div>
  );
}

export default MainContent;
