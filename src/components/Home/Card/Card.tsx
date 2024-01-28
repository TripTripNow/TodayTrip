import Image from 'next/image';

import { priceFormat } from '@/utils/priceFormat';
import { intToFloat } from '@/utils/intToFloat';

import StarIcon from '#/icons/icon-star.svg';

import styles from './Card.module.css';

export interface CardProps {
  item: {
    id: number;
    userId: number;
    title: string;
    description: string;
    category: '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
    price: number;
    bannerImageUrl: string;
    rating: number;
    reviewCount: number;
  };
}

function Card({ item }: CardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <Image src={item.bannerImageUrl} alt={item.title} fill sizes="100%" priority />
      <div className={styles.textContainer}>
        <div className={styles.rateWrapper}>
          <StarIcon />
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
  );
}

export default Card;
