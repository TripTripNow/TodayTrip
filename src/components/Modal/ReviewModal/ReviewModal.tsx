import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import styles from './ReviewModal.module.css';
import ModalCloseIcon from '#/icons/icon-modalClose.svg';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import Star from '@/components/Modal/ReviewModal/Star/Star';
import dayjs from 'dayjs';
import { Reservation } from '@/types/common/api';
import { RATINGS } from '@/constants/ratingArray';
import { priceFormat } from '@/utils/priceFormat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMyReservationReview } from '@/api/myReservations';
import toast from 'react-hot-toast';
import QUERY_KEYS from '@/constants/queryKeys';

interface ReviewModalProps {
  data: Reservation;
  handleModalClose: () => void;
}

function ReviewModal({ data, handleModalClose }: ReviewModalProps) {
  const [ratingInputValue, setRatingInputValue] = useState(0);
  const [textInputValue, setTextInputValue] = useState('');
  const [hoveredStarCount, setHoveredStarCount] = useState(0);

  const handleTextInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextInputValue(e.target.value);
  };

  const queryClient = useQueryClient();

  const uploadReviewMutation = useMutation({
    mutationFn: () =>
      postMyReservationReview({ reservationId: data.id, rating: ratingInputValue, content: textInputValue }),
    onSuccess: () => {
      handleModalClose();
      toast.success('리뷰 작성이 완료되었습니다!');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.reservations] });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    uploadReviewMutation.mutate();
  };

  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <div className={styles.modalWrapper}>
        {/* 상단부 */}
        <div className={styles.header}>
          <h2 className={styles.label}>후기 작성</h2>
          <button onClick={handleModalClose}>
            <ModalCloseIcon alt="닫기 아이콘" width="4rem" height="4rem" />
          </button>
        </div>
        {/* 체험 관련 정보 카드 */}
        <div className={styles.cardWrapper}>
          <div className={styles.imageWrapper}>
            <Image fill src={data.activity.bannerImageUrl} alt="체험 이미지" />
          </div>
          <div className={styles.detailContainer}>
            <h2 className={styles.title}>{data.activity.title}</h2>
            <p className={styles.dateDetail}>
              <span>{dayjs(data.date).format('YYYY.MM.DD')}</span>
              <span>·</span>
              <span>
                {data.startTime} - {data.endTime}
              </span>
              <span>·</span>
              <span>{data.headCount}명</span>
            </p>
            <div className={styles.separator}></div>
            <p className={styles.price}>￦{priceFormat(data.totalPrice)}</p>
          </div>
        </div>
        {/* 별점, 리뷰 작성 폼 */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.ratingInput}>
            {RATINGS.map((number) => (
              <Star
                key={number}
                isSelected={ratingInputValue >= number}
                rating={number}
                ratingInputValue={ratingInputValue}
                setRatingInputValue={setRatingInputValue}
                hoveredStarCount={hoveredStarCount}
                setHoveredStarCount={setHoveredStarCount}
              />
            ))}
          </div>
          <textarea
            value={textInputValue}
            onChange={handleTextInputChange}
            className={styles.textarea}
            placeholder="후기를 작성해주세요"
          />
          <button type="submit" disabled={!ratingInputValue || !textInputValue.trim()} className={styles.button}>
            작성하기
          </button>
        </form>
      </div>
    </ModalLayout>
  );
}
export default ReviewModal;
