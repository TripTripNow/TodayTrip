import Link from 'next/link';
import clsx from 'clsx';

import styles from './LinkButton.module.css';
import LogoIcon from '#/icons/icon-logo.svg';

function LinkButton() {
  return (
    <Link href="/mypage/activities/add">
      <div id="container" className={styles.container}>
        <button className={`${styles.learnMore} ${styles.button}`}>
          <span className={styles.circle} aria-hidden="true">
            <span className={clsx(styles.icon, styles.arrow)}>
              <LogoIcon alt="비행기" width={30} height={30} />
            </span>
          </span>
          <span className={styles.buttonText}>체험 등록하기</span>
        </button>
      </div>
    </Link>
  );
}

export default LinkButton;
