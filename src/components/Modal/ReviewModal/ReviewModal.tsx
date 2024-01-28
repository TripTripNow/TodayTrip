import ModalLayout from '@/components/Modal/ModalLayout/ModalLayout';
import styles from './ReviewModal.module.css';
import CloseIcon from '#/icons/icon-close.svg';
import formatDateString from '@/utils/formatDateString';
import Image from 'next/image';
import { CardProps } from '@/components/Reservations/Card/Card';
import { ChangeEvent, FormEvent, useState } from 'react';
import Star from '@/components/Modal/ReviewModal/Star/Star';

export const RATINGS = [1, 2, 3, 4, 5] as const;

interface ReviewModalProps extends CardProps {
  handleModalClose: () => void;
}
function ReviewModal({ data, handleModalClose }: ReviewModalProps) {
  const [ratingInputValue, setRatingInputValue] = useState(0);
  const [textInputValue, setTextInputValue] = useState('');
  const [hoverValue, setHoverValue] = useState(0);
  const handleTextInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextInputValue(e.target.value);
  };

  //TODO : api 연결
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <ModalLayout handleModalClose={handleModalClose}>
      <div className={styles.modalWrapper}>
        {/* 상단부 */}
        <div className={styles.header}>
          <h2 className={styles.h2}>후기 작성</h2>
          <button onClick={handleModalClose}>
            <CloseIcon />
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
              <span>{formatDateString(data.date)}</span>
              <span>·</span>
              <span>
                {data.startTime} - {data.endTime}
              </span>
              <span>·</span>
              <span>{data.headCount}명</span>
            </p>
            <div className={styles.separator}></div>
            <p className={styles.price}>￦{data.totalPrice.toLocaleString('ko-KR')}</p>
          </div>
        </div>
        {/* 별점, 리뷰 작성 폼 */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.ratingInput}>
            {RATINGS.map((number) => (
              <Star
                key={number}
                isSelected={ratingInputValue >= number}
                rating={number}
                ratingInputValue={ratingInputValue}
                setRatingInputValue={setRatingInputValue}
                hoverValue={hoverValue}
                setHoverValue={setHoverValue}
              />
            ))}
          </div>
          <textarea
            value={textInputValue}
            onChange={handleTextInputChange}
            className={styles.textarea}
            placeholder="후기를 작성해주세요"
          />
          <button disabled={!ratingInputValue || !textInputValue} className={styles.button}>
            작성하기
          </button>
        </form>
      </div>
    </ModalLayout>
  );
}
export default ReviewModal;
