import { useState } from 'react';
import styles from './ProfileMenuBox.module.css';
import MypageIcon from '#/icons/icon-mypage.svg';
import ReservationIcon from '#/icons/icon-reservation.svg';
import ActivitiesIcon from '#/icons/icon-activities.svg';
import DashboardIcon from '#/icons/icon-dashboard.svg';
import MypageActiveIcon from '#/icons/icon-mypage-active.svg';
import ReservationActiveIcon from '#/icons/icon-reservation-active.svg';
import ActivitiesActiveIcon from '#/icons/icon-activities-active.svg';
import DashboardActiveIcon from '#/icons/icon-dashboard-active.svg';
import { useRouter } from 'next/router';
import ProfileInput from '@/components/MyPage/ProfileInput';

const MENU_LIST = [
  {
    title: '내 정보',
    src: <MypageIcon />,
    activeSrc: <MypageActiveIcon />,
    link: '/mypage',
  },
  {
    title: '예약 내역',
    src: <ReservationIcon />,
    activeSrc: <ReservationActiveIcon />,
    link: '/mypage/reservations',
  },
  {
    title: '내 체험 관리',
    src: <ActivitiesIcon />,
    activeSrc: <ActivitiesActiveIcon />,
    link: '/mypage/activities',
  },
  {
    title: '예약 현황',
    src: <DashboardIcon />,
    activeSrc: <DashboardActiveIcon />,
    link: '/mypage/activities/dashboard',
  },
];

function ProfileMenuBox() {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(MENU_LIST.find((e) => e.link === router.pathname)?.title);

  const handleMenuItem = (item: { title: string; link: string }) => {
    setIsSelected(item.title);
    router.push(item.link);
  };

  return (
    <div className={styles.profileBoxContainer}>
      <ProfileInput isProfileBox={true} isEdit={router.pathname === '/mypage'} />
      <div className={styles.memuContainer}>
        {MENU_LIST.map((e, index) => {
          return (
            <div
              className={`${styles.menuItem} ${e.title === isSelected && styles.active}`}
              key={index}
              onClick={() => handleMenuItem(e)}
            >
              {e.title === isSelected ? e.activeSrc : e.src}
              <div className={styles.menuItemTitle}>{e.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileMenuBox;
