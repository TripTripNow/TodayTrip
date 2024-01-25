import Link from 'next/link';
import styles from './Navbar.module.css';
import LogoIcon from '#/icons/icon-logo.svg';
import ProfileIcon from '#/icons/icon-profile.svg';
import AlarmIcon from '#/icons/icon-alarm.svg';
import RedEllipse from '#/icons/icon-redEllipse.svg';
import { useState } from 'react';
import AlarmModal from '@/components/Navbar/AlarmModal';
import ProfileDropDown from '@/components/Navbar/ProfileDropDown';

const USER_DATA = { name: '종민박' };
const COUNT = 6;

function Navbar() {
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
        <div className={styles.logoWrapper}>
          <div className={styles.logoImg}>
            <LogoIcon />
          </div>
          <p className={styles.logoTitle}>TodayTrip</p>
        </div>
      </Link>
      <div></div>
      <div className={styles.wrapper}>
        {USER_DATA ? (
          <>
            <button onClick={handleAlarmModalClick} className={styles.alarmButton}>
              <AlarmIcon className={styles.alarmIcon} /> {COUNT && <RedEllipse className={styles.isEllipse} />}
            </button>
            {isModalOpen ? <AlarmModal setIsModalOpen={setIsModalOpen} /> : ''}
            <div className={styles.border}></div>
            <div onBlur={handleBlurDropDown}>
              <button className={styles.userName} onClick={handleDropDownClick}>
                <ProfileIcon />
                <p>{USER_DATA.name}</p>
              </button>
            </div>
            <div>{isDropDownOpen && <ProfileDropDown />}</div>
          </>
        ) : (
          <>
            <Link href="/signin">
              <p className={styles.loginContent}>로그인</p>
            </Link>
            <Link href="/signup">
              <p className={styles.loginContent}>회원가입</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
