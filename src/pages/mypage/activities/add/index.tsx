import { postActivities } from '@/api/activities';
import HeadMeta from '@/components/HeadMeta/HeadMeta';
import ActivitiesForm from '@/components/MyPage/Activities/ActivitiesForm';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { META_TAG } from '@/constants/metaTag';
import { PostActivitiesReq } from '@/types/activities';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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
      price: '',
      address: '',
      category: '',
      description: '',
      bannerImageUrl: '',
      schedules: [],

      subImageUrls: [],
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
    data.price = Number(data.price.replace(/,/g, ''));
    activityAddMutation.mutate(data as PostActivitiesReq);
  };

  return (
    <>
      <HeadMeta title={META_TAG.activitiesAdd['title']} description={META_TAG.activitiesAdd['description']} />
      <ActivitiesForm methods={methods} handleOnSubmit={handleOnSubmit} />
    </>
  );
}

export default ActivityAdd;
ActivityAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
