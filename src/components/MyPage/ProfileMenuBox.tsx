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
import LogoImg from '#/images/img-kakao.png';
import Image from 'next/image';
import EditIcon from '#/icons/icon-edit.svg';

const MENU_LIST = [
  {
    title: '내 정보',
    src: <MypageIcon />,
    activeSrc: <MypageActiveIcon />,
  },
  {
    title: '예약 내역',
    src: <ReservationIcon />,
    activeSrc: <ReservationActiveIcon />,
  },
  {
    title: '내 체험 관리',
    src: <ActivitiesIcon />,
    activeSrc: <ActivitiesActiveIcon />,
  },
  {
    title: '예약 현황',
    src: <DashboardIcon />,
    activeSrc: <DashboardActiveIcon />,
  },
];

function ProfileMenuBox() {
  const [isSelected, setIsSelected] = useState('내 정보');

  const handleMenuItem = (item: string) => {
    setIsSelected(item);
  };

  return (
    <div className={styles.profileBoxContainer}>
      <div className={styles.profileContainer}>
        <Image src={LogoImg} className={styles.profileImg} alt="profileImg" />
        {isSelected === '내 정보' && <EditIcon className={styles.editIcon} />}
      </div>
      <div className={styles.memuContainer}>
        {MENU_LIST.map((e, index) => {
          return (
            <div
              className={`${styles.menuItem} ${e.title === isSelected && styles.active}`}
              key={index}
              onClick={() => handleMenuItem(e.title)}
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
