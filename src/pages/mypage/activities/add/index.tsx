import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';

import { FieldValues, useForm } from 'react-hook-form';
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
      category: '',
      description: '',
      images: {
        bannerImg: '',
        subImgs: [],
      },
      schedules: [],
    },
  });

  const handleOnSubmit = (data: FieldValues) => {
    if (data) console.log(data);
  };

  return <ActivitiesForm methods={methods} handleOnSubmit={handleOnSubmit} />;
}

export default ActivityAdd;
ActivityAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
