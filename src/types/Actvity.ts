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
