export interface Activities {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetActivitiesParam {
  method: 'offset' | 'cursor';
  cursorId?: number | null | undefined;
  category?: string;
  keyword?: string;
  sort: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
  page?: number;
  size?: number;
}

export interface GetActivitiesRes {
  activities: Activities[];
  totalCount: number;
  cursorId?: number | null;
}
