import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import styles from './ReservationModal.module.css';
import CloseIcon from '#/icons/icon-modalClose.svg';
import Calendar, { OnArgs, TileArgs } from 'react-calendar';
import Button from '@/components/common/Button/Button';
import style from '@/components/Activities/ReservationDateTimePicker/ReservationDateTimePicker.module.css';
import clsx from 'clsx';
import 'react-calendar/dist/Calendar.css';
import { Value } from '@/types/Calendar';
import { Dispatch, SetStateAction, useState } from 'react';
import { Time } from '@/types/common/api';
import ParticipantsPicker from '@/components/Activities/ReservationDateTimePicker/ParticipantsPicker/ParticipantsPicker';

interface ReservationModalProps {
  dateValue: Value;
  setDateValue: Dispatch<SetStateAction<Value>>;
  filteredTimes: Time[] | undefined;
  handleTimeButtonClick: (id: number | null) => void;
  handleDateButtonText: (clickedPossibleTimeIdInModal: number | null) => void;
  handleModalToggle: () => void;
  participantsValue: number;
  setParticipantsValue: Dispatch<SetStateAction<number>>;
  handleOnActiveStartDateChange: ({ activeStartDate }: OnArgs) => void;
  clickedTimeButtonId: number | null;
  handleTileDisabled: ({ date }: TileArgs) => boolean;
}

function ReservationModal({
  dateValue,
  setDateValue,
  filteredTimes,
  handleTimeButtonClick,
  handleDateButtonText,
  handleModalToggle,
  participantsValue,
  setParticipantsValue,
  handleOnActiveStartDateChange,
  clickedTimeButtonId,
  handleTileDisabled,
}: ReservationModalProps) {
  const [clickedPossibleTimeIdInModal, setClickedPossibleTimeIdInModal] = useState<number | null>(clickedTimeButtonId);

  const handleSelectButtonClick = () => {
    handleModalToggle();
    handleDateButtonText(clickedPossibleTimeIdInModal);
    handleTimeButtonClick(clickedPossibleTimeIdInModal);
  };

  const handleCalendarDateChange = (value: Value) => {
    setDateValue(value);
    if (clickedPossibleTimeIdInModal) {
      setClickedPossibleTimeIdInModal(null);
    }
  };

  const handleCalendarMonthChangeInModal = (activeStartDate: OnArgs) => {
    handleOnActiveStartDateChange(activeStartDate);
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
            onActiveStartDateChange={(activeStartDate) => handleCalendarMonthChangeInModal(activeStartDate)}
            className={clsx(style.customCalendar, styles.visible)}
            value={dateValue}
            minDate={new Date()}
            tileDisabled={handleTileDisabled}
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
            <ParticipantsPicker participantsValue={participantsValue} setParticipantsValue={setParticipantsValue} />
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
