import styles from './Activity.module.css';
import StarIcon from '#/icons/icon-yellowStar.svg';
interface SubImageUrl {
  id: number;
  imageUrl: string;
}

interface ActivityProps {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageUrls: SubImageUrl[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

function Activity() {
  const data = {
    id: 7,
    userId: 21,
    title: '함께 배우면 즐거운 스트릿댄스',
    description: '둠칫 둠칫 두둠칫',
    category: '투어',
    price: 10000,
    address: '서울특별시 강남구 테헤란로 427',
    bannerImageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
    subImageUrls: [
      {
        id: 1,
        imageUrl:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png',
      },
    ],
    reviewCount: 5,
    rating: 4.74,
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.category}>{data.category}</p>
          <h1 className={styles.h1}>{data.title}</h1>
          <div>
            <p>
              <StarIcon />
              {data.rating}({data.reviewCount})
            </p>
            <p>{data.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity;
