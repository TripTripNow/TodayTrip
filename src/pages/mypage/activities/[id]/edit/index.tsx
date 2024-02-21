import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import ActivitiesForm from '@/components/MyPage/Activities/ActivitiesForm';
import { priceFormat } from '@/utils/priceFormat';
import { useRouter } from 'next/router';
import { getActivitiesId } from '@/api/activities';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { QueryClient, dehydrate, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PatchMyActivityReq } from '@/types/myActivities';
import { patchActivitiesId } from '@/api/myActivities';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { Activity } from '@/types/common/api';
import QUERY_KEYS from '@/constants/queryKeys';

interface activityEditMutationProps {
  activityId: number;
  data: FieldValues;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const activityId = Number(context.query['id']);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.activityEnroll, activityId],
    queryFn: () => getActivitiesId(activityId),
  });

  return { props: { activityId, dehydratedState: dehydrate(queryClient) } };
};

function ActivityEdit({ activityId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: activityData } = useQuery<Activity>({
    queryKey: [QUERY_KEYS.activityEnroll, activityId],
    queryFn: () => getActivitiesId(activityId),
  });

  const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      title: activityData?.title || '',
      price: priceFormat(activityData?.price || 0) || '',
      address: activityData?.address || '',
      description: activityData?.description || '',
      category: activityData?.category || '',
      bannerImageUrl: activityData?.bannerImageUrl || '',
      schedules: activityData?.schedules || '',

      subImageUrls: activityData?.subImages || '',
      subImageIdsToRemove: [],
      subImageUrlsToAdd: [],
      scheduleIdsToRemove: [],
      schedulesToAdd: [],
    },
  });

  const activityEditMutation = useMutation({
    mutationFn: ({ activityId, data }: activityEditMutationProps) =>
      patchActivitiesId(activityId, data as PatchMyActivityReq),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.activityEnroll, activityId] });
      router.push('/mypage/activities');
    },
    onError: (error) => {
      if (error instanceof AxiosError) toast(`${error.response?.data.message}`);
    },
  });

  const handleOnSubmit = async (data: FieldValues) => {
    delete data.subImageUrls;
    if (data.price.toString() === '0') return toast('가격을 입력해 주세요.');
    if (data.schedules.length === 0) return toast('예약 가능한 시간대를 최소 1개 입력해주세요.');
    delete data.schedules;
    data.price = Number(data.price.replace(/,/g, ''));

    activityEditMutation.mutate({ activityId, data });
  };

  //처음 불러올때 받은 주소 -> 위도 경도로 바꿔주는 함수
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

  useEffect(() => {
    calculateLatlng(activityData?.address || '');
  }, []);

  return <ActivitiesForm methods={methods} handleOnSubmit={handleOnSubmit} latlng={latlng} isEdit={true} />;
}

export default ActivityEdit;
ActivityEdit.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
