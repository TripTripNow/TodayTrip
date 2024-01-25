import Link from 'next/link';
import styles from './ProfileDropDown.module.css';
import AlarmIcon from '#/icons/icon-alarm.svg';

function ProfileDropDown() {
  const dropDownArr = [
    { link: '/mypage', title: '내 정보' },
    { link: '/mypage/reservations', title: '예약 내역' },
    { link: '/mypage/activities', title: '내 체험 관리' },
    { link: '/mypage/activities/dashboard', title: '예약 현황' },
  ];
  return (
    <div className={styles.profileDropDownContainer}>
      {dropDownArr.map((item, index) => (
        <>
          <div className={styles.profileDropDownContent} key={index}>
            <Link href={item.link}>
              <div className={styles.profileDropDown}>
                <AlarmIcon />
                <div>{item.title}</div>
              </div>
            </Link>
          </div>
        </>
      ))}
      <hr className={styles.styledHr} />
      <div className={styles.profileDropDownContent}>
        <Link href="/">
          <div className={styles.profileDropDown}>
            <AlarmIcon />
            <div>로그 아웃</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProfileDropDown;
