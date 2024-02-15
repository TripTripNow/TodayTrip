import { PropsWithChildren, ReactNode, useEffect } from 'react';
import styles from './UserLayout.module.css';
import Link from 'next/link';
import LogoIcon from '#/icons/icon-logo.svg';
import SocialLogin from '@/components/User/SocialLogin';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

interface UserLayoutProps {
  children: ReactNode;
  memberStatus: string;
  link: string;
  linkTitle: string;
}

function UserLayout({ children, memberStatus, link, linkTitle }: PropsWithChildren<UserLayoutProps>) {
  const router = useRouter();

  useEffect(() => {
    if (router.query.error === 'AccessDenied') toast.error('로그인이 실패하였습니다.');
  }, [router]);

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
