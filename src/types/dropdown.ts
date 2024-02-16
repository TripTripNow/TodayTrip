import { PRICE_LIST, RESERVE_LIST } from '@/constants/dropdown';

export type PriceSortOption = (typeof PRICE_LIST)[number];
export type ReserveSortOption = (typeof RESERVE_LIST)[number];

export type PriceFilterOption = PriceSortOption | '가격';
export type ReserveFilterOption = ReserveSortOption | '예약 상태';
