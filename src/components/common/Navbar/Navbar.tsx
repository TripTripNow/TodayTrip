import Link from 'next/link';
import styles from './Navbar.module.css';
import LogoIcon from '#/icons/icon-logo.svg';
import AlarmIcon from '#/icons/icon-alarm.svg';
import RedEllipse from '#/icons/icon-redEllipse.svg';
import { useEffect, useState } from 'react';
import AlarmModal from '@/components/common/Navbar/AlarmModal';
import ProfileDropDown from '@/components/common/Navbar/ProfileDropDown';
import LogoImg from '#/images/img-logo.png';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import { getMyNotifications } from '@/api/myNotifications';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';

const alarmData = {
  notifications: [
    {
      id: 0,
      content: '함께하면 즐거운 댄스(2023-01-14 15:00:~18:00) 예약이 거절되었어요.',
      status: 'declined',
      createdAt: '2024-01-26T06:23:36.209Z',
    },
    {
      id: 1,
      content: '함께하면 슬픈 댄스(2023-01-15 15:00:~18:00) 예약이 승인되었어요.',
      status: 'approve',
      createdAt: '2024-01-26T06:23:36.209Z',
    },
    {
      id: 2,
      content: '함께하는 종민 댄스(2023-01-16 15:00:~18:00) 예약이 거절되었어요.',
      status: 'declined',
      createdAt: '2024-01-26T06:23:36.209Z',
    },
  ],
  totalCount: 3,
};

function Navbar() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: userData } = useSession();

  const handleDropDownClick = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setTimeout(() => {
        setIsDropDownOpen((prev) => !prev);
      }, 250);
    } else {
      setIsDropDownOpen((prev) => !prev);
    }
  };

  const handleBlurDropDown = () => {
    if (isOpen) {
      setIsOpen(false);
    }
    setTimeout(() => {
      setIsDropDownOpen(false);
    }, 250);
  };

  const handleAlarmModalClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <div className={styles.logoWrapper}>
          <div className={styles.logoImg}>
            <LogoIcon alt="로고 아이콘" />
          </div>
          <p className={styles.logoTitle}>TodayTrip</p>
        </div>
      </Link>
      <div></div>
      <div className={styles.wrapper}>
        {userData ? (
          <>
            <button onClick={handleAlarmModalClick} className={styles.alarmButton}>
              <AlarmIcon alt="알람 아이콘" className={styles.alarmIcon} />
              {alarmData.totalCount ? (
                <RedEllipse alt="알람이 존재함을 알려주는 아이콘" className={styles.isEllipse} />
              ) : (
                ''
              )}
            </button>
            {isModalOpen && <AlarmModal setIsModalOpen={setIsModalOpen} />}
            <div className={styles.border}></div>
            <div onBlur={handleBlurDropDown}>
              <button className={styles.userName} onClick={handleDropDownClick}>
                <Image
                  className={styles.userProfile}
                  src={userData.user.image || LogoImg}
                  alt="프로필 이미지"
                  width={32}
                  height={32}
                />
                <p>{userData.user.name}</p>
              </button>
            </div>
            <div>{isDropDownOpen && <ProfileDropDown isOpen={isOpen} />}</div>
          </>
        ) : (
          <>
            <Link className={styles.loginContent} href="/signin">
              로그인
            </Link>
            <Link className={styles.loginContent} href="/signup">
              회원가입
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
