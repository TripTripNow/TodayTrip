import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';
import styles from './Add.module.css';
import Input from '@/components/Input/Input';
import { FieldValues, useForm } from 'react-hook-form';
import DatePickerInput from '@/components/common/DatePicker/DatePicker';

function ActivitiesAdd() {
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
        <p>예약 가능한 시간대</p>
        <div className={styles.dateWrapper}>
          <DatePickerInput />
          <div className={styles.dateDropDownWrapper}>
            <div>드롭다운1</div>
            <div>드롭다운2</div>
          </div>
          <button>+</button>
        </div>
      </form>
    </div>
  );
}

export default ActivitiesAdd;
ActivitiesAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
