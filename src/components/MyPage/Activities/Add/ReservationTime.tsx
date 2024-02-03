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
    selectedDate: string;
    startTimeItem: string;
    endTimeItem: string;
  };
  setIsDate: Dispatch<SetStateAction<IsDateTime[]>>;
}

function ReservationTime({ isDate, setIsDate }: ReservationTimeProps) {
  const [isSelectedDate, setIsSelectedDate] = useState('');
  const [startTime, setStartTime] = useState<DropdownItems>(INITIAL_DROPDOWN_ITEM);
  const [endTime, setEndTime] = useState<DropdownItems>(INITIAL_DROPDOWN_ITEM);

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
        (e) => `${e.selectedDate}+${e.startTimeItem}+${e.endTimeItem}` === `${isSelectedDate}+${startTime}+${endTime}`,
      ).length > 0
    ) {
      alert('동일한 시간이 있습니다.');
      return;
    }

    setIsDate((prev) => [
      ...prev,
      {
        selectedDate: isSelectedDate,
        startTimeItem: startTime,
        endTimeItem: endTime,
      },
    ]);
  };

  const handleDeleteButton = (item: string) => {
    setIsDate((prev) => prev.filter((e) => `${e.selectedDate}+${e.startTimeItem}+${e.endTimeItem}` !== item));
  };

  return (
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
              setDropdownItem={setStartTime}
              items={TIME_LIST}
              dropDownItem={startTime}
              placeholder="0:00"
            />
          </div>
          <p className={styles.dateWave}>~</p>
          <div className={styles.dateDropDown}>
            <Dropdown
              type="시간"
              setDropdownItem={setEndTime}
              items={TIME_LIST}
              dropDownItem={endTime}
              placeholder="0:00"
            />
          </div>
        </div>
        <button onClick={() => handleAddButton(isSelectedDate, startTime.title, endTime.title)}>
          <PlusButtonIcon className={styles.datePlusButton} alt="플러스 버튼" />
        </button>
      </div>
      <hr className={styles.dateHr} />
      <div className={styles.plusDateWrapper}>
        {isDate &&
          isDate.map((item, index) => {
            return (
              <div key={index}>
                <div className={styles.dateContent}>
                  <p className={styles.dateTime}>{dayjs(item.selectedDate).format('YY/MM/DD')}</p>
                  <div className={styles.dateDropDownWrapper}>
                    <div className={styles.addedTime}>{item.startTimeItem}</div>
                    <p className={styles.dateWave}>~</p>
                    <div className={styles.addedTime}>{item.endTimeItem}</div>
                  </div>
                  <button
                    onClick={() => handleDeleteButton(`${item.selectedDate}+${item.startTimeItem}+${item.endTimeItem}`)}
                  >
                    <MinusButtonIcon className={styles.datePlusButton} alt="마이너스 버튼" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ReservationTime;
