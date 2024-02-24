import { getActivitiesId } from '@/api/activities';
import { patchActivitiesId } from '@/api/myActivities';
import QUERY_KEYS from '@/constants/queryKeys';
import { Activity } from '@/types/common/api';
import { PatchMyActivityReq } from '@/types/myActivities';
import { priceFormat } from '@/utils/priceFormat';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface activityEditMutationProps {
  activityId: number;
  data: FieldValues;
}

function useMyActivitiesEdit(activityId: number) {
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

  return { methods, handleOnSubmit, latlng };
}
export default useMyActivitiesEdit;
