import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';

import { FieldValues, useForm } from 'react-hook-form';
import ActivitiesForm from '@/components/MyPage/Activities/ActivitiesForm';
import { postActivities } from '@/api/activities/activities';
import { PostActivitiesReq } from '@/types/Activities';
import { useRouter } from 'next/router';

export interface IsDateTime {
  date: string;
  startTime: string;
  endTime: string;
}

function ActivityAdd() {
  const router = useRouter();
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      price: 0,
      address: '',
      category: '',
      description: '',
      bannerImageUrl: '',
      subImageUrls: [],
      schedules: [],
    },
  });

  const handleOnSubmit = async (data: FieldValues) => {
    data.price = Number(data.price.replace(/,/g, ''));
    try {
      const result = await postActivities(data as PostActivitiesReq);
      if (result === 201) {
        router.push('/mypage/activities');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <ActivitiesForm methods={methods} handleOnSubmit={handleOnSubmit} />;
}

export default ActivityAdd;
ActivityAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
