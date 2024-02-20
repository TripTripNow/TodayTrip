import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import ActivitiesForm from '@/components/MyPage/Activities/ActivitiesForm';
import { postActivities } from '@/api/activities';
import { PostActivitiesReq } from '@/types/activities';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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
      subImageIdsToRemove: [],
      subImageUrlsToAdd: [],

      scheduleIdsToRemove: [],
      schedulesToAdd: [],
    },
  });

  const activityAddMutation = useMutation({
    mutationFn: (data: PostActivitiesReq) => postActivities(data),
    onSuccess: () => {
      router.push('/mypage/activities');
    },
    onError: (error) => {
      if (error instanceof AxiosError) toast(`${error.response?.data.message}`);
    },
  });

  const handleOnSubmit = async (data: FieldValues) => {
    delete data.subImageIdsToRemove;
    delete data.subImageUrlsToAdd;
    delete data.scheduleIdsToRemove;
    delete data.schedulesToAdd;
    if (data.price.toString() === '0') return toast('가격을 입력해 주세요.');
    if (data.schedules.length === 0) return toast('예약 가능한 시간대를 최소 1개 입력해주세요.');
    data.price = Number(data.price.replace(/,/g, ''));
    activityAddMutation.mutate(data as PostActivitiesReq);
  };

  return <ActivitiesForm methods={methods} handleOnSubmit={handleOnSubmit} />;
}

export default ActivityAdd;
ActivityAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
