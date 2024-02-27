import Image from 'next/image';
import styles from './SocialLogin.module.css';
import KaKaoImg from '#/images/img-kakao.png';
import NaverImg from '#/images/img-naver.png';
import GoogleImg from '#/images/img-google.png';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

function SocialLogin() {
  const handleSocialLogin = async (type: 'kakao' | 'naver' | 'google') => {
    const promise = signIn(type, {
      redirect: false,
      callbackUrl: '/',
    });
    toast.promise(promise, {
      loading: '잠시만 기다려주세요.',
      success: <b>로그인 중입니다.</b>,
      error: <b>로그인이 실패하였습니다.</b>,
    });
    await promise;
  };
  return (
    <div className={styles.socialLoginBtnContainer}>
      <Image
        src={KaKaoImg}
        alt="카카오 로그인 아이콘"
        className={styles.img}
        onClick={() => handleSocialLogin('kakao')}
      />
      <Image
        src={NaverImg}
        alt="네이버 로그인 아이콘"
        className={styles.img}
        onClick={() => handleSocialLogin('naver')}
      />
      <Image
        src={GoogleImg}
        alt="구글 로그인 아이콘"
        className={styles.img}
        onClick={() => handleSocialLogin('google')}
      />
    </div>
  );
}

export default SocialLogin;
