import styles from './ReservationDateTimePicker.module.css';
import style from '@/pages/activities/[id]/Activity.module.css';
import Button from '@/components/common/Button/Button';
import dayjs from 'dayjs';
import { useState } from 'react';
import ReservationModal from '@/components/Modal/ReservationModal/ReservationModal';
import { Activity, Time } from '@/types/common/api';
import { Value } from '@/types/Calendar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import QUERY_KEYS from '@/constants/queryKeys';
import { postReservation } from '@/api/activities';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useRouter } from 'next/router';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import { useSession } from 'next-auth/react';
import { priceFormat } from '@/utils/priceFormat';
import ParticipantsPicker from '@/components/Activities/ReservationDateTimePicker/ParticipantsPicker/ParticipantsPicker';
import AvailableSchedules from '@/components/Activities/ReservationDateTimePicker/AvailableSchedules/AvailableSchedules';
import ReservationCalendar from '@/components/Activities/ReservationDateTimePicker/ReservationCalendar/ReservationCalendar';
import useAvailableScheduleFilter from '@/hooks/Activities/useAvailableScheduleFilter';
dayjs.extend(customParseFormat);

interface ReservationDateTimePickerProps {
  data: Activity;
}
function ReservationDateTimePicker({ data }: ReservationDateTimePickerProps) {
  // 선택된 날짜
  const [selectedDateValue, setSelectedDateValue] = useState<Value>(new Date());
  // 선택된 시간
  const [selectedTimeButtonId, setSelectedTimeButtonId] = useState<number | null>(null);

  // 날짜 선택하기 버튼 이름 : 초기엔 날짜 선택하기 => 선택한 이후에는 선택한 값으로 보이게 하는 state
  const [dateButtonText, setDateButtonText] = useState('날짜 선택하기');

  // 날짜 및 시간 선택하는 모달
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  // 참여 인원수 인풋과 연결될 value State
  const [participantsValue, setParticipantsValue] = useState(1);

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const handleReserveModalToggle = () => {
    setIsReserveModalOpen((prev) => !prev);
  };

  const handleAlertModalToggle = () => {
    setIsAlertModalOpen((prev) => !prev);
  };

  const router = useRouter();
  const userData = useSession();

  const { filteredTimes, setFilteredTimes, monthlyAvailableScheduleData } = useAvailableScheduleFilter({
    dateValue: selectedDateValue,
    activityId: data.id,
  });

  const handleDateButtonText = (filteredTimes: Time[] | undefined, date: Value, clickedTimeButtonId: number | null) => {
    setDateButtonText(`
    ${dayjs(date as Date).format('YYYY/MM/DD')}
    ${filteredTimes?.find((e) => e.id === clickedTimeButtonId)?.startTime} ~
    ${filteredTimes?.find((e) => e.id === clickedTimeButtonId)?.endTime}`);
  };

  const handleResetDateButtonText = () => {
    setDateButtonText('날짜 선택하기');
  };

  const handleResetFilteredData = () => {
    setSelectedTimeButtonId(null);
    setFilteredTimes([]);
    setSelectedDateValue(null);
  };

  const queryClient = useQueryClient();
  // 예약하기 mutation
  const reserveMutation = useMutation({
    mutationFn: () =>
      postReservation({ activityId: data.id, scheduleId: Number(selectedTimeButtonId), headCount: participantsValue }),
    onSuccess: () => {
      toast.success('예약이 완료되었습니다.');
      router.push('/mypage/reservations');
      handleResetFilteredData();
      setParticipantsValue(1);
      setDateButtonText('날짜 선택하기');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.reservations, QUERY_KEYS.all] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  // 예약하기 버튼 클릭 시
  const handleReserveButtonClick = () => {
    if (userData.status === 'unauthenticated') {
      setIsAlertModalOpen(true);
      return;
    }
    reserveMutation.mutate();
  };

  const handleTimeButtonClick = (id: number | null) => {
    if (selectedTimeButtonId === id) {
      setSelectedTimeButtonId(null);
      return;
    }
    setSelectedTimeButtonId(id);
    handleDateButtonText(filteredTimes, selectedDateValue, id);
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.priceInPerson}>
          ￦{priceFormat(data.price)}
          <span className={styles.span}>/ 인</span>
        </p>
        <hr className={style.hr} />
        <div className={styles.calendar}>
          <h2 className={style.label}>날짜</h2>
          <button className={styles.selectButton} onClick={handleReserveModalToggle}>
            {dateButtonText}
          </button>
          <ReservationCalendar
            dateValue={selectedDateValue}
            setDateValue={setSelectedDateValue}
            timeButtonId={selectedTimeButtonId}
            setTimeButtonId={setSelectedTimeButtonId}
            monthlyAvailableScheduleData={monthlyAvailableScheduleData}
            handleResetDateButtonText={handleResetDateButtonText}
            usage="outer"
          />
        </div>

        <div className={styles.possibleTime}>
          <AvailableSchedules
            handleTimeButtonClick={handleTimeButtonClick}
            clickedTimeButtonId={selectedTimeButtonId}
            filteredTimes={filteredTimes}
          />
        </div>
        <hr className={style.hr} />
        <ParticipantsPicker participantsValue={participantsValue} setParticipantsValue={setParticipantsValue} />
        <Button
          onClick={handleReserveButtonClick}
          isDisabled={!selectedTimeButtonId || participantsValue <= 0}
          color="green"
          type="modalSingle"
        >
          예약하기
        </Button>
        <hr className={style.hr} style={{ marginTop: '0.8rem' }} />
        <div>
          <div className={styles.totalPrice}>
            <h2 className={style.label}>총 합계</h2>
            <p className={style.label}>￦{priceFormat(data.price * participantsValue)}</p>
          </div>
        </div>
      </div>

      {/* 모바일에서만 보이는 selectbar */}
      <div className={styles.mobileSelectBar}>
        <div>
          <p className={styles.pricePerPersonWrapper}>
            ￦{priceFormat(data.price * participantsValue)} / {participantsValue}인
          </p>
          <button className={styles.mobileSelectButton} onClick={handleReserveModalToggle}>
            {dateButtonText}
          </button>
        </div>
        <button
          onClick={handleReserveButtonClick}
          className={styles.mobileReserveButton}
          disabled={!selectedTimeButtonId || participantsValue === 0}
        >
          예약하기
        </button>
      </div>

      {isReserveModalOpen && (
        <ReservationModal
          activityId={data.id}
          handleModalToggle={handleReserveModalToggle}
          selectedDateValue={selectedDateValue}
          setSelectedDateValue={setSelectedDateValue}
          selectedTimeButtonId={selectedTimeButtonId}
          setSelectedTimeButtonId={setSelectedTimeButtonId}
          participantsValue={participantsValue}
          setParticipantsValue={setParticipantsValue}
          handleDateButtonText={handleDateButtonText}
        />
      )}
      {isAlertModalOpen && (
        <AlertModal
          text={'로그인 하시겠습니까?'}
          handleModalClose={handleAlertModalToggle}
          buttonText="로그인"
          handleActionButtonClick={() => router.push('/signin')}
        />
      )}
    </>
  );
}

export default ReservationDateTimePicker;
