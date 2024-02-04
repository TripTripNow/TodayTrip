import styles from './ReservationDateTimePicker.module.css';
import style from '@/pages/activities/[id]/Activity.module.css';
import Button from '@/components/common/Button/Button';
import MinusIcon from '#/icons/icon-minus.svg';
import PlusIcon from '#/icons/icon-plus.svg';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { Activity } from '@/types/Actvity';
import { timeSlot } from '@/components/Activities/mock';
import { Time, Value } from '@/types/Calendar';
import ReservationModal from '@/components/Modal/ReservationModal/ReservationModal';

interface ReservationDateTimePickerProps {
  data: Activity;
}
function ReservationDateTimePicker({ data }: ReservationDateTimePickerProps) {
  // 캘린더
  const [dateValue, setDateValue] = useState<Value>(null);
  const [filteredTimes, setFilteredTimes] = useState<Time[]>();

  // 선택한 날짜의 예약 가능 시간 대를 필터링하기 위한 useEffect
  useEffect(() => {
    const formattedValue = dayjs(dateValue as Date).format('YYYY-MM-DD');
    setFilteredTimes(timeSlot.find((slot) => slot.date === formattedValue)?.times);
  }, [dateValue]);

  // 예약 가능한 시간을 선택한 경우, 선택한 버튼만 초록색이 되게 만들기 위한 state
  const [clickedTimeButtonId, setClickedTimeButtonId] = useState<number | null>(null);

  const handleTimeButtonClick = (id: number) => {
    setClickedTimeButtonId(id);
  };

  // 참여 인원수 인풋과 연결될 value State
  const [participantsValue, setParticipantsValue] = useState<number>(1);

  const handleParticipantsValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParticipantsValue(Number(e.target.value));
  };

  // 초기엔 날짜 선택하기 => 선택한 이후에는 선택한 값으로 보이게 하는 state
  const [dateButtonText, setDateButtonText] = useState('날짜 선택하기');

  // 날짜 및 시간 선택하는 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
      <div className={styles.container}>
        <p className={styles.priceInPerson}>
          ￦{data.price.toLocaleString('ko-KR')}
          <span className={styles.span}>/ 인</span>
        </p>
        <hr className={style.hr} />
        <div className={styles.calendar}>
          <h2 className={style.h2} style={{ alignSelf: 'self-start' }}>
            날짜
          </h2>
          <button className={styles.selectButton} onClick={handleModalToggle}>
            {dateButtonText}
          </button>

          <Calendar
            prev2Label={null}
            next2Label={null}
            calendarType="gregory"
            locale="en"
            onChange={setDateValue}
            className={styles.customCalendar}
            value={dateValue}
            minDate={new Date()}
          />
        </div>
        <div className={styles.possibleTime}>
          <h2 className={style.h2}>예약 가능한 시간</h2>

          <div className={styles.timeButtonContainer}>
            {filteredTimes?.map((time) => (
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
        <hr className={style.hr} />
        <div className={styles.participants}>
          <h2 className={style.h2}>참여 인원 수</h2>
          <div className={styles.stepper}>
            <button
              className={styles.minusButton}
              disabled={participantsValue <= 1}
              onClick={() => setParticipantsValue((prev) => prev - 1)}
            >
              <MinusIcon fill="#4B4B4B" alt="참여 인원 수 줄이기 아이콘" />
            </button>
            <input
              className={styles.participantsInput}
              value={participantsValue}
              onChange={handleParticipantsValueChange}
              min={1}
              style={{ width: '3rem' }}
              // 숫자가 아닌 값을 입력할 경우 1로 세팅되게 만듦
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                if (isNaN(+e.target.value)) {
                  e.target.value = String(1);
                }
              }}
            />
            <button onClick={() => setParticipantsValue((prev) => prev + 1)}>
              <PlusIcon alt="참여 인원 수 늘리기 아이콘" />
            </button>
          </div>
        </div>
        <Button isDisabled={!clickedTimeButtonId || participantsValue === 0} color="green" type="modalSingle">
          예약하기
        </Button>
        <hr className={style.hr} style={{ marginTop: '0.8rem' }} />
        <div>
          <div className={styles.totalPrice}>
            <h2 className={style.h2}>총 합계</h2>
            <p className={style.h2}>￦{(data.price * participantsValue).toLocaleString('ko-KR')}</p>
          </div>
        </div>
      </div>
      <div className={styles.mobileSelectBar}>
        <div>
          <p className={styles.pricePerPersonWrapper}>
            ￦{(data.price * participantsValue).toLocaleString('ko-KR')} / {participantsValue}인
          </p>

          <button className={styles.mobileSelectButton} onClick={handleModalToggle}>
            {dateButtonText}
          </button>
        </div>
        <button className={styles.mobileReserveButton} disabled={!clickedTimeButtonId || participantsValue === 0}>
          예약하기
        </button>
      </div>

      {isModalOpen && (
        <ReservationModal
          setDateButtonText={setDateButtonText}
          filteredTimes={filteredTimes}
          clickedTimeButtonId={clickedTimeButtonId}
          handleModalToggle={handleModalToggle}
          dateValue={dateValue}
          setDateValue={setDateValue}
          handleTimeButtonClick={handleTimeButtonClick}
          participantsValue={participantsValue}
          setParticipantsValue={setParticipantsValue}
        />
      )}
    </>
  );
}

export default ReservationDateTimePicker;
