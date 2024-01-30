import { PropsWithChildren, ReactNode } from 'react';
import styles from './UserLayout.module.css';
import Link from 'next/link';
import LogoIcon from '#/icons/icon-logo.svg';
import SocialLogin from '@/components/User/SocialLogin';

interface UserLayoutProps {
  children: ReactNode;
  memberStatus: string;
  link: string;
  linkTitle: string;
}

function UserLayout({ children, memberStatus, link, linkTitle }: PropsWithChildren<UserLayoutProps>) {
  return (
    <div className={styles.layoutContainer}>
      <Link href="/" className={styles.topContainer}>
        <LogoIcon alt="로고 아이콘" className={styles.logoImg} />
        <div className={styles.title}>TodayTrip</div>{' '}
      </Link>

      {children}

      <div className={styles.memberStatusContainer}>
        <div>{memberStatus}</div>

        <Link href={link}>
          <span className={styles.linkTitle}>{linkTitle}</span>
        </Link>
      </div>

      <SocialLogin />
    </div>
  );
}

export default UserLayout;
