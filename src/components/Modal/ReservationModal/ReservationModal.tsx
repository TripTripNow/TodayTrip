import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import styles from './ReservationModal.module.css';
import CloseIcon from '#/icons/icon-modalClose.svg';
import Calendar from 'react-calendar';
import Button from '@/components/common/Button/Button';
import style from '@/components/Activities/ReservationDateTimePicker/ReservationDateTimePicker.module.css';

import clsx from 'clsx';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

function ReservationModal({
  dateValue,
  setDateValue,
  handleModalToggle,
  filteredTimes,
  clickedTimeButtonId,
  handleTimeButtonClick,
  setDateButtonText,
}: any) {
  const handleButtonClick = () => {
    handleModalToggle();
    setDateButtonText(`
      ${dayjs(dateValue as Date).format('YYYY-MM-DD')}
      ${filteredTimes.find((e: any) => e.id === clickedTimeButtonId).startTime} ~
      ${filteredTimes.find((e: any) => e.id === clickedTimeButtonId).endTime}`);
  };

  return (
    <ModalLayout handleModalClose={handleModalToggle}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.h2}>날짜</h2>
          <button onClick={handleModalToggle}>
            <CloseIcon alt="모달 닫기 아이콘" />
          </button>
        </div>

        <div className={styles.content} style={{ display: 'flex', justifyContent: 'center' }}>
          <Calendar
            prev2Label={null}
            next2Label={null}
            calendarType="gregory"
            locale="en"
            onChange={setDateValue}
            className={clsx(style.customCalendar, styles.visible)}
            value={dateValue}
            minDate={new Date()}
          />
          <div className={style.possibleTime} style={{ display: 'flex' }}>
            <h2 className={styles.h2} style={{ fontSize: '1.8rem' }}>
              예약 가능한 시간
            </h2>

            <div className={style.timeButtonContainer}>
              {filteredTimes?.map((time: any) => (
                <Button
                  key={time.id}
                  type="time"
                  color={time.id === clickedTimeButtonId ? 'green' : 'white'}
                  onClick={() => handleTimeButtonClick(time.id)}
                >
                  {time.startTime}~{time.endTime}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Button onClick={handleButtonClick} isDisabled={!clickedTimeButtonId} color="green" type="modalSingle">
          선택하기
        </Button>
      </div>
    </ModalLayout>
  );
}

export default ReservationModal;
