interface SubImageUrl {
  id: number;
  imageUrl: string;
}

interface ActivityProps {
  data: {
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
}

function Activity({ data }: ActivityProps) {
  // 함수 내용
}

export default Activity;
