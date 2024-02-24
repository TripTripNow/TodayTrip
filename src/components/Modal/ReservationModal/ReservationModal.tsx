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
import AvailableSchedules from '@/components/Activities/ReservationDateTimePicker/AvailableSchedules/AvailableSchedules';

interface ReservationModalProps {
  dateValue: Value;
  setDateValue: Dispatch<SetStateAction<Value>>;
  filteredTimes: Time[] | undefined;
  handleDateButtonText: (clickedPossibleTimeIdInModal: number | null) => void;
  handleModalToggle: () => void;
  participantsValue: number;
  setParticipantsValue: Dispatch<SetStateAction<number>>;
  clickedTimeButtonId: number | null;
  setClickedTimeButtonId: Dispatch<SetStateAction<number | null>>;
  handleTileDisabled: ({ date }: TileArgs) => boolean;
}

function ReservationModal({
  dateValue,
  filteredTimes,
  setClickedTimeButtonId,
  handleDateButtonText,
  handleModalToggle,
  participantsValue,
  setParticipantsValue,
  clickedTimeButtonId,
  handleTileDisabled,
  setDateValue,
}: ReservationModalProps) {
  const [clickedPossibleTimeIdInModal, setClickedPossibleTimeIdInModal] = useState<number | null>(clickedTimeButtonId);

  const handleSelectButtonClick = () => {
    handleModalToggle();
    handleDateButtonText(clickedPossibleTimeIdInModal);
    setClickedTimeButtonId(clickedPossibleTimeIdInModal);
  };

  const handleCalendarDateChangeInModal = (value: Value) => {
    setDateValue(value);
    if (clickedPossibleTimeIdInModal) {
      setClickedPossibleTimeIdInModal(null);
    }
  };

  const handleCalendarMonthChangeInModal = ({ activeStartDate }: OnArgs) => {
    setDateValue(activeStartDate);
    setClickedPossibleTimeIdInModal(null);
  };

  const handleTimeButtonClick = (id: number | null) => {
    if (clickedTimeButtonId || clickedPossibleTimeIdInModal) {
      setClickedPossibleTimeIdInModal(null);
    }
    if (clickedPossibleTimeIdInModal === id || clickedTimeButtonId === id) {
      setClickedPossibleTimeIdInModal(null);
      setClickedTimeButtonId(null);
      return;
    }
    setClickedPossibleTimeIdInModal(id);
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
            onChange={handleCalendarDateChangeInModal}
            onActiveStartDateChange={(activeStartDate) => handleCalendarMonthChangeInModal(activeStartDate)}
            className={clsx(style.customCalendar, styles.visible)}
            value={dateValue}
            minDate={new Date()}
            tileDisabled={handleTileDisabled}
          />

          <div className={style.possibleTime} style={{ display: 'flex' }}>
            <AvailableSchedules
              handleTimeButtonClick={handleTimeButtonClick}
              clickedTimeButtonId={clickedPossibleTimeIdInModal}
              filteredTimes={filteredTimes}
            />

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
