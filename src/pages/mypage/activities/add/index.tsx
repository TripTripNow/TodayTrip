import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ChangeEvent, ReactElement, useState } from 'react';
import styles from './Add.module.css';
import Input from '@/components/Input/Input';
import { FieldValues, useForm } from 'react-hook-form';
import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import { CATEGORY_LIST, INITIAL_DROPDOWN_ITEM } from '@/constants/dropdown';
import MapContainer from '@/components/MyPage/Activities/Add/MapContainer';
import { priceFormat } from '@/utils/priceFormat';
import ReservationTime from '@/components/MyPage/Activities/Add/ReservationTime';
import ImageContainer from '@/components/MyPage/Activities/Add/ImageContainer';

export interface IsDateTime {
  date: string;
  startTime: string;
  endTime: string;
}

function ActivitiesAdd() {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>();
  const [isDate, setIsDate] = useState<IsDateTime[]>([]);
  const [categoryItem, setCategoryItem] = useState<DropdownItems>(INITIAL_DROPDOWN_ITEM);
  const [bannerImgSrc, setBannerImgSrc] = useState<string[]>([]);
  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [addressData, setAddressData] = useState<string | undefined>('주소를 입력해주세요');

  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
    },
  });

  const { handleSubmit, control } = methods;

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setPrice(+onlyNumber);
  };

  const handleOnSubmit = (data: FieldValues) => {
    data.category = categoryItem.title;
    data.description = description;
    data.address = addressData;
    data.price = price;
    data.schedules = isDate;
    if (data) console.log(data);
  };

  return (
    <div className={styles.addContainer}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.formContainer}>
        <div className={styles.addHeaderWrapper}>
          <p className={styles.addHeader}>내 체험 등록</p>
          <button className={styles.addHeaderButton}>등록하기</button>
        </div>
        <Input name="title" control={control} placeholder="제목" type="text" activities={true} />
        <Dropdown
          type="카테고리"
          setDropdownItem={setCategoryItem}
          items={CATEGORY_LIST}
          dropDownItem={categoryItem}
          placeholder={'카테고리'}
        />
        <textarea value={description} onChange={handleTextAreaChange} className={styles.textarea} placeholder="설명" />
        <label className={styles.priceWrapper}>가격</label>
        <input
          value={price !== undefined ? priceFormat(price) : ''}
          type="text"
          className={styles.priceInput}
          onChange={handlePriceChange}
          placeholder="가격"
        />

        {/*지도 부분 컴포넌트*/}
        <div className={styles.addressContainer}>
          <p className={styles.addressTitle}>주소</p>
          <MapContainer setAddressData={setAddressData} />
        </div>

        {/*예약 날짜 추가 제거 컴포넌트*/}
        <ReservationTime isDate={isDate} setIsDate={setIsDate} />

        {/*배너, 소개 이미지 추가 제거 컴포넌트*/}
        <ImageContainer
          bannerImgSrc={bannerImgSrc}
          setBannerImgSrc={setBannerImgSrc}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
        />
      </form>
    </div>
  );
}

export default ActivitiesAdd;
ActivitiesAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
