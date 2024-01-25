import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ChangeEvent, ReactElement, useCallback, useRef, useState } from 'react';
import styles from './MyPage.module.css';
import { FieldValues, useForm } from 'react-hook-form';
import Input from '@/components/Input/Input';
import { passwordCheck } from '@/utils/passwordCheck';
import Image from 'next/image';
import LogoImg from '#/images/img-kakao.png';
import EditIcon from '#/icons/icon-edit.svg';
import profileStyles from '@/components/MyPage/ProfileMenuBox.module.css';
function MyPage() {
  const methods = useForm<FieldValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      nickName: '닉네임',
      email: 'test@test.com',
      password: '',
      passwordCheck: '',
    },
  });

  const { handleSubmit, control, setError } = methods;

  const { isValid } = methods.formState;

  const handleOnSubmit = (data: FieldValues) => {
    const isValidPwCheck = passwordCheck(data.passwordCheck, data.password, setError);
    if (!isValidPwCheck) return;

    console.log(data);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const targetFiles = e.target.files[0];
      const selectedFiles = URL.createObjectURL(targetFiles);
      setImageSrc(selectedFiles);
      handlePostProfile(targetFiles);
    }
  };

  const handlePostProfile = (imgUrl: File) => {
    const imgFormData = new FormData();
    imgFormData.append('image', imgUrl);
    //TODO 이미지 url 생성 api 연동, imgFormData 넘겨주기
  };

  const handleUploadImg = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.topContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>내 정보</div>
          <button type="submit" form="mypageForm" disabled={!isValid}>
            저장하기
          </button>
        </div>

        <div className={profileStyles.profileContainer}>
          <Image
            src={imageSrc ? imageSrc : LogoImg}
            className={profileStyles.profileImg}
            alt="profileImg"
            width={160}
            height={160}
          />
          <EditIcon className={profileStyles.editIcon} onClick={handleUploadImg} />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onUpload(e)}
            ref={inputRef}
            className={profileStyles.imgInput}
          />
        </div>
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
