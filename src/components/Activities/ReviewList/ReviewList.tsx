import styles from './ReviewList.module.css';
import style from '@/pages/activities/[id]/Activity.module.css';
import { reviewData } from '@/components/Activities/mock';
import StarIcon from '#/icons/icon-star.svg';
import Image from 'next/image';
import dayjs from 'dayjs';
import Pagination from '@/components/common/Pagination/Pagination';
function ReviewList() {
  const { reviews, totalCount } = reviewData;

  return (
    <div className={styles.reviewListContainer}>
      <h2 className={style.h2}>후기</h2>
      <div className={styles.ratingWrapper}>
        <h3 className={styles.totalRating}>4.2</h3>
        <div className={styles.detailRating}>
          <p className={styles.satisfaction}>매우 만족</p>
          <p className={styles.reviewCount}>
            <StarIcon alt="별 아이콘" />
            {totalCount.toLocaleString('ko-KR')}개 후기
          </p>
        </div>
      </div>
      <div className={styles.reviewListWrapper}>
        {reviews.map((review, index) => (
          <>
            <div key={review.id} className={styles.reviewWrapper}>
              <Image
                style={{ borderRadius: '100%' }}
                src={review.user.profileImageUrl}
                width={45}
                height={45}
                alt="프로필 이미지"
              />
              <div className={styles.detailReview}>
                <div className={styles.nameAndDate}>
                  <h3 className={styles.nickname}>{review.user.nickname}</h3>
                  <div className={styles.separator}>|</div>
                  <p className={styles.date}>{dayjs(review.createdAt).format('YYYY.MM.DD')}</p>
                </div>
                <p className={styles.reviewContent}>{review.content}</p>
              </div>
            </div>
            {index !== reviews.length - 1 && <hr className={style.hr} />}
          </>
        ))}
      </div>
      <Pagination pageNumber={1} totalPages={5} />
    </div>
  );
}

export default ReviewList;
