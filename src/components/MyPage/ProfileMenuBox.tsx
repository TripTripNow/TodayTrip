import { useEffect, useState } from 'react';
import styles from './ProfileMenuBox.module.css';
import MypageIcon from '#/icons/icon-mypage.svg';
import ReservationIcon from '#/icons/icon-reservation.svg';
import ActivitiesIcon from '#/icons/icon-activities.svg';
import DashboardIcon from '#/icons/icon-dashboard.svg';
import ActivityAddIcon from '#/icons/icon-activity-add.svg';
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
    title: '내 체험 등록',
    icon: <ActivityAddIcon fill="#A1A1A1" alt="내 체험 관리 페이지를 나타내는 아이콘" />,
    activeIcon: <ActivityAddIcon fill="#112211" alt="내 체험 관리 페이지 호버 시 보이는 아이콘" />,
    link: '/mypage/activities/add',
  },
  {
    title: '예약 현황',
    icon: <DashboardIcon fill="#A1A1A1" stroke="#A1A1A1" alt="예액 현황 페이지를 나타내는 아이콘" />,
    activeIcon: <DashboardIcon fill="#112211" stroke="#112211" alt="예약 현황 페이지 호버 시 보이는 아이콘" />,
    link: '/mypage/activities/reservation-dashboard',
  },
];

const renderTitle = (pathname: string, title: string) => {
  if (pathname === '/mypage/activities/[id]/edit' && title === '내 체험 관리') {
    return (
      <>
        <div className={styles.title}>{title}</div>
        <span className={styles.subTitle}>&nbsp;- 내 체험 수정</span>
      </>
    );
  }

  if (pathname === '/mypage/reservations/[id]' && title === '예약 내역') {
    return (
      <>
        <div className={styles.title}>{title}</div>
        <span className={styles.subTitle}>&nbsp;- 예약 상세</span>
      </>
    );
  }

  return title;
};

function ProfileMenuBox() {
  const router = useRouter();
  const { pathname } = router;
  const [selectedMenu, setSelectedMenu] = useState<string>();

  useEffect(() => {
    if (pathname === '/mypage/reservations/[id]') {
      setSelectedMenu('예약 내역');
      return;
    }
    if (pathname === '/mypage/activities/[id]/edit') {
      setSelectedMenu('내 체험 관리');
      return;
    }
    setSelectedMenu(MENU_LIST.find((e) => e.link === pathname)?.title);
  }, [pathname]);

  const handleMenuItem = (item: { title: string; link: string }) => {
    setSelectedMenu(item.title);
    router.push(item.link);
  };

  return (
    <div className={styles.profileBoxContainer}>
      <ProfileInput isProfileBox={true} isEdit={router.pathname === '/mypage'} />

      <div className={styles.memuContainer}>
        {MENU_LIST.map((menuItem, index) => {
          return (
            <div
              className={`${styles.menuItem} ${menuItem.title === selectedMenu && styles.active}`}
              key={index}
              onClick={() => handleMenuItem(menuItem)}
            >
              {menuItem.title === selectedMenu ? menuItem.activeIcon : menuItem.icon}
              <div className={styles.menuItemTitle}>
                {menuItem.title === '예약 내역' || menuItem.title === '내 체험 관리'
                  ? renderTitle(pathname, menuItem.title)
                  : menuItem.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileMenuBox;
