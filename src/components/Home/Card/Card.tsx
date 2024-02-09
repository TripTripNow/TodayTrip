import Image from 'next/image';
import Link from 'next/link';

import { priceFormat } from '@/utils/priceFormat';
import { intToFloat } from '@/utils/intToFloat';

import StarIcon from '#/icons/icon-star.svg';

import styles from './Card.module.css';
import { Activities } from '@/types/activities';

type CardProps = { item: Activities };

function Card({ item }: CardProps) {
  return (
    <Link href={`activities/${item.id}`}>
      <div className={styles.container}>
        <div className={styles.background}></div>
        <Image className={styles.bannerImage} src={item.bannerImageUrl} alt={item.title} fill sizes="100%" priority />
        <div className={styles.textContainer}>
          <div className={styles.rateWrapper}>
            <StarIcon alt="별 아이콘" />
            <p className={styles.reviewCountText}>{intToFloat(item.rating, 1)}</p>
            <p className={styles.reviewCountText}>{`(${item.reviewCount})`}</p>
          </div>
          <h3 className={styles.title}>{item.title}</h3>
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
