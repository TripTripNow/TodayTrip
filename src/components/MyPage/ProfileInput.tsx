import { ChangeEvent, useCallback, useRef, useState } from 'react';
import styles from './profileInput.module.css';
import LogoImg from '#/images/img-kakao.png';
import EditIcon from '#/icons/icon-edit.svg';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

interface ProfileInputProps {
  isProfileBox: boolean;
  isEdit: boolean;
}

function ProfileInput({ isProfileBox, isEdit }: ProfileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const { setValue } = useFormContext();

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
    //TODO 이미지 url 생성 api 연동, imgFormData 넘겨주기, setValue에 응답값 넘겨주기
    setValue('profileImageUrl', 'img');
  };

  const handleUploadImg = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <div className={`${styles.profileContainer} ${isProfileBox && styles.display}`}>
      <Image
        src={imageSrc ? imageSrc : LogoImg}
        className={styles.profileImg}
        alt="profileImg"
        width={160}
        height={160}
      />
      {isEdit && <EditIcon className={styles.editIcon} onClick={handleUploadImg} />}

      <input type="file" accept=".jpg, .png" onChange={(e) => onUpload(e)} ref={inputRef} className={styles.imgInput} />
    </div>
  );
}

export default ProfileInput;
