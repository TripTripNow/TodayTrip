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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import AvailableSchedules from '@/components/Activities/ReservationDateTimePicker/AvailableSchedules/AvailableSchedules';
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

  const formattedDate = dayjs(dateValue as Date).format('YYYY-MM-DD');
  const formattedYear = dayjs(dateValue as Date).format('YYYY');
  const formattedMonth = dayjs(dateValue as Date).format('MM');
  const currentTime = dayjs();

  const { data: monthlyAvailableScheduleData } = useQuery({
    queryKey: [QUERY_KEYS.activity, data.id, formattedYear, formattedMonth],
    queryFn: () => getAvailableSchedule({ activityId: data.id, year: formattedYear, month: formattedMonth }),
  });

  useEffect(() => {
    if (!dateValue) {
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
  }, [dateValue, formattedDate, monthlyAvailableScheduleData]);

  const handleTileDisabled = ({ date, view }: TileArgs) => {
    if (view === 'year') {
      return false; // 연도 뷰에서는 비활성화하지 않음
    }

    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const availableDate = monthlyAvailableScheduleData?.find((item) => item.date === formattedDate);

    if (!availableDate) {
      return true; // 해당 날짜에 사용 가능한 일정이 없으면 비활성화
    }

    // 오늘이지만, 이미 시간이 지나버린 데이터만 존재한다면 거르기
    let filteredTimes;
    if (currentTime.isSame(date, 'date')) {
      filteredTimes = availableDate.times.filter((time) => {
        const startTime = time.startTime;
        return currentTime.isBefore(dayjs(startTime, 'HH:mm'));
      });
    } else {
      filteredTimes = availableDate.times;
    }

    return filteredTimes.length === 0;
  };

  const handleDateButtonText = (clickedTimeButtonId: number | null) => {
    setDateButtonText(`
    ${dayjs(dateValue as Date).format('YYYY/MM/DD')}
    ${filteredTimes?.find((e) => e.id === clickedTimeButtonId)?.startTime} ~
    ${filteredTimes?.find((e) => e.id === clickedTimeButtonId)?.endTime}`);
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

  // 예약하기 mutation
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

  // 예약하기 버튼 클릭 시
  const handleReserveButtonClick = () => {
    if (userData.status === 'unauthenticated') {
      setIsAlertModalOpen(true);
      return;
    }
    reserveMutation.mutate();
  };

  const handleTimeButtonClick = (id: number | null) => {
    if (clickedTimeButtonId === id) {
      setClickedTimeButtonId(null);
      return;
    }
    setClickedTimeButtonId(id);
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
            minDetail="year"
          />
        </div>

        <div className={styles.possibleTime}>
          <AvailableSchedules
            handleTimeButtonClick={handleTimeButtonClick}
            clickedTimeButtonId={clickedTimeButtonId}
            filteredTimes={filteredTimes}
          />
        </div>
        <hr className={style.hr} />
        <ParticipantsPicker participantsValue={participantsValue} setParticipantsValue={setParticipantsValue} />
        <Button
          onClick={handleReserveButtonClick}
          isDisabled={!clickedTimeButtonId || participantsValue <= 0}
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
          disabled={!clickedTimeButtonId || participantsValue === 0}
        >
          예약하기
        </button>
      </div>

      {isReserveModalOpen && (
        <ReservationModal
          handleDateButtonText={handleDateButtonText}
          clickedTimeButtonId={clickedTimeButtonId}
          setClickedTimeButtonId={setClickedTimeButtonId}
          filteredTimes={filteredTimes}
          handleModalToggle={handleReserveModalToggle}
          dateValue={dateValue}
          participantsValue={participantsValue}
          setParticipantsValue={setParticipantsValue}
          handleTileDisabled={handleTileDisabled}
          setDateValue={setDateValue}
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
