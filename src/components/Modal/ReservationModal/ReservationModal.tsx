import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import styles from './ReservationModal.module.css';
import CloseIcon from '#/icons/icon-modalClose.svg';
import Button from '@/components/common/Button/Button';
import style from '@/components/Activities/ReservationDateTimePicker/ReservationDateTimePicker.module.css';
import 'react-calendar/dist/Calendar.css';
import { Value } from '@/types/Calendar';
import { Dispatch, SetStateAction, useState } from 'react';
import { Time } from '@/types/common/api';
import ParticipantsPicker from '@/components/Activities/ReservationDateTimePicker/ParticipantsPicker/ParticipantsPicker';
import AvailableSchedules from '@/components/Activities/ReservationDateTimePicker/AvailableSchedules/AvailableSchedules';
import ReservationCalendar from '@/components/Activities/ReservationDateTimePicker/ReservationCalendar/ReservationCalendar';
import useFilteredTimes from '@/hooks/Activities/useAvailableScheduleFilter';

interface ReservationModalProps {
  activityId: number;
  handleModalToggle: () => void;
  selectedDateValue: Value;
  setSelectedDateValue: Dispatch<SetStateAction<Value>>;
  selectedTimeButtonId: number | null;
  setSelectedTimeButtonId: Dispatch<SetStateAction<number | null>>;
  participantsValue: number;
  setParticipantsValue: Dispatch<SetStateAction<number>>;
  handleDateButtonText: (
    filteredTimes: Time[] | undefined,
    date: Value,
    clickedPossibleTimeIdInModal: number | null,
  ) => void;
}

function ReservationModal({
  activityId,
  handleModalToggle,
  selectedDateValue,
  setSelectedDateValue,
  selectedTimeButtonId,
  setSelectedTimeButtonId,
  participantsValue,
  setParticipantsValue,
  handleDateButtonText,
}: ReservationModalProps) {
  const [clickedTimeButtonId, setClickedTimeButtonId] = useState(selectedTimeButtonId);
  const [clickedDateValue, setClickedDateValue] = useState<Value>(selectedDateValue);

  const handleSelectButtonClick = () => {
    handleModalToggle();
    setSelectedTimeButtonId(clickedTimeButtonId);
    handleDateButtonText(filteredTimes, clickedDateValue, clickedTimeButtonId);
    setSelectedDateValue(clickedDateValue);
  };

  const handleTimeButtonClick = (id: number | null) => {
    if (selectedTimeButtonId || clickedTimeButtonId) {
      setClickedTimeButtonId(null);
    }

    setClickedTimeButtonId(id);
  };

  const { filteredTimes, monthlyAvailableScheduleData } = useFilteredTimes({ dateValue: clickedDateValue, activityId });

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
          <ReservationCalendar
            dateValue={clickedDateValue}
            setDateValue={setClickedDateValue}
            timeButtonId={clickedTimeButtonId}
            setTimeButtonId={setClickedTimeButtonId}
            monthlyAvailableScheduleData={monthlyAvailableScheduleData}
          />

          <div className={style.possibleTime} style={{ display: 'flex' }}>
            <AvailableSchedules
              handleTimeButtonClick={handleTimeButtonClick}
              clickedTimeButtonId={clickedTimeButtonId}
              filteredTimes={filteredTimes}
            />

            <ParticipantsPicker
              isInModal={true}
              participantsValue={participantsValue}
              setParticipantsValue={setParticipantsValue}
            />
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
