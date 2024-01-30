import Link from 'next/link';
import styles from './ProfileDropDown.module.css';

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
        <Link href="/" className={styles.profileDropDown}>
          로그아웃
        </Link>
      </div>
    </div>
  );
}

export default ProfileDropDown;
