export interface GetNotificationsRes {
  cursorId: number;
  notifications: Notifications[];
  totalCount: number;
}
export interface Notifications {
  id: number;
  content: string;
  createdAt: string;
}
