import styles from './Activities.module.css';
import KebabIcon from '#/icons/icon-kebab.svg';
import DanceImg from '#/images/img-dance.jpg';
import StarIcon from '#/icons/icon-star.svg';
import { useState, ReactElement, useEffect } from 'react';
import MyPageLayout from '@/components/MyPage/MyPageLayout';
import Image from 'next/image';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const myActivitiesMock = {
  activities: [
    {
      id: 1,
      userId: 10,
      title: '함께 배우면 신나는 종민 댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 10000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 1,
      reviewCount: 10,
      createdAt: '2024-01-27T11:10:44.283Z',
    },
    {
      id: 2,
      userId: 9,
      title: '함께 배우면 즐거운 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 15000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 3,
      reviewCount: 30,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 3,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 4,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 5,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 6,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 7,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 8,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 9,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 10,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 11,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 12,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 13,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 14,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 15,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 16,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 17,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 18,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 19,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 20,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 21,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
    {
      id: 22,
      userId: 8,
      title: '함께 배우면 슬픈 스트릿댄스',
      description: '둠칫 둠칫 두둠칫',
      category: '투어',
      price: 20000,
      address: '서울특별시 강남구 테헤란로 427',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
      rating: 5,
      reviewCount: 50,
      createdAt: '2024-01-27T00:16:43.256Z',
    },
  ],
  totalCount: 22,
};

function Activities() {
  const [kebabOpenStates, setKebabOpenStates] = useState(Array(myActivitiesMock.activities.length).fill(false));
  const [visibleMock, setVisibleMock] = useState(6);
  const { isVisible, targetRef } = useInfiniteScroll();

  const handleKebabButton = (id: number, isBlur: boolean) => {
    setTimeout(() => {
      setKebabOpenStates((prev) => {
        const now = [...prev];
        if (isBlur && now[id]) {
          now[id] = !now[id];
        } else if (!isBlur) {
          now[id] = !now[id];
        }
        return now;
      });
    });
  };

  const handleEditButton = (id: number) => {
    console.log('이 수정하기 content의 id 값은 :', id);
  };
  const handleDeleteButton = (id: number) => {
    console.log('이 삭제하기 content의 id 값은 :', id);
  };

  useEffect(() => {
    if (isVisible) {
      setVisibleMock((prev) => prev + 3);
    }
  }, [isVisible]);

  const filteredReservations = myActivitiesMock.activities.slice(0, visibleMock);
  return (
    <>
      <div className={styles.activitiesContainer}>
        <div className={styles.activitiesContent}>
          <div className={styles.activitiesContentHeader}>
            <p>내 체험 관리</p>
            <button className={styles.activitiesButton}>체험 등록하기</button>
          </div>
          <div className={styles.activitiesItemContainer}>
            {filteredReservations.map((item) => (
              <div className={styles.activitiesItemWrapper} key={item.id}>
                <div className={styles.activitiesItemImgDiv}>
                  <Image className={styles.activitiesImg} src={DanceImg} alt="춤사진" />
                </div>
                <div className={styles.activitiesItemContent}>
                  <div className={styles.activitiesItemContentHeader}>
                    <StarIcon />
                    <p>
                      {item.rating} ({item.reviewCount})
                    </p>
                  </div>
                  <p className={styles.activitiesItemContentTitle}>{item.title}</p>
                  <div className={styles.activitiesItemContentFooter} onBlur={() => handleKebabButton(item.id, true)}>
                    <p>
                      ￦{item.price} <span className={styles.activitiesItemContentFooterCount}>/인</span>
                    </p>
                    <button onClick={() => handleKebabButton(item.id, false)}>
                      <KebabIcon className={styles.kebabImgWrapper} />
                    </button>
                    {kebabOpenStates[item.id] && (
                      <div className={styles.activitiesKebabWrapper}>
                        <button className={styles.activitiesKebabContent} onClick={() => handleEditButton(item.id)}>
                          수정하기
                        </button>
                        <hr className={styles.styleHr} />
                        <button className={styles.activitiesKebabContent} onClick={() => handleDeleteButton(item.id)}>
                          삭제하기
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div ref={targetRef}></div>
    </>
  );
}

export default Activities;
Activities.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
