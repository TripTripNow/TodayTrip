import ArrowIcon from '#/icons/icon-arrowBack.svg';
import ExampleImg from '#/images/img-dance.jpg';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import Button from '@/components/common/Button/Button';
import styles from './ReservationId.module.css';

import Image from 'next/image';
import { ReactElement } from 'react';

function ReservationID() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ArrowIcon className={styles.iconBack} alt="뒤로 가기 아이콘" />
        <div className={styles.back}>뒤로 가기</div>
      </div>
      <div className={styles.main}>
        <h1 className={styles.h1}>예약 상세</h1>
        <div className={styles.imageWrapper}>
          <Image priority fill src={ExampleImg} alt="예약 이미지" />
        </div>

        <div className={styles.content}>
          <div className={styles.status}>
            <div className={styles.pending}>예약 신청</div>
            <div className={styles.confirmed}>예약 승인</div>
            <div className={styles.completed}>체험 완료</div>
          </div>
          <h2 className={styles.title}>함께 배우면 즐거릿 면함께 배우면 면면면면면</h2>
          <p className={styles.date}>
            <span>2023. 2. 14</span>
            <span> · </span>
            <span>11:00 - 12:30</span>
            <span> · </span>
            <span>10명</span>
          </p>
          <p>스트릿 댄스 상세 주소 추가</p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.price}>￦10,000</div>
          <Button type="reservation" color="green">
            예약 취소
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ReservationID;
ReservationID.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
