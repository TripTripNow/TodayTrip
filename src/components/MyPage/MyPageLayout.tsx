import { ReactNode } from 'react';
import styles from './MyPageLayout.module.css';
import ProfileMenuBox from '@/components/MyPage/ProfileMenuBox';

interface MyPageLayoutProps {
  children: ReactNode;
}

function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className={styles.layoutContainer}>
      <ProfileMenuBox />
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
}

export default MyPageLayout;
