import { useEffect, useState } from 'react';
import styles from './ProfileMenuBox.module.css';
import MypageIcon from '#/icons/icon-mypage.svg';
import ReservationIcon from '#/icons/icon-reservation.svg';
import ActivitiesIcon from '#/icons/icon-activities.svg';
import DashboardIcon from '#/icons/icon-dashboard.svg';
import { useRouter } from 'next/router';
import ProfileInput from '@/components/MyPage/ProfileInput';

const MENU_LIST = [
  {
    title: '내 정보',
    src: <MypageIcon fill="#A1A1A1" />,
    activeSrc: <MypageIcon fill="#112211" />,
    link: '/mypage',
  },
  {
    title: '예약 내역',
    src: <ReservationIcon fill="#A1A1A1" />,
    activeSrc: <ReservationIcon fill="#112211" />,
    link: '/mypage/reservations',
  },
  {
    title: '내 체험 관리',
    src: <ActivitiesIcon fill="#A1A1A1" />,
    activeSrc: <ActivitiesIcon fill="#112211" />,
    link: '/mypage/activities',
  },
  {
    title: '예약 현황',
    src: <DashboardIcon fill="#A1A1A1" stroke="#A1A1A1" />,
    activeSrc: <DashboardIcon fill="#112211" stroke="#112211" />,
    link: '/mypage/activities/reservation-dashboard',
  },
];

function ProfileMenuBox() {
  const router = useRouter();
  const { pathname } = router;
  const [selectedMenu, setSelectedMenu] = useState(
    pathname === '/mypage/reservations/[id]' ? '예약 내역' : MENU_LIST.find((e) => e.link === pathname)?.title,
  );

  useEffect(() => {
    setSelectedMenu(
      pathname === '/mypage/reservations/[id]' ? '예약 내역' : MENU_LIST.find((e) => e.link === pathname)?.title,
    );
  }, [pathname]);

  const handleMenuItem = (item: { title: string; link: string }) => {
    setSelectedMenu(item.title);
    router.push(item.link);
  };

  const renderTitle = (title: string) => {
    if (router.pathname !== '/mypage/reservations/[id]') return title;

    return (
      <>
        <div className={styles.title}>{title}</div>
        <span className={styles.subTitle}>&nbsp;- 예약 상세</span>
      </>
    );
  };

  return (
    <div className={styles.profileBoxContainer}>
      <ProfileInput isProfileBox={true} isEdit={router.pathname === '/mypage'} />
      <div className={styles.memuContainer}>
        {MENU_LIST.map((e, index) => {
          return (
            <div
              className={`${styles.menuItem} ${e.title === selectedMenu && styles.active}`}
              key={index}
              onClick={() => handleMenuItem(e)}
            >
              {e.title === selectedMenu ? e.activeSrc : e.src}
              <div className={styles.menuItemTitle}>{e.title === '예약 내역' ? renderTitle(e.title) : e.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileMenuBox;
