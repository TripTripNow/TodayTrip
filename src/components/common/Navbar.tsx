import Link from 'next/link';
import styles from './Navbar.module.css';
import LogoTitleIcon from '#/icons/icon-logoTitle.svg';
import ProfileIcon from '#/icons/icon-profile.svg';
import AlamIcon from '#/icons/icon-alam.svg';
import { clsx } from 'clsx';
import { useState } from 'react';
import { FocusEvent } from 'react';
import AlamModal from '@/components/Navbar/AlamModal';

interface userDataProps {
  userData: {
    name: string;
  };
}

function Navbar({ userData }: userDataProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDropDownClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropDownCancel = (e: FocusEvent<HTMLDivElement>) => {
    if (e.relatedTarget?.nodeName !== 'A') {
      setIsOpen(false);
    }
  };

  const handleAlamModalClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.container} onBlur={(e) => handleDropDownCancel(e)}>
      <Link href="/">
        <LogoTitleIcon />
      </Link>
      <div></div>
      <div className={styles.wrapper}>
        {userData ? (
          <>
            <button onClick={handleAlamModalClick}>
              <AlamIcon />
            </button>
            {isModalOpen ? <AlamModal setIsModalOpen={setIsModalOpen} /> : ''}
            <div className={styles.border}></div>
            <button className={styles.userName} onClick={handleDropDownClick}>
              <ProfileIcon />
              <div>{userData.name}</div>
            </button>
            <div className={clsx(isOpen ? styles.isOpen : styles.notOpen)}>
              <Link href="/">
                <div className={styles.navDropDown}>
                  <AlamIcon />
                  <div>내 정보</div>
                </div>
              </Link>
              <Link href="/">
                <div className={styles.navDropDown}>
                  <AlamIcon />
                  <div>예약 내역</div>
                </div>
              </Link>
              <Link href="/">
                <div className={styles.navDropDown}>
                  <AlamIcon />
                  <div>내 체험 관리</div>
                </div>
              </Link>
              <Link href="/">
                <div className={styles.navDropDown}>
                  <AlamIcon />
                  <div>예약 현황</div>
                </div>
              </Link>
              <hr className={styles.styledHr} />
              <Link href="/">
                <div className={styles.navDropDown}>
                  <AlamIcon />
                  <div>로그 아웃</div>
                </div>
              </Link>
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
