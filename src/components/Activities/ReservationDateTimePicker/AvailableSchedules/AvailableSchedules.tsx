import Button from '@/components/common/Button/Button';
import styles from './AvailableSchedules.module.css';
import { Time } from '@/types/common/api';

interface AvailableSchedulesProps {
  handleTimeButtonClick: (id: number | null) => void;
  clickedTimeButtonId: number | null;
  filteredTimes: Time[] | undefined;
}
function AvailableSchedules({ handleTimeButtonClick, clickedTimeButtonId, filteredTimes }: AvailableSchedulesProps) {
  return (
    <>
      <h2 className={styles.label}>예약 가능한 시간</h2>
      <div className={styles.timeButtonContainer}>
        {filteredTimes?.map((time) => (
          <Button
            key={time.id}
            type="time"
            color={time.id === clickedTimeButtonId ? 'green' : 'white'}
            onClick={() => {
              handleTimeButtonClick(time.id);
            }}
          >
            {time.startTime}~{time.endTime}
          </Button>
        ))}
      </div>
    </>
  );
}

export default AvailableSchedules;
