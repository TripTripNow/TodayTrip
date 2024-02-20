import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './profileInput.module.css';
import LogoImg from '#/images/img-logo.png';
import EditIcon from '#/icons/icon-edit.svg';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { postUsersMeImage } from '@/api/user/user';
import toast from 'react-hot-toast';
import { getSession } from 'next-auth/react';
import useDeviceType from '@/hooks/common/useDeviceType';
interface ProfileInputProps {
  isProfileBox: boolean;
  isEdit: boolean;
}

function ProfileInput({ isProfileBox, isEdit }: ProfileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { setValue } = useFormContext();
  const deviceType = useDeviceType();

  const postImageMutation = useMutation({
    mutationFn: (data: FormData) => postUsersMeImage(data),
    onSuccess: (data) => {
      setValue('profileImageUrl', data);
    },
    onError: () => {
      toast.error('문제가 발생했습니다. 다시 시도해주세요.');
      setImageSrc('');
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

  useEffect(() => {
    async function getSessionData() {
      const data = await getSession();
      if (data && data.user.image) {
        setImageSrc(data.user.image);
      }
    }

    getSessionData();
  }, [deviceType]);

  return (
    <div className={`${styles.profileContainer} ${isProfileBox && styles.display}`}>
      <Image
        src={imageSrc || LogoImg}
        className={styles.profileImg}
        alt="profileImg"
        width={160}
        height={160}
        priority
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
