import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import styles from '@/pages/mypage/activities/add/Add.module.css';
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

const ACTIVITY_ITEM = {
  title: '함께 배우면 즐거운 스트릿댄스',
  category: '투어',
  description: '둠칫 둠칫 두둠칫',
  address: '대한민국 서울특별시 양천구 목1동 오목교역',
  price: 10000,
  schedules: [
    {
      date: '2023-12-01',
      startTime: '12:00',
      endTime: '13:00',
    },
  ],
  bannerImageUrl: 'https://i.ibb.co/dWT3JmW/image.png',
  subImageUrls: ['https://i.ibb.co/dWT3JmW/image.png'],
};

interface ActivityEditProps {
  item: {
    title: string;
    category: string;
    description: string;
    address: string;
    price: 10000;
    schedules: [
      {
        date: string;
        startTime: string;
        endTime: string;
      },
    ];
    bannerImageUrl: string;
    subImageUrls: string[];
  };
}

function ActivityEdit({ item }: ActivityEditProps) {
  const [description, setDescription] = useState(ACTIVITY_ITEM ? ACTIVITY_ITEM.description : '');
  const [price, setPrice] = useState<number>(ACTIVITY_ITEM ? ACTIVITY_ITEM.price : 0);
  const [isDate, setIsDate] = useState<IsDateTime[]>(ACTIVITY_ITEM ? ACTIVITY_ITEM.schedules : []);
  const [categoryItem, setCategoryItem] = useState<DropdownItems>(INITIAL_DROPDOWN_ITEM);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | undefined>(
    ACTIVITY_ITEM ? ACTIVITY_ITEM.bannerImageUrl : undefined,
  );
  const [subImageUrls, setSubImageUrls] = useState<string[]>(ACTIVITY_ITEM ? ACTIVITY_ITEM.subImageUrls : []);
  const [addressData, setAddressData] = useState<string | undefined>(
    ACTIVITY_ITEM ? ACTIVITY_ITEM.address : '주소를 입력해주세요',
  );

  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      title: ACTIVITY_ITEM ? ACTIVITY_ITEM.title : '',
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
    data.category = categoryItem;
    data.description = description;
    data.address = addressData;
    data.price = price;
    data.schedules = isDate;
    data.bannerImageUrl = bannerImageUrl;
    data.subImageUrls = subImageUrls;
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
          <MapContainer setAddressData={setAddressData} address={ACTIVITY_ITEM.address} />
        </div>

        {/*예약 날짜 추가 제거 컴포넌트*/}
        <ReservationTime isDate={isDate} setIsDate={setIsDate} />

        {/*배너, 소개 이미지 추가 제거 컴포넌트*/}
        <ImageContainer
          bannerImgSrc={bannerImageUrl}
          setBannerImgSrc={setBannerImageUrl}
          imgSrc={subImageUrls}
          setImgSrc={setSubImageUrls}
        />
      </form>
    </div>
  );
}

export default ActivityEdit;
ActivityEdit.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
