import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import styles from './ReservationModal.module.css';
import CloseIcon from '#/icons/icon-modalClose.svg';
import Calendar, { OnArgs, TileArgs } from 'react-calendar';
import Button from '@/components/common/Button/Button';
import style from '@/components/Activities/ReservationDateTimePicker/ReservationDateTimePicker.module.css';
import clsx from 'clsx';
import 'react-calendar/dist/Calendar.css';
import { Value } from '@/types/Calendar';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Time, TimeSlot } from '@/types/common/api';
import ParticipantsPicker from '@/components/Activities/ReservationDateTimePicker/ParticipantsPicker/ParticipantsPicker';
import AvailableSchedules from '@/components/Activities/ReservationDateTimePicker/AvailableSchedules/AvailableSchedules';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import { getAvailableSchedule } from '@/api/activities';
import dayjs from 'dayjs';

interface ReservationModalProps {
  activityId: number;
  handleModalToggle: () => void;
  selectedDateValue: Value;
  setSelectedDateValue: Dispatch<SetStateAction<Value>>;
  selectedTimeButtonId: number | null;
  setSelectedTimeButtonId: Dispatch<SetStateAction<number | null>>;
  participantsValue: number;
  setParticipantsValue: Dispatch<SetStateAction<number>>;
  handleTileDisabled: ({ date, view }: TileArgs, monthlyAvailableScheduleData: TimeSlot[] | undefined) => boolean;
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
  handleTileDisabled,
  handleDateButtonText,
}: ReservationModalProps) {
  const [clickedTimeButtonId, setClickedTimeButtonId] = useState(selectedTimeButtonId);
  const [clickedDateValue, setClickedDateValue] = useState<Value>(selectedDateValue);
  const [filteredTimes, setFilteredTimes] = useState<Time[]>();

  const handleSelectButtonClick = () => {
    handleModalToggle();
    setSelectedTimeButtonId(clickedTimeButtonId);
    handleDateButtonText(filteredTimes, clickedDateValue, clickedTimeButtonId);
    setSelectedDateValue(clickedDateValue);
  };

  const handleCalendarDateChangeInModal = (value: Value) => {
    setClickedDateValue(value);
    if (clickedTimeButtonId) {
      setClickedTimeButtonId(null);
    }
  };

  const handleCalendarMonthChangeInModal = ({ activeStartDate }: OnArgs) => {
    setClickedDateValue(activeStartDate);
    setClickedTimeButtonId(null);
  };

  const handleTimeButtonClick = (id: number | null) => {
    if (selectedTimeButtonId || clickedTimeButtonId) {
      setClickedTimeButtonId(null);
    }

    setClickedTimeButtonId(id);
  };

  const formattedDate = dayjs(clickedDateValue as Date).format('YYYY-MM-DD');
  const formattedYear = dayjs(clickedDateValue as Date).format('YYYY');
  const formattedMonth = dayjs(clickedDateValue as Date).format('MM');
  const currentTime = dayjs();

  const { data: monthlyAvailableScheduleData } = useQuery({
    queryKey: [QUERY_KEYS.activity, activityId, formattedYear, formattedMonth],
    queryFn: () => getAvailableSchedule({ activityId, year: formattedYear, month: formattedMonth }),
  });

  useEffect(() => {
    if (!clickedDateValue) {
      return;
    }
    if (!monthlyAvailableScheduleData) {
      return;
    }

    const availableDate = monthlyAvailableScheduleData.find((slot) => slot.date === formattedDate);

    const filteredTimes = availableDate?.times.filter((time) => {
      const startTime = time.startTime;

      /* 오늘 날짜의 경우 현재 시간이 시작 시간 이전인 것만 보여줘야함 
    만약 현재 시간이 시작 시간 이후라면 false를 리턴시켜 필터링 */
      return currentTime.isSame(formattedDate, 'date') ? currentTime.isBefore(dayjs(startTime, 'HH:mm')) : true;
    });

    setFilteredTimes(filteredTimes);
  }, [clickedDateValue, formattedDate, monthlyAvailableScheduleData]);

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
            value={clickedDateValue}
            minDate={new Date()}
            tileDisabled={({ date, view, activeStartDate }) =>
              handleTileDisabled({ date, view, activeStartDate }, monthlyAvailableScheduleData)
            }
            minDetail="year"
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
