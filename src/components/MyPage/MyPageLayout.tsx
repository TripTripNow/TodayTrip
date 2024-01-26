import { ReactNode } from 'react';
import styles from './MyPageLayout.module.css';
import ProfileMenuBox from '@/components/MyPage/ProfileMenuBox';
import { FormProvider, useForm } from 'react-hook-form';

interface MyPageLayoutProps {
  children: ReactNode;
}

function MyPageLayout({ children }: MyPageLayoutProps) {
  const methods = useForm();

  return (
    <div className={styles.layoutContainer}>
      <FormProvider {...methods}>
        <ProfileMenuBox />
        <div className={styles.contentContainer}>{children}</div>
      </FormProvider>
    </div>
  );
}

export default MyPageLayout;
