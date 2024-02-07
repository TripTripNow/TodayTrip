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
import { useRouter } from 'next/router';

export interface IsDateTime {
  date: string;
  startTime: string;
  endTime: string;
}

const ACTIVITY_ITEM = {
  title: '함께 배우면 즐거운 스트릿댄스',
  category: '투어',
  description: '둠칫 둠칫 두둠칫',
  address: '대한민국 서울특별시 중구 을지로 위워크',
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

function ActivityEdit() {
  const [items, setItems] = useState(ACTIVITY_ITEM);
  const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(null);
  const [isDate, setIsDate] = useState<IsDateTime[]>(items ? items.schedules : []);
  const [categoryItem, setCategoryItem] = useState<DropdownItems>(
    items ? { id: 1, title: items.category } : INITIAL_DROPDOWN_ITEM,
  );
  const router = useRouter();
  const id = router.query.id;

  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      title: items.title,
      price: items.price,
      address: items.address,
      images: {
        bannerImg: items.bannerImageUrl,
        subImgs: items.subImageUrls,
      },
    },
  });

  const { handleSubmit, control, register, setValue } = methods;

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    //이벤트가 발생한 요소가 <textarea>외에서는 enter 막음
    if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
    }
  };

  control.register('price', {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const onlyNumber = value.replace(/[^0-9]/g, '');
      setValue('price', priceFormat(+onlyNumber));
    },
  });

  const handleOnSubmit = (data: FieldValues) => {
    data.category = categoryItem.title;
    data.schedules = isDate;
    if (data) console.log(data);
  };

  const calculateLatlng = async (addressData: string) => {
    if (addressData) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressData)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}`,
      );

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const newLatlng = { lat: location.lat, lng: location.lng };
        setLatlng(newLatlng);
      }
    }
  };

  //처음 불러올때 받은 주소 -> 위도 경도로 바꿔줌
  useEffect(() => {
    calculateLatlng(items.address);
  }, []);

  return (
    <div className={styles.addContainer}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.formContainer} onKeyDown={handleFormKeyDown}>
        <div className={styles.addHeaderWrapper}>
          <p className={styles.addHeader}>내 체험 등록</p>
        </div>

        <Input name="title" control={control} placeholder="제목" type="text" />

        <Dropdown type="카테고리" setDropdownItem={setCategoryItem} items={CATEGORY_LIST} dropDownItem={categoryItem} />

        <textarea {...register('description')} className={styles.textarea} placeholder="설명" />

        <Input name="price" control={control} label="가격(원)" type="text" placeholder="가격(원)" />

        {/*지도 부분 컴포넌트*/}
        <div className={styles.addressContainer}>
          <p className={styles.addressTitle}>주소</p>
          <MapContainer latlng={latlng} control={control} name="address" />
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

export default ActivityEdit;
ActivityEdit.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
