import Link from 'next/link';
import styles from './Navbar.module.css';
import LogoTitle from '#/icons/icon-logoTitle.svg';
import Profile from '#/icons/icon-profile.svg';
import Alam from '#/icons/icon-alam.svg';
import { clsx } from 'clsx';
import { useState } from 'react';

interface userDataProps {
  userData: {
    name: string;
  };
}

function Navbar({ userData }: userDataProps) {
  const [isOpen] = useState(true);
  return (
    <div className={styles.container}>
      <Link href="/">
        <LogoTitle />
      </Link>
      <div></div>
      <div className={styles.wrapper}>
        {userData ? (
          <>
            <Alam />
            <div className={styles.border}></div>
            <button className={styles.userName}>
              <Profile />
              <div>{userData.name}</div>
            </button>
            <div className={clsx(isOpen ? styles.isOpen : styles.notOpen)}>
              <div className={styles.navDropDown}>
                <div>img</div>
                <div>내 정보</div>
              </div>
              <div className={styles.navDropDown}>
                <div>img</div>
                <div>예약 내역</div>
              </div>
              <div className={styles.navDropDown}>
                <div>img</div>
                <div>내 체험 관리</div>
              </div>
              <div className={styles.navDropDown}>
                <div>img</div>
                <div>예약 현황</div>
              </div>
              <div className={styles.navDropDown}>
                <div>img</div>
                <div>로그 아웃</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link href="/signin">
              <div>로그인</div>
            </Link>
            <Link href="/signup">
              <div>회원가입</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
