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
import { IsDateTime } from '@/pages/mypage/activities/add';
import ActivitiesForm from '@/components/MyPage/Activities/ActivitiesForm';

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

  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      title: items.title,
      price: items.price,
      address: items.address,
      description: items.description,
      category: items.category,
      images: {
        bannerImg: items.bannerImageUrl,
        subImgs: items.subImageUrls,
      },
      schedules: items.schedules,
    },
  });

  // const { handleSubmit, control, register, setValue } = methods;
  const handleOnSubmit = (data: FieldValues) => {
    // data.category = categoryItem.title;
    // data.schedules = isDate;
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

  return <ActivitiesForm methods={methods} handleOnSubmit={handleOnSubmit} latlng={latlng} />;
}

export default ActivityEdit;
ActivityEdit.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
