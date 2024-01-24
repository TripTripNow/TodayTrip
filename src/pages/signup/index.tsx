import Input from '@/components/Input/Input';
import UserLayout from '@/components/User/UserLayout';
import { ReactElement, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styles from '@/pages/signin/Signin.module.css';
function Signup() {
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      nickName: '',
      password: '',
      passwordCheck: '',
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
        name="nickName"
        control={control}
        label={'닉네임'}
        placeholder={'닉네임을 입력해 주세요'}
        type={'text'}
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
      <Input
        state="user"
        name="passwordCheck"
        control={control}
        label={'비밀번호 확인'}
        placeholder={'비밀번호를 한번 더 입력해 주세요'}
        type={'password'}
        isRequired={true}
      />
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
