import Input from '@/components/Input/Input';
import UserLayout from '@/components/User/UserLayout';
import { ReactElement } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styles from '@/pages/signin/SignIn.module.css';
import { useRouter } from 'next/router';
import CheckboxInput from '@/components/Input/CheckboxInput';
import { passwordCheck } from '@/utils/passwordCheck';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { postSignup } from '@/api/user';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { PostSignupReq } from '@/types/users';

function SignUp() {
  const router = useRouter();
  const methods = useForm<FieldValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      nickName: '',
      password: '',
      passwordCheck: '',
      checkbox: false,
    },
  });

  // 회원가입
  const signupMutation = useMutation({
    mutationFn: (data: PostSignupReq) => postSignup(data),
    onSuccess: async (res) => {
      //회원가입한 이메일, 비밀번호로 로그인 진행
      const result = await signIn('signin-credentials', {
        email: res.email,
        password: res.password,
        redirect: false,
      });
      if (result?.ok) {
        toast.success('회원가입이 완료되었습니다.');
        router.push('/');
        return;
      }
      alert('문제가 발생했습니다.');
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        // 중복된 이메일인 경우
        if (e.response?.status === 409) {
          setError('email', {
            type: 'validate',
            message: e.response.data.message,
          });
          return;
        }
      }
      alert('문제가 발생했습니다.');
    },
  });

  const { handleSubmit, control, setError } = methods;

  const handleOnSubmit = async (data: FieldValues) => {
    const isValidPwCheck = passwordCheck('user', data.passwordCheck, data.password, setError);
    if (!isValidPwCheck) return;

    const userData: PostSignupReq = {
      email: data.email,
      nickname: data.nickName,
      password: data.password,
    };

    signupMutation.mutate(userData);
  };

  const { isValid } = methods.formState;

  const isPasswordVisible = methods.watch('checkbox');

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
      <Input
        state={'user'}
        name={'email'}
        control={control}
        label={'이메일'}
        placeholder={'이메일을 입력해 주세요'}
        type={'email'}
      />
      <Input
        state={'user'}
        name={'nickName'}
        control={control}
        label={'닉네임'}
        placeholder={'닉네임을 입력해 주세요'}
        type={'text'}
      />
      <Input
        state={'user'}
        name={'password'}
        control={control}
        label={'비밀번호'}
        placeholder={'비밀번호를 입력해주세요'}
        type={isPasswordVisible ? 'text' : 'password'}
      />
      <Input
        state={'user'}
        name={'passwordCheck'}
        control={control}
        label={'비밀번호 확인'}
        placeholder={'비밀번호를 한번 더 입력해 주세요'}
        type={isPasswordVisible ? 'text' : 'password'}
      />

      <CheckboxInput control={control} name="checkbox" />

      <button className={styles.button} type="submit" disabled={!isValid}>
        회원가입하기
      </button>
    </form>
  );
}

export default SignUp;

SignUp.getLayout = (page: ReactElement) => (
  <UserLayout memberStatus="회원이신가요?" linkTitle="로그인하기" link="/signin">
    {page}
  </UserLayout>
);
