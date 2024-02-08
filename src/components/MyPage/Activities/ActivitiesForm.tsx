import { ChangeEvent, ReactElement, useState } from 'react';
import styles from '@/pages/mypage/activities/add/Add.module.css';
import Input from '@/components/Input/Input';
import { FieldValues, UseFormReturn, useForm } from 'react-hook-form';
import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import { CATEGORY_LIST, INITIAL_DROPDOWN_ITEM } from '@/constants/dropdown';
import MapContainer from '@/components/MyPage/Activities/Add/MapContainer';
import ReservationTime from '@/components/MyPage/Activities/Add/ReservationTime';
import ImageContainer from '@/components/MyPage/Activities/Add/ImageContainer';
import { priceFormat } from '@/utils/priceFormat';
import { IsDateTime } from '@/pages/mypage/activities/add';

interface ActivitiesFormProps {
  handleOnSubmit: (data: FieldValues) => void;
  methods: UseFormReturn<FieldValues>;
  latlng?: {
    lat: number;
    lng: number;
  } | null;
}

function ActivitiesForm({ handleOnSubmit, methods, latlng }: ActivitiesFormProps) {
  const [isDate, setIsDate] = useState<IsDateTime[]>([]);
  const [categoryItem, setCategoryItem] = useState<DropdownItems>(INITIAL_DROPDOWN_ITEM);

  const { handleSubmit, control, setValue, register, getValues } = methods;
  const category = getValues('category');

  //훅폼 이용 숫자(양수)만 입력되게 + number형으로
  control.register('price', {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const onlyNumber = value.replace(/[^0-9]/g, '');
      setValue('price', priceFormat(+onlyNumber));
    },
  });

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    //이벤트가 발생한 요소가 <textarea>외에서는 enter 막음
    if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.addContainer}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.formContainer} onKeyDown={handleFormKeyDown}>
        <div className={styles.addHeaderWrapper}>
          <p className={styles.addHeader}>내 체험 {latlng ? '수정' : '등록'}</p>
        </div>
        <Input name="title" control={control} placeholder="제목" type="text" />
        <Dropdown
          type="카테고리"
          setDropdownItem={setCategoryItem}
          items={CATEGORY_LIST}
          placeholder={category ? category : '카테고리'}
        />
        <textarea {...register('description')} className={styles.textarea} placeholder="설명" />

        <Input name="price" control={control} label="가격(원)" type="text" placeholder="가격(원)" />

        {/*지도 부분 컴포넌트*/}
        <div className={styles.addressContainer}>
          <p className={styles.addressTitle}>주소</p>
          <MapContainer control={control} name="address" latlng={latlng ? latlng : null} />
        </div>

        {/*예약 날짜 추가 제거 컴포넌트*/}
        <ReservationTime isDate={isDate} setIsDate={setIsDate} />

        {/*배너, 소개 이미지 추가 제거 컴포넌트*/}
        <ImageContainer control={control} name="images" />
        <div className={styles.addButtonWrapper}>
          <button className={styles.addButton}>등록하기</button>
        </div>
      </form>
    </div>
  );
}
export default ActivitiesForm;