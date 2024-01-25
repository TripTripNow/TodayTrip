import Input from '@/components/Input/Input';
import UserLayout from '@/components/User/UserLayout';
import { ReactElement } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styles from './Signin.module.css';
import { useRouter } from 'next/router';
import CheckboxInput from '@/components/Input/CheckboxInput';
function Signin() {
  const router = useRouter();
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      checkbox: false,
    },
  });

  const { handleSubmit, control } = methods;

  const handleOnSubmit = (data: FieldValues) => {
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

export default Signin;

Signin.getLayout = (page: ReactElement) => (
  <UserLayout memberStatus="회원이 아니신가요?" linkTitle="회원가입하기" link="/signup">
    {page}
  </UserLayout>
);
