import Header from '@/components/Activities/Header';
import styles from './Activity.module.css';
interface SubImageUrl {
  id: number;
  imageUrl: string;
}

export interface ActivityProps {
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
    description:
      '안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희 체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록 준비해놓았습니다. 저희와 함께 즐길 수 있는 시간을 기대해주세요! 각종 음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희 체험에서는 전문가가 직접 강사로 참여하기 때문에, 저희가 제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을 접할 수 있을 것입니다.',
    category: '투어',
    price: 10000,
    address: '서울특별시 강남구 테헤란로 427',
    bannerImageUrl: '/images/a.png',
    subImageUrls: [
      {
        id: 1,
        imageUrl: '/images/flower.png',
      },
      {
        id: 2,
        imageUrl: '/images/block.png',
      },
      {
        id: 3,
        imageUrl: '/images/flower2.png',
      },
      {
        id: 4,
        imageUrl: '/images/react.png',
      },
    ],
    reviewCount: 5,
    rating: 4.74,
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.mainContainer}>
        <Header data={data} />
        <div>
          <section className={styles.contentContainer}>
            <div className={styles.leftContentContainer}>
              <hr className={styles.hr} />
              <div className={styles.content}>
                <div className={styles.descriptionWrapper}>
                  <h2 className={styles.h2}>체험 설명</h2>
                  <p className={styles.description}>{data.description}</p>
                </div>
              </div>
              <hr className={styles.hr} />
            </div>
          </section>
          <div className={styles.reserve}></div>
        </div>
      </main>
    </div>
  );
}

export default Activity;
