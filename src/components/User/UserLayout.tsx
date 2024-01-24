import { PropsWithChildren, ReactNode } from 'react';
import styles from './UserLayout.module.css';
import Link from 'next/link';
import LogoIcon from '#/images/img-logo.png';
import Image from 'next/image';

interface UserLayoutProps {
  children: ReactNode;
  memberStatus: string;
  link: string;
  linkTitle: string;
}

function UserLayout({ children, memberStatus, link, linkTitle }: PropsWithChildren<UserLayoutProps>) {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.topContainer}>
        <Link href="/">
          <Image src={LogoIcon} alt="로고이미지" className={styles.logoImg} />
        </Link>
        <div className={styles.title}>TodayTrip</div>
      </div>

      {children}

      <div className={styles.memberStatusContainer}>
        <div>{memberStatus}</div>

        <Link href={link}>
          <span className={styles.linkTitle}>{linkTitle}</span>
        </Link>
      </div>
    </div>
  );
}

export default UserLayout;
