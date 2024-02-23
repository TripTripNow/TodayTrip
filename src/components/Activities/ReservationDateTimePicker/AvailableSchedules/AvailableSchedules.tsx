import Button from '@/components/common/Button/Button';
import styles from './AvailableSchedules.module.css';
function AvailableSchedules({ handleTimeButtonClick, clickedTimeButtonId, filteredTimes }) {
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
              if (clickedTimeButtonId) {
                handleTimeButtonClick(null);
              }
              if (clickedTimeButtonId === time.id) {
                handleTimeButtonClick(null);
                return;
              }
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
