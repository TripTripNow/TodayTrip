import Input from '@/components/Input/Input';
import UserLayout from '@/components/User/UserLayout';
import { ReactElement } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styles from '@/pages/signin/SignIn.module.css';
import { useRouter } from 'next/router';
import CheckboxInput from '@/components/Input/CheckboxInput';
import { passwordCheck } from '@/utils/passwordCheck';

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

  const { handleSubmit, control, setError } = methods;

  const handleOnSubmit = (data: FieldValues) => {
    const isValidPwCheck = passwordCheck(data.passwordCheck, data.password, setError);
    if (!isValidPwCheck) return;

    //TODO api 연결 시 중복된 이메일 에러 처리, 회원가입 성공 및 실패 토스트 처리 추가
    console.log(data);
    router.push('/');
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