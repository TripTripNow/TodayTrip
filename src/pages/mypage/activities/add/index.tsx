import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';

import { FieldValues, useForm } from 'react-hook-form';
import ActivitiesForm from '@/components/MyPage/Activities/ActivitiesForm';
import { postActivities } from '@/api/activities/activities';
import { PostActivitiesReq } from '@/types/Activities';

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
      price: 0,
      address: '',
      category: '',
      description: '',
      bannerImageUrl: '',
      subImageUrls: [],
      schedules: [],
    },
  });

  const handleOnSubmit = (data: FieldValues) => {
    if (data) console.log(data);
    const ActivityData = postActivities(data as PostActivitiesReq);
    // console.log(ActivityData);
  };

  return <ActivitiesForm methods={methods} handleOnSubmit={handleOnSubmit} />;
}

export default ActivityAdd;
ActivityAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
