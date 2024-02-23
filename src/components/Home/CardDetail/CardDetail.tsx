import Link from 'next/link';

import { intToFloat } from '@/utils/intToFloat';
import { priceFormat } from '@/utils/priceFormat';
import StarIcon from '#/icons/icon-star.svg';
import styles from './CardDetail.module.css';
import { Activity } from '@/types/common/api';
import ImageFallback from '@/components/common/ImageFallback/ImageFallback';

type CardDetailProps = { item: Pick<Activity, Exclude<keyof Activity, 'address' | 'createdAt' | 'updatedAt'>> };

function CardDetail({ item }: CardDetailProps) {
  return (
    <Link href={`/activities/${item.id}`}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <ImageFallback
            src={item.bannerImageUrl}
            alt="체험 배너"
            className={styles.image}
            fill
            sizes="(min-width: 76.8rem) 28.3rem, (max-width: 119.9rem and min-width: 76.8rem) 37.2rem, (max-width) 36.4rem"
            priority
          />
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionTopWrapper}>
            <div className={styles.reviewWrapper}>
              <StarIcon alt="별 아이콘" />
              <p>
                {intToFloat(item.rating, 1)}
                <span> ({item.reviewCount})</span>
              </p>
            </div>
            <h1 className={styles.title}>{item.title}</h1>
          </div>
          <div className={styles.descriptionBottomWrapper}>
            <em>￦ {priceFormat(item.price)}</em>
            <p>/인</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardDetail;
