import { ChangeEvent, useCallback, useRef, useState } from 'react';
import styles from './profileInput.module.css';
import LogoImg from '#/images/img-naver.png';
import EditIcon from '#/icons/icon-edit.svg';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { postUsersMeImage } from '@/api/user/user';
import { AxiosError } from 'axios';
interface ProfileInputProps {
  isProfileBox: boolean;
  isEdit: boolean;
  profileImage: string;
}

function ProfileInput({ isProfileBox, isEdit, profileImage }: ProfileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(profileImage);

  const { setValue } = useFormContext();

  const postImageMutation = useMutation({
    mutationFn: (data: FormData) => postUsersMeImage(data),
    onSuccess: (data) => {
      setValue('profileImageUrl', data);
    },
    onError: () => {
      alert('문제가 발생했습니다. 다시 시도해주세요.');
      setImageSrc(profileImage);
    },
  });

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
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
    postImageMutation.mutate(imgFormData);
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
      {isEdit && <EditIcon alt="프로필 이미지 수정 아이콘" className={styles.editIcon} onClick={handleUploadImg} />}
      <input
        type="file"
        accept=".jpg, .png"
        onChange={(e) => handleUpload(e)}
        ref={inputRef}
        className={styles.imgInput}
      />
    </div>
  );
}

export default ProfileInput;
