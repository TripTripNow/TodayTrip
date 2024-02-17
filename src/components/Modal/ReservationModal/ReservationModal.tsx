import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import styles from './ReservationModal.module.css';
import CloseIcon from '#/icons/icon-modalClose.svg';
import Calendar from 'react-calendar';
import Button from '@/components/common/Button/Button';
import style from '@/components/Activities/ReservationDateTimePicker/ReservationDateTimePicker.module.css';
import MinusIcon from '#/icons/icon-minus.svg';
import PlusIcon from '#/icons/icon-smallPlus.svg';
import clsx from 'clsx';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { Value } from '@/types/Calendar';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Time } from '@/types/common/api';

interface ReservationModalProps {
  dateValue: Value;
  setDateValue: Dispatch<SetStateAction<Value>>;
  filteredTimes: Time[] | undefined;
  handleTimeButtonClick: (id: number | null) => void;
  setDateButtonText: Dispatch<SetStateAction<string>>;
  handleModalToggle: () => void;
  participantsValue: number;
  setParticipantsValue: Dispatch<SetStateAction<number>>;
  handleCalendarMonthChange: () => void;
  clickedTimeButtonId: number | null;
}

function ReservationModal({
  dateValue,
  setDateValue,
  filteredTimes,
  handleTimeButtonClick,
  setDateButtonText,
  handleModalToggle,
  participantsValue,
  setParticipantsValue,
  handleCalendarMonthChange,
  clickedTimeButtonId,
}: ReservationModalProps) {
  const [clickedPossibleTimeIdInModal, setClickedPossibleTimeIdInModal] = useState<number | null>(clickedTimeButtonId);

  const handleSelectButtonClick = () => {
    handleModalToggle();
    setDateButtonText(`
      ${dayjs(dateValue as Date).format('YYYY/MM/DD')}
      ${filteredTimes?.find((e) => e.id === clickedPossibleTimeIdInModal)?.startTime} ~
      ${filteredTimes?.find((e) => e.id === clickedPossibleTimeIdInModal)?.endTime}`);

    handleTimeButtonClick(clickedPossibleTimeIdInModal);
  };

  const handleCalendarDateChange = (value: Value) => {
    setDateValue(value);
    if (clickedPossibleTimeIdInModal) {
      setClickedPossibleTimeIdInModal(null);
    }
  };

  const handleCalendarMonthChangeInModal = () => {
    handleCalendarMonthChange();
    setClickedPossibleTimeIdInModal(null);
  };

  return (
    <ModalLayout handleModalClose={handleModalToggle}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.bigLabel}>날짜</h1>
          <button onClick={handleModalToggle}>
            <CloseIcon alt="모달 닫기 아이콘" />
          </button>
        </div>

        <div className={styles.content}>
          <Calendar
            prev2Label={null}
            next2Label={null}
            calendarType="gregory"
            locale="en"
            onChange={handleCalendarDateChange}
            onActiveStartDateChange={handleCalendarMonthChangeInModal}
            className={clsx(style.customCalendar, styles.visible)}
            value={dateValue}
            minDate={new Date()}
          />
          <div className={style.possibleTime} style={{ display: 'flex' }}>
            <h2 className={styles.label}>예약 가능한 시간</h2>
            <div className={style.timeButtonContainer}>
              {filteredTimes?.map((time) => (
                <Button
                  key={time.id}
                  type="time"
                  color={
                    time.id === clickedTimeButtonId || time.id === clickedPossibleTimeIdInModal ? 'green' : 'white'
                  }
                  onClick={() => {
                    if (clickedTimeButtonId) {
                      handleTimeButtonClick(null);
                    }
                    if (clickedPossibleTimeIdInModal === time.id || clickedTimeButtonId === time.id) {
                      setClickedPossibleTimeIdInModal(null);
                      return;
                    }
                    setClickedPossibleTimeIdInModal(time.id);
                  }}
                >
                  {time.startTime}~{time.endTime}
                </Button>
              ))}
            </div>
            <div className={clsx(style.participants, styles.onlyMobile)}>
              <h2 className={styles.label}>참여 인원 수</h2>
              <div className={style.stepper}>
                <button
                  className={style.minusButton}
                  disabled={participantsValue <= 1}
                  onClick={() => setParticipantsValue((prev) => prev - 1)}
                >
                  <MinusIcon fill="#4B4B4B" alt="참여 인원 수 줄이기 아이콘" />
                </button>
                <input
                  className={style.participantsInput}
                  value={participantsValue}
                  onChange={(e) => setParticipantsValue(+e.target.value)}
                  min={1}
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
          </div>
        </div>

        <Button
          onClick={handleSelectButtonClick}
          isDisabled={!clickedPossibleTimeIdInModal}
          color="green"
          type="modalSingle"
        >
          선택하기
        </Button>
      </div>
    </ModalLayout>
  );
}

export default ReservationModal;
