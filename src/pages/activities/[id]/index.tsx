import Header from '@/components/Activities/Header/Header';
import styles from './Activity.module.css';
import MainContent from '@/components/Activities/MainContent/MainContent';
import { activityData } from '@/components/Activities/mock';

import ReservationDateTimePicker from '@/components/Activities/ReservationDateTimePicker/ReservationDateTimePicker';

function ActivityID() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.mainContainer}>
        <Header data={activityData} />
        <div className={styles.contentContainer}>
          <MainContent data={activityData} />
          <ReservationDateTimePicker data={activityData} />
        </div>
      </main>
    </div>
  );
}
[];

export default ActivityID;
