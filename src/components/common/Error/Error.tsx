import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '@/components/common/Button/Button';
import NotFoundImage from '#/images/img-logo.png';
import styles from './Error.module.css';

interface ErrorPageProps {
  errorStatus: number;
}

function ErrorPage({ errorStatus }: ErrorPageProps) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <p className={styles.text}>ERROR</p>
      <h1 className={styles.mainTitle}>{errorStatus}</h1>
      <p className={styles.text}>{`이륙에 실패하였습니다.`}</p>

      <div className={styles.buttonWrapper}>
        <Button color="lightgreen" type="reservation" onClick={() => router.back()}>
          뒤로 가기
        </Button>
      </div>

      <div className={styles.movingImage}>
        <Image src={NotFoundImage} alt="비행기" width={100} height={100} className={styles.src} />
      </div>
    </div>
  );
}

export default ErrorPage;
