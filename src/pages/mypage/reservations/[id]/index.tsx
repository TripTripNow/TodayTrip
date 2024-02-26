import { QueryClient, dehydrate, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import ArrowIcon from '#/icons/icon-arrowBack.svg';
import { getActivityById } from '@/api/activities';
import { patchMyReservationsId } from '@/api/myReservations';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import ReviewModal from '@/components/Modal/ReviewModal/ReviewModal';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import CheckStatus from '@/components/MyPage/Reservations/Details/CheckStatus';
import Button from '@/components/common/Button/Button';
import Map from '@/components/common/Map/Map';
import { RESERVATION_STATUS } from '@/constants/reservation';
import { ReservationStatus } from '@/types/common/api';
import { priceFormat } from '@/utils/priceFormat';
import styles from './ReservationId.module.css';
import HeadMeta from '@/components/HeadMeta/HeadMeta';
import { META_TAG } from '@/constants/metaTag';

interface ResTypes {
  status: ReservationStatus;
  reviewSubmitted: string;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  id: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const activityId = Number(context.query.activityId);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [activityId],
    queryFn: () => getActivityById({ activityId }),
  });

  return {
    props: { activityId, dehydratedState: dehydrate(queryClient) },
  };
};

const containerStyle = {
  width: '100%',
  height: '28em',
};

function ReservationID({ activityId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: [activityId],
    queryFn: () => getActivityById({ activityId }),
  });

  const res = router.query as unknown as ResTypes;
  const { status, reviewSubmitted, headCount, date, startTime, endTime, totalPrice, id } = res;
  const [isReviewSubmit, setIsReviewSubmit] = useState<boolean>(reviewSubmitted === 'true');

  const [currentStatus, setCurrentStatus] = useState(status);

  const hasResult = Object.keys(res).length > 1;

  useEffect(() => {
    if (!hasResult) {
      router.push('/mypage/reservations');
    }
  }, []);

  const cancelReservationMutation = useMutation({
    mutationFn: () => patchMyReservationsId(Number(id)),
    onSuccess: () => {
      toast.success('예약이 취소되었습니다.');
      setCurrentStatus('canceled');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  if (!data) return null;
  const { bannerImageUrl, title, address } = data;

  const handleCancelModalToggle = () => {
    setIsAlertModalOpen((prev) => !prev);
  };

  const handleReviewModalToggle = () => {
    setIsReviewModalOpen((prev) => !prev);
  };

  const handleCancelReservation = () => {
    cancelReservationMutation.mutate();
    setIsAlertModalOpen(false);
  };

  const handleClickNavigate = () => {
    router.push(`/activities/${activityId}`);
  };

  const modalData = {
    id: Number(id),
    status,
    reviewSubmitted: Boolean(reviewSubmitted),
    totalPrice: Number(totalPrice),
    headCount: Number(headCount),
    date,
    startTime,
    endTime,
    activity: { id: Number(id), title, bannerImageUrl },
  };

  return (
    <>
      <HeadMeta title={META_TAG.reservationDetail['title']} description={META_TAG.reservationDetail['description']} />
      <div className={styles.container}>
        <Link href="/mypage/reservations" className={styles.link}>
          <ArrowIcon className={styles.iconBack} alt="뒤로 가기 아이콘" />
          <div className={styles.back}>뒤로 가기</div>
        </Link>
        <div className={styles.main}>
          <h1 className={styles.header}>예약 상세</h1>
          <div className={styles.bannerImageWrapper}>
            <Image className={styles.bannerImage} priority fill src={bannerImageUrl} alt="예약 상세 이미지" />
          </div>
          <div className={styles.content}>
            <CheckStatus status={currentStatus} />
            <h2 className={styles.title} onClick={handleClickNavigate}>
              {title}
            </h2>
            <p className={styles.date}>
              <span>{dayjs(date).format('YYYY.MM.DD')}</span>
              <span> · </span>
              <span>
                {startTime} - {endTime}
              </span>
              <span> · </span>
              <span>{headCount}명</span>
            </p>
          </div>
          <Map address={address} containerStyle={containerStyle} />
          <div className={styles.bottom}>
            <div className={styles.price}>￦{priceFormat(Number(totalPrice))}</div>
            {currentStatus === RESERVATION_STATUS.PENDING && (
              <Button type="reservation" color="white" onClick={handleCancelModalToggle}>
                예약 취소
              </Button>
            )}
            {currentStatus === RESERVATION_STATUS.COMPLETED && (
              <Button type="reservation" color="green" isDisabled={isReviewSubmit} onClick={handleReviewModalToggle}>
                후기 작성
              </Button>
            )}
            {isAlertModalOpen && (
              <AlertModal
                text="예약을 취소하시겠습니까?"
                buttonText="취소하기"
                handleModalClose={handleCancelModalToggle}
                handleActionButtonClick={handleCancelReservation}
              />
            )}
            {isReviewModalOpen && (
              <ReviewModal
                handleModalClose={handleReviewModalToggle}
                data={modalData}
                setIsReviewSubmit={setIsReviewSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReservationID;
ReservationID.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
