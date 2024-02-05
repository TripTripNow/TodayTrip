import Image from 'next/image';
import styles from './SocialLogin.module.css';
import KaKaoImg from '#/images/img-kakao.png';
import NaverImg from '#/images/img-naver.png';
import GoogleImg from '#/images/img-google.png';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

function SocialLogin() {
  const handleSocialLogin = async (type: 'kakao' | 'naver' | 'google') => {
    await signIn(type, {
      redirect: false,
      callbackUrl: '/',
    });
    toast.success('로그인이 완료되었습니다.');
  };
  return (
    <div className={styles.socialLoginBtnContainer}>
      <Image src={KaKaoImg} alt="카카오아이콘" className={styles.img} onClick={() => handleSocialLogin('kakao')} />
      <Image src={NaverImg} alt="네이버아이콘" className={styles.img} onClick={() => handleSocialLogin('naver')} />
      <Image src={GoogleImg} alt="구글아이콘" className={styles.img} onClick={() => handleSocialLogin('google')} />
    </div>
  );
}

export default SocialLogin;
