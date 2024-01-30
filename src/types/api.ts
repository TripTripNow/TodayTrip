export interface CardItem {
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
