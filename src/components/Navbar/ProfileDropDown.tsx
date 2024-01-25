import Link from 'next/link';
import styles from './ProfileDropDown.module.css';
import AlarmIcon from '#/icons/icon-alarm.svg';

const DropDown_ARR = [
  { link: '/mypage', title: '내 정보' },
  { link: '/mypage/reservations', title: '예약 내역' },
  { link: '/mypage/activities', title: '내 체험 관리' },
  { link: '/mypage/activities/dashboard', title: '예약 현황' },
];

function ProfileDropDown() {
  return (
    <div className={styles.profileDropDownContainer}>
      {DropDown_ARR.map((item, index) => (
        <div className={styles.profileDropDownContent} key={index}>
          <Link href={item.link}>
            <div className={styles.profileDropDown}>
              <AlarmIcon />
              <p>{item.title}</p>
            </div>
          </Link>
        </div>
      ))}
      <hr className={styles.styledHr} />
      <div className={styles.profileDropDownContent}>
        <Link href="/">
          <div className={styles.profileDropDown}>
            <AlarmIcon />
            <p>로그아웃</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProfileDropDown;
