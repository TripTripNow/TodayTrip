import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import styles from './ReservationModal.module.css';
import CloseIcon from '#/icons/icon-modalClose.svg';
import Calendar, { OnArgs, TileArgs } from 'react-calendar';
import Button from '@/components/common/Button/Button';
import style from '@/components/Activities/ReservationDateTimePicker/ReservationDateTimePicker.module.css';
import clsx from 'clsx';
import 'react-calendar/dist/Calendar.css';
import { Value } from '@/types/Calendar';
import { Dispatch, SetStateAction } from 'react';
import { Time } from '@/types/common/api';
import ParticipantsPicker from '@/components/Activities/ReservationDateTimePicker/ParticipantsPicker/ParticipantsPicker';
import AvailableSchedules from '@/components/Activities/ReservationDateTimePicker/AvailableSchedules/AvailableSchedules';

interface ReservationModalProps {
  dateValue: Value;
  filteredTimes: Time[] | undefined;
  handleTimeButtonClick: (id: number | null) => void;
  handleDateButtonText: (clickedPossibleTimeIdInModal: number | null) => void;
  handleModalToggle: () => void;
  participantsValue: number;
  setParticipantsValue: Dispatch<SetStateAction<number>>;
  handleOnActiveStartDateChange: ({ activeStartDate }: OnArgs) => void;
  clickedTimeButtonId: number | null;
  handleTileDisabled: ({ date }: TileArgs) => boolean;
  handleCalendarDateChange: (value: Value) => void;
}

function ReservationModal({
  dateValue,
  filteredTimes,
  handleTimeButtonClick,
  handleDateButtonText,
  handleModalToggle,
  participantsValue,
  setParticipantsValue,
  handleOnActiveStartDateChange,
  clickedTimeButtonId,
  handleTileDisabled,
  handleCalendarDateChange,
}: ReservationModalProps) {
  const handleSelectButtonClick = () => {
    handleModalToggle();
    handleDateButtonText(clickedTimeButtonId);
    handleTimeButtonClick(clickedTimeButtonId);
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
            onActiveStartDateChange={(activeStartDate) => handleOnActiveStartDateChange(activeStartDate)}
            className={clsx(style.customCalendar, styles.visible)}
            value={dateValue}
            minDate={new Date()}
            tileDisabled={handleTileDisabled}
          />
          <div className={style.possibleTime} style={{ display: 'flex' }}>
            <AvailableSchedules
              handleTimeButtonClick={handleTimeButtonClick}
              clickedTimeButtonId={clickedTimeButtonId}
              filteredTimes={filteredTimes}
            />
            <ParticipantsPicker participantsValue={participantsValue} setParticipantsValue={setParticipantsValue} />
          </div>
        </div>

        <Button onClick={handleSelectButtonClick} isDisabled={!clickedTimeButtonId} color="green" type="modalSingle">
          선택하기
        </Button>
      </div>
    </ModalLayout>
  );
}

export default ReservationModal;
