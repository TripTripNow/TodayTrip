import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useState } from 'react';

import ArrowIcon from '#/icons/icon-arrowBack.svg';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import ReviewModal from '@/components/Modal/ReviewModal/ReviewModal';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import CheckStatus from '@/components/Reservations/Id/CheckStatus';
import Button from '@/components/common/Button/Button';
import { COMPLETED, PENDING } from '@/constants/reservation';
import { priceFormat } from '@/utils/priceFormat';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import styles from './ReservationId.module.css';

import { setContext } from '@/api/axiosInstance';
import QUERY_KEYS from '@/constants/queryKeys';
import { getActivityById } from '@/pages/api/activities';
import { Reservation } from '@/types/common/api';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const item: Reservation = {
  id: 1,
  teamId: '9',
  userId: 3,
  createdAt: '2024-02-11T08:43:26.752Z',
  updatedAt: '2024-02-11T08:43:26.752Z',
  activity: {
    bannerImageUrl: '/images/flower.png',
    title: '함께 배우면 즐거운 스트릿 댄스 함께 배우면 즐거운 스트릿 댄스 함께 배우면 즐거운 스트릿 댄스',
    id: 101,
  },
  scheduleId: 201,
  status: 'completed',
  reviewSubmitted: false,
  totalPrice: 10000,
  headCount: 10,
  date: '2024-03-10',
  startTime: '09:00',
  endTime: '12:00',
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const activityId = Number(context.query.activityId);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.activityId],
    queryFn: () => getActivityById({ activityId }),
  });

  return {
    props: { activityId, dehydratedState: dehydrate(queryClient) },
  };
};

function ReservationID({ activityId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const router = useRouter();
  const res = router.query;
  const { status, reviewSubmitted, headCount, date, startTime, endTime, totalPrice } = res;

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.activityId],
    queryFn: () => getActivityById({ activityId }),
  });

  if (!data) return;
  const { bannerImageUrl, title, address } = data;

  const handleCancelModalToggle = () => {
    setIsAlertModalOpen((prev) => !prev);
  };

  const handleReviewModalToggle = () => {
    setIsReviewModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <Link href="/mypage/reservations" className={styles.link}>
        <ArrowIcon className={styles.iconBack} alt="뒤로 가기 아이콘" />
        <div className={styles.back}>뒤로 가기</div>
      </Link>

      <div className={styles.main}>
        <h1 className={styles.header}>예약 상세</h1>
        <div className={styles.imageWrapper}>
          <Image priority fill src={bannerImageUrl} alt="예약 상세 이미지" />
        </div>
        <div className={styles.content}>
          <CheckStatus status={String(status)} />
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.date}>
            <span>{dayjs(String(date)).format('YYYY.MM.DD')}</span>
            <span> · </span>
            <span>
              {startTime} - {endTime}
            </span>
            <span> · </span>
            <span>{headCount}명</span>
          </p>
          <p className={styles.address}>{address}</p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>￦{priceFormat(Number(totalPrice))}</div>

          {status === PENDING && (
            <Button type="reservation" color="white" onClick={handleCancelModalToggle}>
              예약 취소
            </Button>
          )}
          {status === COMPLETED && (
            <Button
              type="reservation"
              color="green"
              isDisabled={Boolean(reviewSubmitted)}
              onClick={handleReviewModalToggle}
            >
              후기 작성
            </Button>
          )}

          {isAlertModalOpen && (
            <AlertModal
              text="예약을 취소하시겠습니까?"
              buttonText="취소하기"
              handleModalClose={handleCancelModalToggle}
              handleCancel={handleCancelModalToggle}
            />
          )}
          {isReviewModalOpen && <ReviewModal handleModalClose={handleReviewModalToggle} data={item} />}
        </div>
      </div>
    </div>
  );
}

export default ReservationID;
ReservationID.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
