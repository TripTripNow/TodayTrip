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
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyNotifications } from '@/api/myNotifications';
import QUERY_KEYS from '@/constants/queryKeys';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { Notifications } from '@/types/myNotifications';

function Navbar() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: userData } = useSession();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.myNotifications],
    queryFn: ({ pageParam }) => getMyNotifications(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId;
    },
    enabled: !!userData,
  });

  const { isVisible, targetRef, setRerender } = useInfiniteScroll();

  const alarmData: Notifications[] = data?.pages.flatMap((page) => page.notifications) || [];
  const totalCount = data?.pages[0].totalCount || 0;

  const handleDropDownClick = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setTimeout(() => {
        setIsDropDownOpen((prev) => !prev);
      }, 300);
    } else {
      setIsDropDownOpen((prev) => !prev);
    }
  };

  const handleBlurDropDown = () => {
    setTimeout(() => {
      setIsDropDownOpen(false);
    }, 300);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleAlarmModalClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isVisible && userData) {
      fetchNextPage();
    }
  }, [isVisible, userData]);

  useEffect(() => {
    setRerender((prev) => !prev);
  }, [isModalOpen]);

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
        {userData !== undefined && (
          <>
            {userData ? (
              <>
                <button onClick={handleAlarmModalClick} className={styles.alarmButton} aria-label="알림 버튼">
                  <AlarmIcon alt="알람 아이콘" className={styles.alarmIcon} />
                  {totalCount > 0 && <RedEllipse alt="알람이 존재함을 알려주는 아이콘" className={styles.isEllipse} />}
                </button>
                {isModalOpen && (
                  <AlarmModal
                    setIsModalOpen={setIsModalOpen}
                    targetRef={targetRef}
                    totalCount={totalCount}
                    alarmData={alarmData}
                  />
                )}
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
                {isDropDownOpen && <ProfileDropDown isOpen={isOpen} />}
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
          </>
        )}
        <div>{!isModalOpen && <div ref={targetRef}></div>}</div>
      </div>
    </div>
  );
}

export default Navbar;
