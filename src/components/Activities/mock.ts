import { Activity, ReturnReview } from '@/types/Actvity';
import { TimeSlot } from '@/types/Calendar';

export const activityData: Activity = {
  id: 7,
  userId: 21,
  title: '함께 배우면 즐거운 스트릿댄스',
  description:
    '안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희 체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록 준비해놓았습니다. 저희와 함께 즐길 수 있는 시간을 기대해주세요! 각종 음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희 체험에서는 전문가가 직접 강사로 참여하기 때문에, 저희가 제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을 접할 수 있을 것입니다.',
  category: '투어',
  price: 10000,
  address: '서울 중구 삼일대로 343 대신파이낸스센터 8층',
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

export const timeSlot: TimeSlot[] = [
  {
    date: '2024-02-04',
    times: [
      {
        id: 25,
        startTime: '12:00',
        endTime: '13:00',
      },
    ],
  },
  {
    date: '2024-02-05',
    times: [
      {
        id: 26,
        startTime: '12:00',
        endTime: '13:00',
      },
      {
        id: 27,
        startTime: '13:00',
        endTime: '14:00',
      },
      {
        id: 28,
        startTime: '19:00',
        endTime: '20:00',
      },
      {
        id: 23,
        startTime: '11:00',
        endTime: '12:00',
      },
      {
        id: 21,
        startTime: '20:00',
        endTime: '21:00',
      },
      {
        id: 22,
        startTime: '9:00',
        endTime: '10:00',
      },
    ],
  },
];

export const reviewData: ReturnReview = {
  reviews: [
    {
      id: 1,
      user: {
        id: 7,
        nickname: '박경서',
        profileImageUrl: '/images/flower.png',
      },
      activityId: 9,
      content:
        '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
      rating: 5,
      createdAt: '2024-01-27T18:23:57.082Z',
      updatedAt: '2024-01-27T18:23:57.082Z',
    },
    {
      id: 2,
      user: {
        id: 8,
        nickname: '유담이',
        profileImageUrl: '/images/react.png',
      },
      activityId: 9,
      content:
        '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었고, 강사님의 친절한 설명 덕분에 저는 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다.',
      rating: 4,
      createdAt: '2024-01-27T18:23:57.082Z',
      updatedAt: '2024-01-27T18:23:57.082Z',
    },
    {
      id: 3,
      user: {
        id: 9,
        nickname: '다크종',
        profileImageUrl: '/images/block.png',
      },
      activityId: 9,
      content:
        '전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 이번 체험을 거쳐 저의 춤추기 실력은 더욱 향상되었어요.',
      rating: 3,
      createdAt: '2024-01-27T18:23:57.082Z',
      updatedAt: '2024-01-27T18:23:57.082Z',
    },
    {
      id: 4,
      user: {
        id: 7,
        nickname: '마우스',
        profileImageUrl: '/images/flower.png',
      },
      activityId: 9,
      content: '댄스 조아',
      rating: 5,
      createdAt: '2024-01-27T18:23:57.082Z',
      updatedAt: '2024-01-27T18:23:57.082Z',
    },
    {
      id: 5,
      user: {
        id: 8,
        nickname: '유담이',
        profileImageUrl: '/images/react.png',
      },
      activityId: 9,
      content: '유담이는 기여워',
      rating: 4,
      createdAt: '2024-01-27T18:23:57.082Z',
      updatedAt: '2024-01-27T18:23:57.082Z',
    },
    {
      id: 6,
      user: {
        id: 9,
        nickname: '화이트종',
        profileImageUrl: '/images/block.png',
      },
      activityId: 9,
      content: '다음에 비보잉 보여드릴게요',
      rating: 7,
      createdAt: '2024-01-27T18:23:57.082Z',
      updatedAt: '2024-01-27T18:23:57.082Z',
    },
    {
      id: 7,
      user: {
        id: 7,
        nickname: '전수빈',
        profileImageUrl: '/images/flower2.png',
      },
      activityId: 9,
      content: '수빈이는 귀여워',
      rating: 1,
      createdAt: '2024-01-27T18:23:57.082Z',
      updatedAt: '2024-01-27T18:23:57.082Z',
    },
    {
      id: 8,
      user: {
        id: 8,
        nickname: '소은김',
        profileImageUrl: '/images/nextjs.png',
      },
      activityId: 9,
      content: '댄스는 어려워요',
      rating: 2,
      createdAt: '2024-01-27T18:23:57.082Z',
      updatedAt: '2024-01-27T18:23:57.082Z',
    },
    {
      id: 9,
      user: {
        id: 9,
        nickname: '다크종',
        profileImageUrl: '/images/block.png',
      },
      activityId: 9,
      content: '나는야 댄싱킹',
      rating: 3,
      createdAt: '2024-01-27T18:23:57.082Z',
      updatedAt: '2024-01-27T18:23:57.082Z',
    },
    {
      id: 10,
      user: {
        id: 7,
        nickname: '경서',
        profileImageUrl: '/images/flower.png',
      },
      activityId: 9,
      content: 'zerm',
      rating: 5,
      createdAt: '2024-01-27T18:23:57.082Z',
      updatedAt: '2024-01-27T18:23:57.082Z',
    },
    {
      id: 11,
      user: {
        id: 8,
        nickname: '유담이',
        profileImageUrl: '/images/react.png',
      },
      activityId: 9,
      content: '담이담이담',
      rating: 4,
      createdAt: '2024-01-27T18:23:57.082Z',
      updatedAt: '2024-01-27T18:23:57.082Z',
    },
    {
      id: 12,
      user: {
        id: 9,
        nickname: '다크종',
        profileImageUrl: '/images/block.png',
      },
      activityId: 9,
      content: '점심 나가서 먹을 거 같아',
      rating: 3,
      createdAt: '2024-01-27T18:23:57.082Z',
      updatedAt: '2024-01-27T18:23:57.082Z',
    },
  ],
  totalCount: 12,
};
