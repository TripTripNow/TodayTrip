import Input from '@/components/Input/Input';
import UserLayout from '@/components/User/UserLayout';
import { ReactElement } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styles from './SignIn.module.css';
import CheckboxInput from '@/components/Input/CheckboxInput';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import HeadMeta from '@/components/HeadMeta/HeadMeta';
import { META_TAG } from '@/constants/metaTag';

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

  const router = useRouter();

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
    router.push('/');
  };

  return (
    <>
      <HeadMeta title={META_TAG.signin['title']} description={META_TAG.signin['description']} />
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
    </>
  );
}

export default SignIn;

SignIn.getLayout = (page: ReactElement) => (
  <UserLayout memberStatus="회원이 아니신가요?" linkTitle="회원가입하기" link="/signup">
    {page}
  </UserLayout>
);
