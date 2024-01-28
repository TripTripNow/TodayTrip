import Image from 'next/image';
import Link from 'next/link';

import styles from './CardDetail.module.css';
import StarIcon from '#/icons/icon-star.svg';
import { CardProps } from '@/components/Home/Card/Card';
import { intToFloat } from '@/utils/intToFloat';
import { priceFormat } from '@/utils/priceFormat';

function CardDetail({ item }: { item: CardProps['item'] }) {
  return (
    <Link href={`/activities/${item.id}`}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image src={item.bannerImageUrl} className={styles.image} fill sizes="100%" priority alt="체험 배너" />
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionTopWrapper}>
            <div className={styles.reviewWrapper}>
              <StarIcon />
              <p>
                {intToFloat(item.rating, 1)}
                <span> ({item.reviewCount})</span>
              </p>
            </div>
            <h3>{item.title}</h3>
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
