import { postActivities } from '@/api/activities';
import { PostActivitiesReq } from '@/types/activities';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm, FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';

function useMyActivitiesAdd() {
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
      toast('체험 등록 완료되었습니다.');
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

  return { methods, handleOnSubmit };
}

export default useMyActivitiesAdd;
