import { GetReservedScheduleRes, GetReservationDashboardRes, Activities } from '@/types/myActivities';
import card1 from '#/images/img-carousel1.png';
import card2 from '#/images/img-carousel2.png';
import card3 from '#/images/img-carousel3.png';

export interface RESERVATION_DETAILS_MONTH_DECLIEND_MOCK_DATA_PROPS {
  date: string;
  reservations: {
    declined: number;
    confirmed: number;
    pending: number;
    [key: string]: number;
  };
}

export interface RESERVATION_DETAILS_MODAL_DETAILED_TIME_MOCK_DATA_PROPS {
  cursorId: number;
  totalCount: number;
  reservations: {
    id: number;
    nickname: string;
    userId: number;
    teamId: string;
    activityId: number;
    scheduleId: number;
    status: string;
    reviewSubmitted: true;
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export const RESERVATION_CARDS_MOCK_DATA: Pick<
  Activities,
  Exclude<keyof Activities, 'address' | 'createdAt' | 'updatedAt'>
>[] = [
  {
    id: 1,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 1,
    bannerImageUrl: card1.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 2,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 2,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 3,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 3,
    bannerImageUrl: card3.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 4,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 4,
    bannerImageUrl: card1.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 5,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 5,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 6,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 6,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 7,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 7,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 8,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 8,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 9,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 9,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 10,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 10,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 11,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 11,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 12,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 12,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 13,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 13,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
  {
    id: 14,
    userId: 0,
    title: '함께 배우면 즐거운 스트릿 댄스',
    description: 'ㅁㄴㅇ',
    category: '투어',
    price: 14,
    bannerImageUrl: card2.src,
    rating: 5,
    reviewCount: 793,
  },
];

// 체험명 데이터
export const RESERVATION_DETAILS_MY_ACTIVITIES_MOCK_DATA = {
  cursorId: 0,
  totalCount: 0,
  activities: [
    {
      id: 1,
      userId: 0,
      title: '안녕하세요',
      description: 'string',
      category: 'string',
      price: 0,
      address: 'string',
      bannerImageUrl: 'string',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-01-31T11:00:37.735Z',
      updatedAt: '2024-01-31T11:00:37.735Z',
    },
    {
      id: 2,
      userId: 0,
      title: 'cause your love is so sweet',
      description: 'string',
      category: 'string',
      price: 0,
      address: 'string',
      bannerImageUrl: 'string',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-01-31T11:00:37.735Z',
      updatedAt: '2024-01-31T11:00:37.735Z',
    },
    {
      id: 3,
      userId: 0,
      title: 'hello world',
      description: 'string',
      category: 'string',
      price: 0,
      address: 'string',
      bannerImageUrl: 'string',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-01-31T11:00:37.735Z',
      updatedAt: '2024-01-31T11:00:37.735Z',
    },
    {
      id: 4,
      userId: 0,
      title: '모달창 외부 스크롤',
      description: 'string',
      category: 'string',
      price: 0,
      address: 'string',
      bannerImageUrl: 'string',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-01-31T11:00:37.735Z',
      updatedAt: '2024-01-31T11:00:37.735Z',
    },
    {
      id: 5,
      userId: 0,
      title: '워크플로우 화면설계',
      description: 'string',
      category: 'string',
      price: 0,
      address: 'string',
      bannerImageUrl: 'string',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-01-31T11:00:37.735Z',
      updatedAt: '2024-01-31T11:00:37.735Z',
    },
  ],
};

// 월별로 있는 데이터
export const RESERVATION_DETAILS_MONTH_MOCK_DATA: GetReservationDashboardRes[] = [
  {
    date: '2024-01-31',
    reservations: {
      completed: 1,
      confirmed: 0,
      pending: 1,
    },
  },
  {
    date: '2024-02-01',
    reservations: {
      completed: 1,
      confirmed: 2,
      pending: 4,
    },
  },
  {
    date: '2024-02-02',
    reservations: {
      completed: 2,
      confirmed: 0,
      pending: 10,
    },
  },
  {
    date: '2024-02-03',
    reservations: {
      completed: 0,
      confirmed: 45,
      pending: 0,
    },
  },
];

export const RESERVATION_DETAILS_MONTH_DECLIEND_MOCK_DATA: RESERVATION_DETAILS_MONTH_DECLIEND_MOCK_DATA_PROPS[] = [
  {
    date: '2024-01-31',
    reservations: {
      declined: 1,
      confirmed: 0,
      pending: 1,
    },
  },
  {
    date: '2024-02-01',
    reservations: {
      declined: 1,
      confirmed: 2,
      pending: 4,
    },
  },
  {
    date: '2024-02-02',
    reservations: {
      declined: 2,
      confirmed: 0,
      pending: 10,
    },
  },
  {
    date: '2024-02-03',
    reservations: {
      declined: 0,
      confirmed: 45,
      pending: 0,
    },
  },
];

export const RESERVATION_DETAILS_MODAL_MOCK_DATA: GetReservedScheduleRes[] = [
  {
    scheduleId: 1,
    startTime: '00:00',
    endTime: '04:00',
    count: {
      declined: 1,
      confirmed: 2,
      pending: 4,
    },
  },
  {
    scheduleId: 2,
    startTime: '01:00',
    endTime: '08:00',
    count: {
      declined: 0,
      confirmed: 0,
      pending: 4,
    },
  },
];

export const RESERVATION_DETAILS_MODAL_DETAILED_TIME_MOCK_DATA: RESERVATION_DETAILS_MODAL_DETAILED_TIME_MOCK_DATA_PROPS =
  {
    cursorId: 0,
    totalCount: 0,
    reservations: [
      {
        id: 1,
        nickname: '정만철',
        userId: 0,
        teamId: 'string',
        activityId: 1,
        scheduleId: 1,
        status: 'pending',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 12,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
      {
        id: 2,
        nickname: '박경서',
        userId: 0,
        teamId: 'confirmed',
        activityId: 1,
        scheduleId: 1,
        status: 'confirmed',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 10,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
      {
        id: 3,
        nickname: '조유담',
        userId: 0,
        teamId: 'declined',
        activityId: 1,
        scheduleId: 1,
        status: 'declined',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 110,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
      {
        id: 4,
        nickname: '전수빈',
        userId: 0,
        teamId: 'declined',
        activityId: 1,
        scheduleId: 1,
        status: 'declined',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 2,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
      {
        id: 5,
        nickname: '김소은',
        userId: 0,
        teamId: 'string',
        activityId: 1,
        scheduleId: 1,
        status: 'confirmed',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 5,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
      {
        id: 6,
        nickname: 'string',
        userId: 0,
        teamId: 'string',
        activityId: 1,
        scheduleId: 2,
        status: 'pending',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 0,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
      {
        id: 7,
        nickname: 'string',
        userId: 0,
        teamId: 'string',
        activityId: 1,
        scheduleId: 2,
        status: 'confirmed',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 0,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
      {
        id: 8,
        nickname: 'string',
        userId: 0,
        teamId: 'string',
        activityId: 1,
        scheduleId: 2,
        status: 'declined',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 0,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
      {
        id: 101,
        nickname: 'string',
        userId: 0,
        teamId: 'string',
        activityId: 2,
        scheduleId: 2,
        status: 'declined',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 0,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
      {
        id: 9,
        nickname: 'string',
        userId: 0,
        teamId: 'string',
        activityId: 2,
        scheduleId: 2,
        status: 'confirmed',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 0,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
      {
        id: 10,
        nickname: 'string',
        userId: 0,
        teamId: 'string',
        activityId: 1,
        scheduleId: 1,
        status: 'confirmed',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 0,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
      {
        id: 11,
        nickname: 'string',
        userId: 0,
        teamId: 'string',
        activityId: 1,
        scheduleId: 1,
        status: 'declined',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 0,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
      {
        id: 12,
        nickname: 'string',
        userId: 0,
        teamId: 'string',
        activityId: 1,
        scheduleId: 1,
        status: 'declined',
        reviewSubmitted: true,
        totalPrice: 0,
        headCount: 0,
        date: 'string',
        startTime: 'string',
        endTime: 'string',
        createdAt: '2024-01-31T10:30:08.611Z',
        updatedAt: '2024-01-31T10:30:08.611Z',
      },
    ],
  };