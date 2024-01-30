import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement, useState } from 'react';
import styles from './Add.module.css';
import Input from '@/components/Input/Input';
import { FieldValues, useForm } from 'react-hook-form';
import DatePickerInput from '@/components/common/DatePicker/DatePicker';
import PlusButtonIcon from '#/icons/icon-plusButton.svg';
import MinusButtonIcon from '#/icons/icon-minusButton.svg';
import PlusIcon from '#/icons/icon-plus.svg';
import dayjs from 'dayjs';

function ActivitiesAdd() {
  const [isDate, setIsDate] = useState<string[]>([]);
  const [isSelectedDate, setIsSelectedDate] = useState<string>('');
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      nickName: '',
      email: '',
    },
  });

  const { handleSubmit, control } = methods;

  const handleOnSubmit = () => {};

  const handleAddButton = (isSelectedDate: string) => {
    setIsDate((prev) => [...prev, isSelectedDate]);
  };

  const handleDeleteButton = (item: string) => {
    setIsDate((prev) => prev.filter((e) => e !== item));
  };

  // console.log(dayjs(isDate[0]).format('YY/MM/DD'));
  return (
    <div className={styles.addContainer}>
      <div className={styles.addHeaderWrapper}>
        <p className={styles.addHeader}>내 체험 등록</p>
        <button className={styles.addHeaderButton}>등록하기</button>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.formContainer}>
        <Input name="title" control={control} placeholder="제목" type="text" />
        <Input name="category" control={control} placeholder="카테고리" type="text" />
        <Input name="description" control={control} placeholder="설명" type="text" />
        <Input name="address" control={control} label="주소" placeholder="주소를 입력해주세요" type="text" />
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
              <div className={styles.dateDropDown}>드롭다운1</div>
              <p className={styles.dateWave}>~</p>
              <div className={styles.dateDropDown}>드롭다운2</div>
            </div>
            <button>
              <PlusButtonIcon
                className={styles.datePlusButton}
                onClick={() => handleAddButton(isSelectedDate)}
                alt="플러스 버튼"
              />
            </button>
          </div>
          <hr className={styles.dateHr} />
          <div className={styles.plusDateWrapper}>
            {isDate &&
              isDate.map((item, index) => {
                return (
                  <div key={index}>
                    <div className={styles.dateContent}>
                      <p className={styles.dateTime}>{dayjs(item).format('YY/MM/DD')}</p>
                      <div className={styles.dateDropDownWrapper}>
                        <div className={styles.dateDropDown}>드롭다운1</div>
                        <p className={styles.dateWave}>~</p>
                        <div className={styles.dateDropDown}>드롭다운2</div>
                      </div>
                      <button onClick={() => handleDeleteButton(item)}>
                        <MinusButtonIcon className={styles.datePlusButton} alt="마이너스 버튼" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles.cotentTitleWrapper}>
          <p className={styles.contentTitle}>배너 이미지</p>
          <p className={styles.warningMessage}>*이미지는 최대 1개까지 등록 가능합니다.</p>
        </div>
        <button className={styles.addImgButton}>
          <div className={styles.addImgWrapper}>
            <PlusIcon alt="플러스 이미지" />
            <div>이미지 등록</div>
          </div>
        </button>
        <div className={styles.cotentTitleWrapper}>
          <p className={styles.contentTitle}>소개 이미지</p>
          <p className={styles.warningMessage}>*이미지는 최대 4개까지 등록 가능합니다.</p>
        </div>
        <button className={styles.addImgButton}>
          <div className={styles.addImgWrapper}>
            <PlusIcon alt="플러스 이미지" />
            <div>이미지 등록</div>
          </div>
        </button>
      </form>
    </div>
  );
}

export default ActivitiesAdd;
ActivitiesAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
