import ArrowIcon from '#/icons/icon-arrowBack.svg';
import ArrowRightIcon from '#/icons/icon-arrowRight.svg';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import Button from '@/components/common/Button/Button';
import formatDateString from '@/utils/formatDateString';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import styles from './ReservationId.module.css';
import ReviewModal from '@/components/Modal/ReviewModal/ReviewModal';
import { Reservations } from '@/types/reservations';

// @todo 카드 데이터 불러오기
const item: Reservations['data'] = {
  id: 1,
  activity: {
    bannerImageUrl: '/images/flower.png',
    title: '함께 배우면 즐거운 스트릿 댄스 함께 배우면 즐거운 스트릿 댄스 함께 배우면 즐거운 스트릿 댄스',
    id: 101,
  },
  scheduleId: 201,
  status: 'canceled',
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
  const STATUS = {
    pending: '예약 신청',
    confirmed: '예약 승인',
    completed: '체험 완료',
    canceled: '예약 취소',
    declined: '예약 거절',
  };

  return (
    <div className={styles.status}>
      {status === 'canceled' || status === 'declined' ? (
        <div className={styles[status]}>{STATUS[status]}</div>
      ) : (
        <>
          <div className={status === 'pending' ? styles.active : styles.inactive}>예약 신청</div>
          <ArrowRightIcon alt="예약 상태 단계 중 첫 번째 화살표" />
          <div className={status === 'confirmed' ? styles.active : styles.inactive}>예약 승인</div>
          <ArrowRightIcon alt="예약 상태 단계 중 두 번째 화살표" />
          <div className={status === 'completed' ? styles.active : styles.inactive}>체험 완료</div>
        </>
      )}
    </div>
  );
};

function ReservationID() {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const router = useRouter();

  const handleCancelModalToggle = () => {
    setIsAlertModalOpen((prev) => !prev);
  };

  const handleReviewModalToggle = () => {
    setIsReviewModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <button className={styles.header} onClick={() => router.push('/mypage/reservations')}>
        <ArrowIcon className={styles.iconBack} alt="뒤로 가기 아이콘" />
        <div className={styles.back}>뒤로 가기</div>
      </button>
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
          <div className={styles.price}>￦{item.totalPrice.toLocaleString('ko-KR')}</div>

          {item.status === 'pending' && (
            <Button type="reservation" color="white" onClick={handleCancelModalToggle}>
              예약 취소
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
          {item.status === 'completed' && (
            <Button type="reservation" color="green" isDisabled={item.reviewSubmitted}>
              후기 작성
            </Button>
          )}
          {isReviewModalOpen && <ReviewModal handleModalClose={handleReviewModalToggle} data={item} />}
        </div>
      </div>
    </div>
  );
}

export default ReservationID;
ReservationID.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
