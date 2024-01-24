import Input from '@/components/Input/Input';
import UserLayout from '@/components/User/UserLayout';
import { ReactElement, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styles from './Signin.module.css';
function Signin() {
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, control } = methods;

  const handleOnSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const [buttonActive, setButtonActive] = useState<'active' | 'inActive'>('inActive');

  const watchAll = Object.values(methods.watch());
  const { isValid } = methods.formState;

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
        isRequired={true}
      />
      <Input
        state="user"
        name="password"
        control={control}
        label={'비밀번호'}
        placeholder={'비밀번호를 입력해주세요'}
        type={'password'}
        isRequired={true}
      />
      <button className={`${styles.button} ${styles[buttonActive]}`} type="submit">
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
