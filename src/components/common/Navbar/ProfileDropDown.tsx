import Link from 'next/link';
import styles from './ProfileDropDown.module.css';
import { signOut } from 'next-auth/react';

const DropDown_ARR = [
  { link: '/mypage', title: '내 정보' },
  { link: '/mypage/reservations', title: '예약 내역' },
  { link: '/mypage/activities', title: '내 체험 관리' },
  { link: '/mypage/activities/reservation-dashboard', title: '예약 현황' },
];

interface ProfileDropDownProps {
  isOpen: boolean;
}

function ProfileDropDown({ isOpen }: ProfileDropDownProps) {
  const handleLogout = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <div className={isOpen ? styles.profileDropDownContainer : styles.profileDropDownCloseContainer}>
      {DropDown_ARR.map((item, index) => (
        <div className={styles.profileDropDownContent} key={index}>
          <Link href={item.link} className={styles.profileDropDown}>
            {item.title}
          </Link>
        </div>
      ))}
      <hr className={styles.styledHr} />
      <div className={styles.profileDropDownContent}>
        <div className={styles.profileDropDown} onClick={() => handleLogout()}>
          로그아웃
        </div>
      </div>
    </div>
  );
}

export default ProfileDropDown;
