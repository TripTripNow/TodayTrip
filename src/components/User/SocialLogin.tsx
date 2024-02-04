import Image from 'next/image';
import styles from './SocialLogin.module.css';
import KaKaoImg from '#/images/img-kakao.png';
import NaverImg from '#/images/img-naver.png';
import GoogleImg from '#/images/img-google.png';

//TODO api 연결 시 소셜로그인 연결
function SocialLogin() {
  return (
    <div className={styles.socialLoginBtnContainer}>
      <Image src={KaKaoImg} alt="카카오아이콘" className={styles.img} priority />
      <Image src={NaverImg} alt="네이버아이콘" className={styles.img} />
      <Image src={GoogleImg} alt="구글아이콘" className={styles.img} />
    </div>
  );
}

export default SocialLogin;
