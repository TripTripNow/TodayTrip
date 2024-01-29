export type PriceSortOption = (typeof PRICE_LIST)[number];
export type ReserveSortOption = (typeof RESERVE_LIST)[number];
export const PRICE_LIST = ['낮은 순', '높은 순'] as const;
export const RESERVE_LIST = ['전체', '예약 신청', '예약 취소', '예약 승인', '예약 거절', '체험 완료'] as const;
