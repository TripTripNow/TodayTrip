type SubImageUrl = {
  id: number;
  imageUrl: string;
};

export type Activity = {
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
};

type Review = {
  id: number;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
  activityId: number;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};

export type ReturnReview = {
  reviews: Review[];
  totalCount: number;
};
