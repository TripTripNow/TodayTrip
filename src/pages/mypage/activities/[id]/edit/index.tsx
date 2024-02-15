import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement, useEffect, useState } from 'react';

import { FieldValues, useForm } from 'react-hook-form';

import ActivitiesForm from '@/components/MyPage/Activities/ActivitiesForm';
import { priceFormat } from '@/utils/priceFormat';
import { useRouter } from 'next/router';
import { getActivitiesId } from '@/api/activities/activities';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { GetActivitiesRes } from '@/types/Activities';
import { PatchMyActivityReq } from '@/types/myActivities';
import { patchActivitiesId } from '@/api/myActivities/myActivities';
import toast from 'react-hot-toast';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const activityId = Number(context.query['id']);

  console.log(activityId);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['activity', activityId],
    queryFn: () => getActivitiesId(activityId),
  });
  return { props: { activityId, dehydratedState: dehydrate(queryClient) } };
};

function ActivityEdit({ activityId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: activityData } = useQuery<GetActivitiesRes>({
    queryKey: ['activity', activityId],
    queryFn: () => getActivitiesId(activityId),
  });

  const [items, setItems] = useState(activityData!);
  const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(null);
  const router = useRouter();
  const id = Number(router.query.id);

  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      title: items.title,
      price: priceFormat(items.price),
      address: items.address,
      description: items.description,
      category: items.category,
      bannerImageUrl: items.bannerImageUrl,
      subImageUrls: items.subImages,
      schedules: items.schedules,

      subImageIdsToRemove: [],
      subImageUrlsToAdd: [],

      scheduleIdsToRemove: [],
      schedulesToAdd: [],
    },
  });

  const handleOnSubmit = async (data: FieldValues) => {
    delete data.subImageUrls;
    delete data.schedules;
    console.log(typeof data.price);
    if (data.price.toString() === '0') return toast('가격을 입력해 주세요.');
    // if (data.schedules.length === 0) Areturn toast('예약 가능한 시간대를 최소 1개 입력해주세요.');
    data.price = Number(data.price.replace(/,/g, ''));
    if (data) console.log(data);
    const result = await patchActivitiesId(activityId, data as PatchMyActivityReq);
    if (result === 200) {
      // router.push('/mypage/activities');
      console.log('성공');
    }
  };

  const getItems = async (id: number) => {
    const result = await getActivitiesId(id);
    setItems(result);
    return result;
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
    calculateLatlng(items.address);
    getItems(id);
  }, []);

  return <ActivitiesForm methods={methods} handleOnSubmit={handleOnSubmit} latlng={latlng} isEdit={true} />;
}

export default ActivityEdit;
ActivityEdit.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
