import styles from './ReviewList.module.css';
import style from '@/pages/activities/[id]/Activity.module.css';
import StarIcon from '#/icons/icon-star.svg';
import EmptyStarIcon from '#/icons/icon-littleEmptyStar.svg';
import Image from 'next/image';
import dayjs from 'dayjs';
import Pagination from '@/components/common/Pagination/Pagination';
import { Fragment, useState } from 'react';
import determineSatisfaction from '@/utils/determineSatisfaction';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import instance from '@/api/axiosInstance';
import { GetReviewsRes } from '@/types/Activities';
import LogoIcon from '#/icons/icon-logoMark.png';
const RATINGS = [1, 2, 3, 4, 5];

function ReviewList({ totalRating, activityId }: { totalRating: number; activityId: number }) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const handlePaginationByClick = (num: number) => {
    setCurrentPageNumber(num);
  };

  const { data: reviewData } = useQuery<GetReviewsRes>({
    queryKey: ['reviews', currentPageNumber],
    queryFn: () => instance.get(`/activities/${activityId}/reviews?page=${currentPageNumber}&size=3`),
    placeholderData: keepPreviousData,
  });

  if (!reviewData) return;

  const { reviews, totalCount } = reviewData;
  const totalPages = Math.ceil(totalCount / 3);

  return (
    <section className={styles.reviewListContainer}>
      <h2 className={style.label}>후기</h2>
      <div className={styles.ratingWrapper}>
        <h3 className={styles.totalRating}>{totalRating}</h3>
        <div className={styles.detailRating}>
          <p className={styles.satisfaction}>{determineSatisfaction(totalRating)}</p>
          <p className={styles.reviewCount}>
            <StarIcon style={{ marginBottom: '0.18rem' }} alt="별 아이콘" />
            {totalCount.toLocaleString('ko-KR')}개 후기
          </p>
        </div>
      </div>
      <div className={styles.reviewListWrapper}>
        {reviews.map((review, index) => (
          <Fragment key={review.id}>
            <div className={styles.reviewWrapper}>
              <Image
                style={{ borderRadius: '100%' }}
                src={review.user.profileImageUrl ?? LogoIcon}
                width={45}
                height={45}
                alt="프로필 이미지"
              />
              <div className={styles.detailReview}>
                <div className={styles.reviewerInfo}>
                  <h3 className={styles.nickname}>{review.user.nickname}</h3>
                  <div className={styles.starAndDate}>
                    <div className={styles.starCount}>
                      {RATINGS.map((_, index) =>
                        index < review.rating ? (
                          <StarIcon key={index} alt="별 아이콘" />
                        ) : (
                          <EmptyStarIcon key={index} alt="빈 별 아이콘" />
                        ),
                      )}
                    </div>
                    <p className={styles.date}>{dayjs(review.createdAt).format('YYYY.MM.DD')}</p>
                  </div>
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
