import Link from 'next/link';

import { priceFormat } from '@/utils/priceFormat';
import { intToFloat } from '@/utils/intToFloat';
import { Activity } from '@/types/common/api';
import ImageFallback from '@/components/common/ImageFallback/ImageFallback';
import StarIcon from '#/icons/icon-star.svg';
import styles from './Card.module.css';

type CardProps = {
  item: Pick<Activity, Exclude<keyof Activity, 'address' | 'createdAt' | 'updatedAt'>>;
};

function Card({ item }: CardProps) {
  return (
    <Link href={`activities/${item.id}`}>
      <div className={styles.container}>
        <div className={styles.background}></div>
        <ImageFallback
          src={item.bannerImageUrl}
          alt={item.title}
          className={styles.bannerImage}
          fill
          sizes="100%"
          priority
        />
        <div className={styles.textContainer}>
          <div className={styles.rateWrapper}>
            <StarIcon alt="별 아이콘" />
            <p className={styles.reviewCountText}>{intToFloat(item.rating, 1)}</p>
            <p className={styles.reviewCountText}>{`(${item.reviewCount})`}</p>
          </div>
          <h1 className={styles.title}>{item.title}</h1>
          <div className={styles.priceWrapper}>
            <em>￦ {priceFormat(item.price)}</em>
            <p>/인</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
