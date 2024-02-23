import styles from './ReservationDateTimePicker.module.css';
import style from '@/pages/activities/[id]/Activity.module.css';
import Button from '@/components/common/Button/Button';
import dayjs from 'dayjs';
import Calendar, { OnArgs, TileArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import ReservationModal from '@/components/Modal/ReservationModal/ReservationModal';
import { Activity, Time } from '@/types/common/api';
import { Value } from '@/types/Calendar';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import QUERY_KEYS from '@/constants/queryKeys';
import { getAvailableSchedule, postReservation } from '@/api/activities';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useRouter } from 'next/router';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import { useSession } from 'next-auth/react';
import { priceFormat } from '@/utils/priceFormat';
import ParticipantsPicker from '@/components/Activities/ReservationDateTimePicker/ParticipantsPicker/ParticipantsPicker';

dayjs.extend(customParseFormat);
interface ReservationDateTimePickerProps {
  data: Activity;
}
function ReservationDateTimePicker({ data }: ReservationDateTimePickerProps) {
  // 캘린더
  const [dateValue, setDateValue] = useState<Value>(new Date());
  const [filteredTimes, setFilteredTimes] = useState<Time[]>();

  // 초기엔 날짜 선택하기 => 선택한 이후에는 선택한 값으로 보이게 하는 state
  const [dateButtonText, setDateButtonText] = useState('날짜 선택하기');

  // 날짜 및 시간 선택하는 모달
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  // 예약 가능한 시간을 선택한 경우, 선택한 버튼만 초록색이 되게 만들기 위한 state
  const [clickedTimeButtonId, setClickedTimeButtonId] = useState<number | null>(null);

  const selectedYear = dayjs(dateValue as Date).format('YYYY');
  const selectedMonth = dayjs(dateValue as Date).format('MM');

  const { data: monthlyAvailableScheduleData } = useQuery({
    queryKey: [QUERY_KEYS.activity, data.id, selectedYear, selectedMonth],
    queryFn: () => getAvailableSchedule({ activityId: data.id, year: selectedYear, month: selectedMonth }),
  });

  const router = useRouter();
  const userData = useSession();

  useEffect(() => {
    if (!dateValue) {
      return;
    }
    if (!monthlyAvailableScheduleData) {
      return;
    }

    const formattedValue = dayjs(dateValue as Date).format('YYYY-MM-DD');
    const todayAvailableScheduleData = monthlyAvailableScheduleData.find((slot) => slot.date === formattedValue);

    const currentTime = dayjs();

    const filteredTimes = todayAvailableScheduleData?.times.filter((time) => {
      const startTime = time.startTime;

      /* 오늘 날짜의 경우 현재 시간이 시작 시간 이전인 것만 보여줘야함 
    만약 현재 시간이 시작 시간 이후라면 false를 리턴시켜 필터링*/

      return dayjs().isSame(formattedValue, 'date') ? currentTime.isBefore(dayjs(startTime, 'HH:mm')) : true;
    });

    setFilteredTimes(filteredTimes);

    // setTileDisabled(true);
  }, [dateValue, monthlyAvailableScheduleData]);

  const handleDateButtonText = (clickedTimeButtonId: number | null) => {
    setDateButtonText(`
    ${dayjs(dateValue as Date).format('YYYY/MM/DD')}
    ${filteredTimes?.find((e) => e.id === clickedTimeButtonId)?.startTime} ~
    ${filteredTimes?.find((e) => e.id === clickedTimeButtonId)?.endTime}`);
  };

  const handleTimeButtonClick = (id: number | null) => {
    setClickedTimeButtonId(id);
  };

  useEffect(() => {
    if (clickedTimeButtonId) {
      handleDateButtonText(clickedTimeButtonId);
    }
  }, [clickedTimeButtonId]);

  const handleCalendarDateChange = (value: Value) => {
    setDateValue(value);
    if (clickedTimeButtonId) {
      setClickedTimeButtonId(null);
    }
  };

  const handleResetFilteredData = () => {
    setClickedTimeButtonId(null);
    setFilteredTimes([]);
    setDateValue(null);
  };

  const handleOnActiveStartDateChange = ({ activeStartDate }: OnArgs) => {
    setClickedTimeButtonId(null);
    setDateValue(activeStartDate);
  };

  const handleTileDisabled = ({ date }: TileArgs) => {
    // monthlyAvailableScheduleData 배열에서 해당 날짜와 동일한 날짜를 가진 객체가 있는지 확인
    const isDateAvailable = monthlyAvailableScheduleData?.some(
      (item) => item.date === dayjs(date).format('YYYY-MM-DD'),
    );
    // 해당 날짜가 존재하지 않으면 disabled
    return !isDateAvailable;
  };

  // 참여 인원수 인풋과 연결될 value State
  const [participantsValue, setParticipantsValue] = useState(1);

  const handleReserveModalToggle = () => {
    setIsReserveModalOpen((prev) => !prev);
  };

  const [isAlertReserveModalOpen, setIsAlertReserveModalOpen] = useState(false);

  const handleAlertModalToggle = () => {
    setIsAlertReserveModalOpen((prev) => !prev);
  };

  const reserveMutation = useMutation({
    mutationFn: () =>
      postReservation({ activityId: data.id, scheduleId: Number(clickedTimeButtonId), headCount: participantsValue }),
    onSuccess: () => {
      toast.success('예약이 완료되었습니다.');
      router.push('/mypage/reservations');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
    onSettled: () => {
      handleResetFilteredData();
      setParticipantsValue(1);
      setDateButtonText('날짜 선택하기');
    },
  });

  const handleReserveButtonClick = () => {
    if (userData.status === 'unauthenticated') {
      setIsAlertReserveModalOpen(true);
      return;
    }
    reserveMutation.mutate();
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
          {/* <ReservationCalendar dateValue={dateValue} setDateValue={setDateValue} /> */}
          <Calendar
            prev2Label={null}
            next2Label={null}
            calendarType="gregory"
            locale="en"
            onChange={handleCalendarDateChange}
            className={styles.customCalendar}
            onActiveStartDateChange={handleOnActiveStartDateChange}
            value={dateValue}
            tileDisabled={handleTileDisabled}
            minDate={new Date()}
          />
        </div>
        <div className={styles.possibleTime}>
          <h2 className={style.label}>예약 가능한 시간</h2>

          <div className={styles.timeButtonContainer}>
            {filteredTimes?.map((time) => (
              <Button
                key={time.id}
                type="time"
                color={time.id === clickedTimeButtonId ? 'green' : 'white'}
                onClick={() => {
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
        </div>
        <hr className={style.hr} />
        <ParticipantsPicker participantsValue={participantsValue} setParticipantsValue={setParticipantsValue} />
        <Button
          onClick={handleReserveButtonClick}
          isDisabled={!clickedTimeButtonId || participantsValue === 0}
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
          disabled={!clickedTimeButtonId || participantsValue === 0}
        >
          예약하기
        </button>
      </div>

      {isReserveModalOpen && (
        <ReservationModal
          handleDateButtonText={handleDateButtonText}
          filteredTimes={filteredTimes}
          handleModalToggle={handleReserveModalToggle}
          dateValue={dateValue}
          setDateValue={setDateValue}
          handleTimeButtonClick={handleTimeButtonClick}
          participantsValue={participantsValue}
          setParticipantsValue={setParticipantsValue}
          handleOnActiveStartDateChange={handleOnActiveStartDateChange}
          clickedTimeButtonId={clickedTimeButtonId}
          handleTileDisabled={handleTileDisabled}
        />
      )}
      {isAlertReserveModalOpen && (
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
