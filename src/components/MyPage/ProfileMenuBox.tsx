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
    icon: <MypageIcon fill="#A1A1A1" alt="내 정보 페이지를 나타내는 아이콘" />,
    activeIcon: <MypageIcon fill="#112211" alt="내 정보 페이지 호버 시 보이는 아이콘" />,
    link: '/mypage',
  },
  {
    title: '예약 내역',
    icon: <ReservationIcon fill="#A1A1A1" alt="예약 내역 페이지를 나타내는 아이콘" />,
    activeIcon: <ReservationIcon fill="#112211" alt="예약 내역 페이지 호버 시 보이는 아이콘" />,
    link: '/mypage/reservations',
  },
  {
    title: '내 체험 관리',
    icon: <ActivitiesIcon fill="#A1A1A1" alt="내 체험 관리 페이지를 나타내는 아이콘" />,
    activeIcon: <ActivitiesIcon fill="#112211" alt="내 체험 관리 페이지 호버 시 보이는 아이콘" />,
    link: '/mypage/activities',
  },
  {
    title: '예약 현황',
    icon: <DashboardIcon fill="#A1A1A1" stroke="#A1A1A1" alt="예액 현황 페이지를 나타내는 아이콘" />,
    activeIcon: <DashboardIcon fill="#112211" stroke="#112211" alt="예약 현황 페이지 호버 시 보이는 아이콘" />,
    link: '/mypage/activities/dashboard',
  },
];

function ProfileMenuBox() {
  const router = useRouter();
  const { pathname } = router;
  const [selectedMenu, setSelectedMenu] = useState<string>();

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
              {e.title === selectedMenu ? e.activeIcon : e.icon}
              <div className={styles.menuItemTitle}>{e.title === '예약 내역' ? renderTitle(e.title) : e.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileMenuBox;
