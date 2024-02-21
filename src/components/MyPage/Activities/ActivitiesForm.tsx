import { ChangeEvent, useEffect, useState } from 'react';
import styles from '@/pages/mypage/activities/add/Add.module.css';
import Input from '@/components/Input/Input';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import Dropdown from '@/components/common/DropDown/Dropdown';
import { CATEGORY_LIST } from '@/constants/dropdown';
import MapContainer from '@/components/MyPage/Activities/Add/MapContainer';
import ReservationTime from '@/components/MyPage/Activities/Add/ReservationTime';
import ImageContainer from '@/components/MyPage/Activities/Add/ImageContainer';
import { priceFormat } from '@/utils/priceFormat';

interface ActivitiesFormProps {
  handleOnSubmit: (data: FieldValues) => void;
  methods: UseFormReturn<FieldValues>;
  latlng?: {
    lat: number;
    lng: number;
  } | null;
  isEdit?: boolean;
}

function ActivitiesForm({ handleOnSubmit, methods, latlng, isEdit }: ActivitiesFormProps) {
  const { handleSubmit, control, setValue, register, getValues } = methods;
  const [category, setCategory] = useState(getValues('category'));

  const [isActive, setIsActive] = useState(false);

  const watchAll = Object.values(methods.watch());

  useEffect(() => {
    if (watchAll.slice(0, 7).every((el) => el.length > 0 && el !== '0')) {
      setIsActive(true);
      return;
    }
    setIsActive(false);
  }, [watchAll]);

  //훅폼 이용 숫자(양수)만 입력되게 + number형으로
  control.register('price', {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const onlyNumber = value.replace(/[^0-9]/g, '');
      setValue('price', priceFormat(+onlyNumber));
    },
  });

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    //이벤트가 발생한 요소가 textarea, dropDown외에서는 enter 막음
    if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement) && !(e.target instanceof Dropdown)) {
      e.preventDefault();
    }
  };
  useEffect(() => {
    if (category) setValue('category', category.title ? category.title : category);
  }, [category]);

  return (
    <div className={styles.addContainer}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.formContainer} onKeyDown={handleFormKeyDown}>
        <div className={styles.addHeaderWrapper}>
          <p className={styles.addHeader}>내 체험 {isEdit ? '수정' : '등록'}</p>
        </div>
        <Input name="title" control={control} placeholder="제목" type="text" />
        <Dropdown
          type="카테고리"
          setDropdownItem={setCategory}
          dropDownItems={CATEGORY_LIST}
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
        <ReservationTime name="schedules" control={control} setValue={setValue} getValues={getValues} />

        {/*배너, 소개 이미지 추가 제거 컴포넌트*/}
        <ImageContainer control={control} name="subImageUrls" setValue={setValue} getValues={getValues} />
        <div className={styles.addButtonWrapper}>
          <button className={styles.addButton} disabled={!isActive}>
            {isEdit ? '수정하기' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
export default ActivitiesForm;
