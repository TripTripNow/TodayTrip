import Input from '@/components/Input/Input';
import UserLayout from '@/components/User/UserLayout';
import { ReactElement, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styles from '@/pages/signin/Signin.module.css';
import { useRouter } from 'next/router';
import CheckboxInput from '@/components/Input/CheckboxInput';
function Signup() {
  const router = useRouter();
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
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
    if (data.passwordCheck !== data.password) {
      setError('passwordCheck', {
        type: 'validate',
        message: '비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    //TODO api 연결 시 중복된 이메일 에러 처리, 회원가입 성공 및 실패 토스트 처리 추가
    console.log(data);
    router.push('/');
  };

  const [buttonActive, setButtonActive] = useState<'active' | 'inActive'>('inActive');

  const watchAll = Object.values(methods.watch());
  const { isValid } = methods.formState;

  const isPasswordVisible = methods.watch('checkbox');

  useEffect(() => {
    if (watchAll.every((el) => el) && watchAll.length !== 0 && isValid) {
      setButtonActive('active');
      return;
    }
    setButtonActive('inActive');
  }, [isValid, watchAll]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
      <Input
        state="user"
        name="email"
        control={control}
        label={'이메일'}
        placeholder={'이메일을 입력해 주세요'}
        type={'email'}
        isAutoFocus={true}
      />
      <Input
        state="user"
        name="nickName"
        control={control}
        label={'닉네임'}
        placeholder={'닉네임을 입력해 주세요'}
        type={'text'}
      />
      <Input
        state="user"
        name="password"
        control={control}
        label={'비밀번호'}
        placeholder={'비밀번호를 입력해주세요'}
        type={isPasswordVisible ? 'text' : 'password'}
      />
      <Input
        state="user"
        name="passwordCheck"
        control={control}
        label={'비밀번호 확인'}
        placeholder={'비밀번호를 한번 더 입력해 주세요'}
        type={isPasswordVisible ? 'text' : 'password'}
      />

      <CheckboxInput control={control} name="checkbox" />

      <button className={`${styles.button} ${styles[buttonActive]}`} type="submit">
        회원가입하기
      </button>
    </form>
  );
}

export default Signup;

Signup.getLayout = (page: ReactElement) => (
  <UserLayout memberStatus="회원이신가요?" linkTitle="로그인하기" link="/signin">
    {page}
  </UserLayout>
);
