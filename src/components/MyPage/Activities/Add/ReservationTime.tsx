import DatePickerInput from '@/components/common/DatePicker/DatePicker';
import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import { INITIAL_DROPDOWN_ITEM, TIME_LIST } from '@/constants/dropdown';
import styles from '@/pages/mypage/activities/add/Add.module.css';
import PlusButtonIcon from '#/icons/icon-plusButton.svg';
import MinusButtonIcon from '#/icons/icon-minusButton.svg';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useState } from 'react';
import { IsDateTime } from '@/pages/mypage/activities/add';

interface ReservationTimeProps {
  isDate: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  setIsDate: Dispatch<SetStateAction<IsDateTime[]>>;
}

function ReservationTime({ isDate, setIsDate }: ReservationTimeProps) {
  const [isSelectedDate, setIsSelectedDate] = useState('');
  const [startTimeItem, setStartTimeItem] = useState<DropdownItems>(INITIAL_DROPDOWN_ITEM);
  const [endTimeItem, setEndTimeItem] = useState<DropdownItems>(INITIAL_DROPDOWN_ITEM);

  const handleAddButton = (isSelectedDate: string, startTime: string, endTime: string) => {
    if (!startTime || !endTime || !isSelectedDate) {
      alert('날짜, 시간을 선택해 주세요.');
      return;
    }
    if (startTime >= endTime) {
      alert('시간을 확인해 주세요.');
      return;
    }
    if (
      isDate.filter(
        (e) =>
          `${e.date}+${e.startTime}+${e.endTime}` === `${isSelectedDate}+${startTimeItem.title}+${endTimeItem.title}`,
      ).length > 0
    ) {
      alert('동일한 시간이 있습니다.');
      return;
    }

    setIsDate((prev) => [
      ...prev,
      {
        date: isSelectedDate,
        startTime: startTime,
        endTime: endTime,
      },
    ]);
  };

  const handleDeleteButton = (item: string) => {
    setIsDate((prev) => prev.filter((e) => `${e.date}+${e.startTime}+${e.endTime}` !== item));
  };

  return (
    <>
      <p className={styles.dateTitle}>예약 가능한 시간대</p>
      <div className={styles.dateWrapper}>
        <div className={styles.dateHeader}>
          <p className={styles.date}>날짜</p>
          <p className={styles.startTime}>시작 시간</p>
          <p>종료 시간</p>
        </div>
        <div className={styles.dateContent}>
          <DatePickerInput setIsSelectedDate={setIsSelectedDate} />
          <div className={styles.dateDropDownWrapper}>
            <div className={styles.dateDropDown}>
              <Dropdown
                type="시간"
                setDropdownItem={setStartTimeItem}
                items={TIME_LIST}
                dropDownItem={startTimeItem}
                placeholder="0:00"
              />
            </div>
            <p className={styles.dateWave}>~</p>
            <div className={styles.dateDropDown}>
              <Dropdown
                type="시간"
                setDropdownItem={setEndTimeItem}
                items={TIME_LIST}
                dropDownItem={endTimeItem}
                placeholder="0:00"
              />
            </div>
          </div>
          <button onClick={() => handleAddButton(isSelectedDate, startTimeItem.title, endTimeItem.title)}>
            <PlusButtonIcon className={styles.datePlusButton} alt="플러스 버튼" width={56} height={56} />
          </button>
        </div>
        <hr className={styles.dateHr} />
        <div className={styles.plusDateWrapper}>
          {isDate &&
            isDate.map((item, index) => {
              return (
                <div key={index}>
                  <div className={styles.dateContent}>
                    <p className={styles.dateTime}>{dayjs(item.date).format('YY/MM/DD')}</p>
                    <div className={styles.dateDropDownWrapper}>
                      <div className={styles.addedTime}>{item.startTime}</div>
                      <p className={styles.dateWave}>~</p>
                      <div className={styles.addedTime}>{item.endTime}</div>
                    </div>
                    <button onClick={() => handleDeleteButton(`${item.date}+${item.startTime}+${item.endTime}`)}>
                      <MinusButtonIcon className={styles.datePlusButton} alt="마이너스 버튼" width={56} height={56} />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ReservationTime;
