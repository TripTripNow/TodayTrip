import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ChangeEvent, ReactElement, useState } from 'react';
import styles from './Add.module.css';
import Input from '@/components/Input/Input';
import { FieldValues, useForm } from 'react-hook-form';
import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import { CATEGORY_LIST, INITIAL_DROPDOWN_ITEM } from '@/constants/dropdown';
import MapContainer from '@/components/MyPage/Activities/Add/MapContainer';
import ReservationTime from '@/components/MyPage/Activities/Add/ReservationTime';
import ImageContainer from '@/components/MyPage/Activities/Add/ImageContainer';
import { priceFormat } from '@/utils/priceFormat';
import ActivitiesForm from '@/components/MyPage/Activities/ActivitiesForm';

export interface IsDateTime {
  date: string;
  startTime: string;
  endTime: string;
}

function ActivityAdd() {
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      price: '',
      address: '',
      description: '',
      images: {
        bannerImg: '',
        subImgs: [],
      },
    },
  });

  // const { handleSubmit, control, setValue, register } = methods;
  const handleOnSubmit = (data: FieldValues) => {
    // data.category = categoryItem.title;
    // data.schedules = isDate;
    if (data) console.log(data);
  };

  return (
    <>
      <ActivitiesForm methods={methods} handleOnSubmit={handleOnSubmit} />
    </>
  );
}

export default ActivityAdd;
ActivityAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
