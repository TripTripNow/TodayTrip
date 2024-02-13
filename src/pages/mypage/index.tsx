import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ReactElement } from 'react';
import styles from './MyPage.module.css';
import { FieldValues, useForm, useFormContext } from 'react-hook-form';
import Input from '@/components/Input/Input';
import { passwordCheck } from '@/utils/passwordCheck';
import ProfileInput from '@/components/MyPage/ProfileInput';
import Button from '@/components/common/Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import { getUsersMe, patchUsersMe } from '@/api/user/user';
import { GetUsersMeRes, PatchUsersMeReq } from '@/types/users';
import { GetServerSideProps } from 'next';
import { setContext } from '@/api/axiosInstance';
import { getSession } from 'next-auth/react';
import { SOCIAL_EMAIL_CONTENT } from '@/constants/user';
import toast from 'react-hot-toast';

interface MyPageProps {
  userData: GetUsersMeRes;
  type: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);

  let userData;
  const sessionData = await getSession(context);
  const type = sessionData?.user.type || 'credentials';

  try {
    userData = await getUsersMe();
  } catch (e) {
    console.error(e);
  }

  return {
    props: { userData, type },
  };
};
function MyPage({ userData, type }: MyPageProps) {
  const methods = useForm<FieldValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      nickName: userData.nickname,
      mypageEmail: type === 'credentials' ? userData.email : SOCIAL_EMAIL_CONTENT[type],
      mypagePassword: '',
      mypagePasswordCheck: '',
    },
  });

  const { handleSubmit, control, setError, reset, resetField } = methods;
  const { isValid } = methods.formState;
  const { getValues } = useFormContext();
  const queryClient = useQueryClient();

  const patchUserMeMutation = useMutation({
    mutationFn: (data: PatchUsersMeReq) => patchUsersMe(data),
    onSuccess: () => {
      toast.success('수정이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.usersMe] });
      resetField('mypagePassword');
      resetField('mypagePasswordCheck');
    },
    onError: () => {
      toast.error('수정이 실패하였습니다.');
      reset();
    },
  });

  const handleOnSubmit = (data: FieldValues) => {
    const isValidPwCheck = passwordCheck(data.mypagePasswordCheck, data.mypagePassword, setError);
    if (!isValidPwCheck) return;

    const patchUsersMeReq: PatchUsersMeReq = {
      nickname: data.nickName,
    };
    const profileImageUrl = getValues('profileImageUrl');

    if (data.mypagePassword !== '') patchUsersMeReq.newPassword = data.mypagePassword;

    if (profileImageUrl) {
      patchUsersMeReq.profileImageUrl = profileImageUrl.profileImageUrl;
    }

    patchUserMeMutation.mutate(patchUsersMeReq);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.myPageContainer}>
        <div className={styles.topContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>내 정보</div>
            <Button type="default" isDisabled={!isValid} color="green">
              저장하기
            </Button>
          </div>

          <ProfileInput isProfileBox={false} isEdit={true} profileImage={userData.profileImageUrl} />
        </div>

        <div className={styles.formContainer}>
          <Input
            name={'nickName'}
            control={control}
            label={'닉네임'}
            placeholder={'닉네임을 입력해주세요'}
            type={'text'}
          />
          <Input name={'mypageEmail'} control={control} label={'이메일'} type={'email'} isDisabled={true} />
          <Input
            name={'mypagePassword'}
            control={control}
            label={'비밀번호'}
            placeholder={'8자 이상 입력해 주세요'}
            type={'password'}
            isDisabled={type !== 'credentials'}
          />
          <Input
            name={'mypagePasswordCheck'}
            control={control}
            label={'비밀번호 확인'}
            placeholder={'비밀번호를 한번 더 입력해 주세요'}
            type={'password'}
            isDisabled={type !== 'credentials'}
          />
        </div>
      </form>
    </div>
  );
}

export default MyPage;

MyPage.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
