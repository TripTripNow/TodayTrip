import Link from 'next/link';
import styles from './Navbar.module.css';
import LogoTitleIcon from '#/icons/icon-logoTitle.svg';
import ProfileIcon from '#/icons/icon-profile.svg';
import AlarmIcon from '#/icons/icon-alarm.svg';
import RedEllipse from '#/icons/icon-redEllipse.svg';
import { useState } from 'react';
import AlarmModal from '@/components/Navbar/AlarmModal';
import ProfileDropDown from '@/components/Navbar/ProfileDropDown';

function Navbar() {
  const userData = { name: '종민박' };
  const count = 6;
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDropDownClick = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const handleBlurDropDown = () => {
    setTimeout(() => {
      setIsDropDownOpen(false);
    }, 100);
  };

  const handleAlarmModalClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <LogoTitleIcon />
      </Link>
      <div></div>
      <div className={styles.wrapper}>
        {userData ? (
          <>
            <button onClick={handleAlarmModalClick} className={styles.alarmButton}>
              {' '}
              <AlarmIcon /> {count ? <RedEllipse className={styles.isEllipse} /> : ''}
            </button>
            {isModalOpen ? <AlarmModal setIsModalOpen={setIsModalOpen} /> : ''}
            <div className={styles.border}></div>
            <div onBlur={handleBlurDropDown}>
              <button className={styles.userName} onClick={handleDropDownClick}>
                <ProfileIcon />
                <div>{userData.name}</div>
              </button>
            </div>
            <div>{isDropDownOpen ? <ProfileDropDown /> : ''}</div>
          </>
        ) : (
          <>
            <Link href="/signin">
              <div className={styles.loginContent}>로그인</div>
            </Link>
            <Link href="/signup">
              <div className={styles.loginContent}>회원가입</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
