import Image from 'next/image';
import styles from './SocialLogin.module.css';
import KaKaoImg from '#/images/img-kakao.png';
import NaverImg from '#/images/img-naver.png';
import GoogleImg from '#/images/img-google.png';
import { signIn, useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { postSignup } from '@/api/user/user';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

//TODO api 연결 시 소셜로그인 연결
function SocialLogin() {
  // const data = useSession();

  // const { isSuccess, isError, error } = useQuery({
  //   queryKey: ['socialLogin', data],
  //   queryFn: () =>
  //     postSignup({
  //       email: data.data?.user.accessToken.accessToken + '@kakao.com',
  //       password: data.data?.user.accessToken.sub,
  //       nickname: data.data?.user.name || '',
  //     }),
  //   enabled: data.status === 'authenticated' && data.data !== null,
  // });

  const handleSocialLogin = (type: 'kakao') => {
    signIn(type);
  };

  // if (isSuccess) {
  //   console.log('success');
  // }

  // const hanldeSignin = async () => {
  //   const res = await signIn('signin-credentials', {
  //     email: data.data?.user.accessToken.accessToken + '@kakao.com',
  //     password: data.data?.user.accessToken.sub,
  //     redirect: false,
  //   });
  //   if (res?.ok) {
  //     console.log('완료');
  //     // toast.success('회원가입이 완료되었습니다.');
  //     // router.push('/');
  //   }

  //   return;
  // };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // //이미 회원인 경우
  // if (isError) {
  //   if (error instanceof AxiosError) {
  //     if (error.response?.status === 409) {
  //       hanldeSignin();
  //       return;
  //     }
  //     return;
  //   }
  //   alert('문제가 발생했습니다.');
  // }

  return (
    <div className={styles.socialLoginBtnContainer}>
      <Image src={KaKaoImg} alt="카카오아이콘" className={styles.img} onClick={() => handleSocialLogin('kakao')} />
      <Image src={NaverImg} alt="네이버아이콘" className={styles.img} />
      <Image src={GoogleImg} alt="구글아이콘" className={styles.img} />
    </div>
  );
}

export default SocialLogin;
