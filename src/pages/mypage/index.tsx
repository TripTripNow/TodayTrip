import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';
import styles from './MyPage.module.css';
import { FieldValues, useForm, useFormContext } from 'react-hook-form';
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
      mypagePassword: '',
      mypagePasswordCheck: '',
    },
  });

  const { handleSubmit, control, setError } = methods;

  const { isValid } = methods.formState;

  const handleOnSubmit = (data: FieldValues) => {
    const isValidPwCheck = passwordCheck(data.passwordCheck, data.password, setError);
    if (!isValidPwCheck) return;

    // 생성된 프로필 이미지 url
    console.log(getValues('profileImageUrl'));
    console.log(data);
  };

  const { getValues } = useFormContext();

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.topContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>내 정보</div>
          <button className={styles.button} type="submit" form="mypageForm" disabled={!isValid}>
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
          name={'mypagePassword'}
          control={control}
          label={'비밀번호'}
          placeholder={'8자 이상 입력해 주세요'}
          type={'password'}
        />
        <Input
          name={'mypagePasswordCheck'}
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
