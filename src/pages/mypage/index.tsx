import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';
import styles from './MyPage.module.css';
import { FieldValues, useForm } from 'react-hook-form';
import Input from '@/components/Input/Input';
import { passwordCheck } from '@/utils/passwordCheck';
import ProfileInput from '@/components/MyPage/ProfileInput';
function MyPage() {
  const methods = useForm<FieldValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      nickName: '닉네임',
      email: 'test@test.com',
      password: '',
      passwordCheck: '',
      profileImageUrl: '',
    },
  });

  const { handleSubmit, control, setError } = methods;

  const { isValid } = methods.formState;

  const handleOnSubmit = (data: FieldValues) => {
    const isValidPwCheck = passwordCheck(data.passwordCheck, data.password, setError);
    if (!isValidPwCheck) return;

    console.log(data);
  };

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.topContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>내 정보</div>
          <button type="submit" form="mypageForm" disabled={!isValid}>
            저장하기
          </button>
        </div>

        <ProfileInput isProfileBox={false} />
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.formContainer} id="mypageForm">
        <Input
          name={'nickName'}
          control={control}
          label={'닉네임'}
          placeholder={'닉네임을 입력해주세요'}
          type={'text'}
        />
        <Input name={'email'} control={control} label={'이메일'} type={'email'} isDisabled={true} />
        <Input
          name={'password'}
          control={control}
          label={'비밀번호'}
          placeholder={'8자 이상 입력해 주세요'}
          type={'password'}
        />
        <Input
          name={'passwordCheck'}
          control={control}
          label={'비밀번호 확인'}
          placeholder={'비밀번호를 한번 더 입력해 주세요'}
          type={'password'}
        />
      </form>
    </div>
  );
}

export default MyPage;

MyPage.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
