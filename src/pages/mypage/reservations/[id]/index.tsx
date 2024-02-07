import Image from 'next/image';
import { ReactElement, useState } from 'react';

import ArrowIcon from '#/icons/icon-arrowBack.svg';
import ArrowRightIcon from '#/icons/icon-arrowRight.svg';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import ReviewModal from '@/components/Modal/ReviewModal/ReviewModal';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import Button from '@/components/common/Button/Button';
import { CANCELED, COMPLETED, CONFIRMED, DECLINED, PENDING, RESERVATION_STATUS } from '@/constants/reservation';
import { Reservations } from '@/types/reservations';
import formatDateString from '@/utils/formatDateString';
import { priceFormat } from '@/utils/priceFormat';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './ReservationId.module.css';

const item: Reservations['data'] = {
  id: 1,
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

// @todo 주소 데이터 불러오기
const address = '서울특별시 강남구 테헤란로 427';

interface CheckStatusProps {
  status: string;
}

const CheckStatus = ({ status }: CheckStatusProps) => {
  return (
    <div className={styles.status}>
      {status === CANCELED || status === DECLINED ? (
        <div className={styles[status]}>{RESERVATION_STATUS[status]}</div>
      ) : (
        <>
          <div className={status === PENDING ? styles.active : styles.inactive}>{RESERVATION_STATUS['pending']}</div>
          <ArrowRightIcon alt="예약 신청에서 예약 승인으로 가는 화살표" />
          <div className={status === CONFIRMED ? styles.active : styles.inactive}>
            {RESERVATION_STATUS['confirmed']}
          </div>
          <ArrowRightIcon alt="예약 승인에서 체험 완료로 가는 화살표" />
          <div className={status === COMPLETED ? styles.active : styles.inactive}>
            {RESERVATION_STATUS['completed']}
          </div>
        </>
      )}
    </div>
  );
};

function ReservationID() {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // @todo id값을 사용해서 해당 카드 데이터 불러오기
  const router = useRouter();
  const { id } = router.query;

  const handleCancelModalToggle = () => {
    setIsAlertModalOpen((prev) => !prev);
  };

  const handleReviewModalToggle = () => {
    setIsReviewModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <Link href="/mypage/reservations" className={styles.header}>
        <ArrowIcon className={styles.iconBack} alt="뒤로 가기 아이콘" />
        <div className={styles.back}>뒤로 가기</div>
      </Link>

      <div className={styles.main}>
        <h1 className={styles.h1}>예약 상세</h1>
        <div className={styles.imageWrapper}>
          <Image priority fill src={item.activity.bannerImageUrl} alt="예약 상세 이미지" />
        </div>
        <div className={styles.content}>
          <CheckStatus status={item.status} />
          <h2 className={styles.title}>{item.activity.title}</h2>
          <p className={styles.date}>
            <span>{formatDateString(item.date)}</span>
            <span> · </span>
            <span>
              {item.startTime} - {item.endTime}
            </span>
            <span> · </span>
            <span>{item.headCount}명</span>
          </p>
          <p className={styles.address}>{address}</p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>￦{priceFormat(item.totalPrice)}</div>

          {item.status === PENDING && (
            <Button type="reservation" color="white" onClick={handleCancelModalToggle}>
              예약 취소
            </Button>
          )}
          {item.status === COMPLETED && (
            <Button
              type="reservation"
              color="green"
              isDisabled={item.reviewSubmitted}
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
