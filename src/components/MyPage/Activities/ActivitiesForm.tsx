import styles from '@/pages/mypage/activities/add/Add.module.css';
import Input from '@/components/Input/Input';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import Dropdown from '@/components/common/DropDown/Dropdown';
import { CATEGORY_LIST } from '@/constants/dropdown';
import MapContainer from '@/components/MyPage/Activities/Add/MapContainer';
import ReservationTime from '@/components/MyPage/Activities/Add/ReservationTime';
import ImageContainer from '@/components/MyPage/Activities/Add/ImageContainer';
import useMyActivitiesForm from '@/hooks/Mypage/Activities/useMyActivitiesForm';
import { useState } from 'react';

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
  const {
    handleSubmit,
    handleFormKeyDown,
    control,
    setCategory,
    category,
    register,
    setValue,
    getValues,
    isActive,
    isValid,
  } = useMyActivitiesForm(methods);
  return (
    <div className={styles.addContainer}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.formContainer} onKeyDown={handleFormKeyDown}>
        <div className={styles.addHeaderWrapper}>
          <h1 className={styles.addHeader}>내 체험 {isEdit ? '수정' : '등록'}</h1>
        </div>
        <Input name="title" control={control} label="제목" placeholder="제목" type="text" />
        <label className={styles.inputLabel} htmlFor="dropdown">
          카테고리
        </label>
        <Dropdown
          id="dropdown"
          type="카테고리"
          setDropdownItem={setCategory}
          dropDownItems={CATEGORY_LIST}
          placeholder={category ? category : '카테고리'}
        />

        <label className={styles.inputLabel} htmlFor="description">
          설명
        </label>
        <textarea id="description" {...register('description')} className={styles.textarea} placeholder="설명" />

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
          <button className={styles.addButton} disabled={!isActive || !isValid}>
            {isEdit ? '수정하기' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
export default ActivitiesForm;
