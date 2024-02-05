import Input from '@/components/Input/Input';
import UserLayout from '@/components/User/UserLayout';
import { ReactElement, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styles from './SignIn.module.css';
import CheckboxInput from '@/components/Input/CheckboxInput';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import instance from '@/api/axiosInstance';

function SignIn() {
  const methods = useForm<FieldValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      checkbox: false,
    },
  });

  const { handleSubmit, control } = methods;

  const { isValid } = methods.formState;

  const isPasswordVisible = methods.watch('checkbox');

  const handleOnSubmit = async (data: FieldValues) => {
    const { email, password } = data;

    const result = await signIn('signin-credentials', {
      email: email,
      password: password,
      redirect: false,
    });

    if (result?.error) {
      toast.error('로그인이 실패하였습니다.');
      return;
    }

    toast.success('로그인이 완료되었습니다.');
  };

  const test = async () => {
    const res = await instance.get('/users/me');
    console.log(res);
  };

  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
      <div onClick={() => test()}> 내정보조회 테스트</div>
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
        name={'password'}
        control={control}
        label={'비밀번호'}
        placeholder={'비밀번호를 입력해주세요'}
        type={isPasswordVisible ? 'text' : 'password'}
      />

      <CheckboxInput control={control} name="checkbox" />

      <button className={styles.button} type="submit" disabled={!isValid}>
        로그인 하기
      </button>
    </form>
  );
}

export default SignIn;

SignIn.getLayout = (page: ReactElement) => (
  <UserLayout memberStatus="회원이 아니신가요?" linkTitle="회원가입하기" link="/signup">
    {page}
  </UserLayout>
);
