import { ReactNode } from 'react';
import styles from './MyPageLayout.module.css';
import ProfileMenuBox from '@/components/MyPage/ProfileMenuBox';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

interface MyPageLayoutProps {
  children: ReactNode;
}

function MyPageLayout({ children }: MyPageLayoutProps) {
  const methods = useForm();
  const router = useRouter();

  return (
    <div className={styles.layoutContainer}>
      {router.pathname === '/mypage' ? (
        <FormProvider {...methods}>
          <ProfileMenuBox />
          <div className={styles.contentContainer}>{children}</div>
        </FormProvider>
      ) : (
        <>
          <ProfileMenuBox />
          <div className={styles.contentContainer}>{children}</div>
        </>
      )}
    </div>
  );
}

export default MyPageLayout;
