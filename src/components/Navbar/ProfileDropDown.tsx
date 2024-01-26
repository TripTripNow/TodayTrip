import Link from 'next/link';
import styles from './ProfileDropDown.module.css';
import { useEffect } from 'react';

const DropDown_ARR = [
  { link: '/mypage', title: '내 정보' },
  { link: '/mypage/reservations', title: '예약 내역' },
  { link: '/mypage/activities', title: '내 체험 관리' },
  { link: '/mypage/activities/dashboard', title: '예약 현황' },
];

interface ProfileDropDownProps {
  isOpen: boolean;
}

function ProfileDropDown({ isOpen }: ProfileDropDownProps) {
  useEffect(() => {
    console.log(isOpen), [isOpen];
  });
  return (
    <div className={isOpen ? styles.profileDropDownContainer : styles.profileDropDownCloseContainer}>
      {DropDown_ARR.map((item, index) => (
        <div className={styles.profileDropDownContent} key={index}>
          <Link href={item.link}>
            <p className={styles.profileDropDown}>{item.title}</p>
          </Link>
        </div>
      ))}
      <hr className={styles.styledHr} />
      <div className={styles.profileDropDownContent}>
        <Link href="/">
          <p className={styles.profileDropDown}>로그아웃</p>
        </Link>
      </div>
    </div>
  );
}

export default ProfileDropDown;
