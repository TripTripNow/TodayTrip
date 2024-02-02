import { reviews } from '@/components/Activities/mock';
import styles from './ReviewList.module.css';
import style from '@/pages/activities/[id]/Activity.module.css';

function ReviewList() {
  // const { reviews, totalCount } = reviews;

  return (
    <div className={styles.reviewContainer}>
      <h2 className={style.h2}>후기</h2>
      <div className={styles.rating}>
        <div>
          <h3>{}</h3>
        </div>
      </div>
    </div>
  );
}

export default ReviewList;
