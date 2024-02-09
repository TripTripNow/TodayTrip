import Link from 'next/link';

import styles from './StyledButton.module.css';

function StyledButton() {
  return (
    <Link
      href="/mypage/activities/add"
      title="Button push blue/green"
      className={`${styles.button} ${styles.btnPush} ${styles.btnBlueGreen}`}
    >
      체험 등록하기
    </Link>
  );
}

export default StyledButton;
