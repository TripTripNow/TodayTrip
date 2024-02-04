import styles from './ReviewList.module.css';
import style from '@/pages/activities/[id]/Activity.module.css';
import { reviewData } from '@/components/Activities/mock';
import StarIcon from '#/icons/icon-star.svg';
import EmptyStarIcon from '#/icons/icon-littleEmptyStar.svg';
import Image from 'next/image';
import dayjs from 'dayjs';
import Pagination from '@/components/common/Pagination/Pagination';
import { Fragment, useState } from 'react';
import { RATINGS } from '@/constants/Rating';

function ReviewList({ totalRating }: { totalRating: number }) {
  const { reviews, totalCount } = reviewData;

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const slicedReviews = reviews.slice(3 * currentPageNumber - 3, 3 * currentPageNumber);
  const totalPages = Math.ceil(totalCount / 3);

  const handlePaginationByClick = (num: number) => {
    setCurrentPageNumber(num);
  };

  return (
    <section className={styles.reviewListContainer}>
      <h2 className={style.h2}>후기</h2>
      <div className={styles.ratingWrapper}>
        <h3 className={styles.totalRating}>{totalRating}</h3>
        <div className={styles.detailRating}>
          <p className={styles.satisfaction}>매우 만족</p>
          <p className={styles.reviewCount}>
            <StarIcon style={{ marginBottom: '0.18rem' }} alt="별 아이콘" />
            {totalCount.toLocaleString('ko-KR')}개 후기
          </p>
        </div>
      </div>
      <div className={styles.reviewListWrapper}>
        {slicedReviews.map((review, index) => (
          <Fragment key={review.id}>
            <div className={styles.reviewWrapper}>
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
                  <div className={styles.starCount}>
                    {RATINGS.map((_, index) =>
                      index < review.rating ? (
                        <StarIcon key={index} alt="별 아이콘" />
                      ) : (
                        <EmptyStarIcon key={index} alt="빈 별 아이콘" />
                      ),
                    )}
                  </div>
                  <div className={styles.separator}>|</div>
                  <p className={styles.date}>{dayjs(review.createdAt).format('YYYY.MM.DD')}</p>
                </div>
                <p className={styles.reviewContent}>{review.content}</p>
              </div>
            </div>
            {index !== reviews.length - 1 && <hr className={style.hr} />}
          </Fragment>
        ))}
      </div>
      <Pagination
        pageNumber={currentPageNumber}
        totalPages={totalPages}
        handlePaginationByClick={handlePaginationByClick}
      />
    </section>
  );
}

export default ReviewList;