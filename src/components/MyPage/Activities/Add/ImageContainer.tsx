import styles from '@/pages/mypage/activities/add/Add.module.css';
import Image from 'next/image';
import ImgCloseIcon from '#/icons/icon-imgClose.svg';
import { ChangeEvent, useRef, useState } from 'react';
import PlusIcon from '#/icons/icon-plus.svg';
import { Control, FieldValues, UseFormGetValues, UseFormSetValue, useController } from 'react-hook-form';
import { postImageUrl } from '@/api/activities';

interface ImageContainerProps {
  name: string;
  control: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

interface imageUrlArrayType {
  id: number;
  imageUrl: string;
}

function ImageContainer({ name, control, setValue, getValues }: ImageContainerProps) {
  const { field } = useController({ name, control });
  const value = field.value;

  const bannerImgRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [bannerImgSrc, setBannerImgSrc] = useState<string | null>(getValues('bannerImageUrl') ?? null);
  const [imgSrc, setImgSrc] = useState<(imageUrlArrayType | string)[]>(value ?? []);
  const handleImgClick = (banner: boolean) => {
    if (banner) {
      if (bannerImgRef.current) bannerImgRef.current.click();
    } else {
      if (imgRef.current) imgRef.current.click();
    }
  };

  const imageSrcReturn = (item: imageUrlArrayType | string) => {
    if (typeof item !== 'string') return item.imageUrl;
    return item;
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>, banner: boolean) => {
    if (e.target && e.target.files?.length !== 0) {
      const targetFiles = e.target.files?.[0];
      const selectedFiles = URL.createObjectURL(targetFiles!);

      const formData = new FormData();
      formData.append('image', targetFiles!);
      const response = await postImageUrl(formData);

      // banner 추가하는 부분
      if (banner) {
        setBannerImgSrc(selectedFiles);
        setValue('bannerImageUrl', response);
      } else {
        // subImg 추가하는 부분
        setImgSrc((prev) => [...prev, selectedFiles]);
        field.onChange([...value, response]);
        setValue('subImageUrlsToAdd', [...getValues('subImageUrlsToAdd'), response]);
      }
    }
  };

  const handleImgDelete = (currentIndex: number, item: imageUrlArrayType | string, banner: boolean) => {
    // banner 삭제하는 부분
    if (banner) {
      setBannerImgSrc(null);
      setValue('bannerImageUrl', '');
      if (bannerImgRef.current) {
        bannerImgRef.current.value = ''; // banner 삭제 후 input 초기화
      }
    } else {
      // subImg 삭제하는 부분
      setImgSrc(imgSrc.filter((_, index) => index !== currentIndex));
      if (imgRef.current) {
        imgRef.current.value = ''; // subImg 삭제 후 input 초기화
      }
      // edit페이지에서 subImg 삭제하는 부분
      if (typeof item === 'string') {
        const deleteIndex = currentIndex - imgSrc.length + getValues('subImageUrlsToAdd').length;
        const lastToAddImage = getValues('subImageUrlsToAdd').filter(
          (_: string, index: number) => index !== deleteIndex,
        );
        setValue('subImageUrlsToAdd', lastToAddImage);
      } else {
        setValue('subImageIdsToRemove', [...getValues('subImageIdsToRemove'), item.id]);
      }
      field.onChange(value.filter((_: any, index: number) => index !== currentIndex));
    }
  };

  return (
    <>
      {/* 배너 이미지 */}
      <div className={styles.cotentTitleWrapper}>
        <p className={styles.contentTitle}>배너 이미지</p>
        <p className={styles.warningMessage}>*이미지는 최대 1개까지 등록 가능합니다.</p>
      </div>
      <div className={styles.addImgButtonWrapper}>
        {!bannerImgSrc && (
          <div className={styles.addImgButton} onClick={() => handleImgClick(true)}>
            <div className={styles.addImgWrapper}>
              <input
                type="file"
                accept=".jpg, .png"
                className={styles.imgInput}
                ref={bannerImgRef}
                onChange={(e) => handleUpload(e, true)}
              />
              <PlusIcon alt="이미지 추가 이미지" />
              <div>이미지 등록</div>
            </div>
          </div>
        )}
        {bannerImgSrc && (
          <div className={styles.addedImg}>
            <ImgCloseIcon
              className={styles.imgCloseButton}
              alt="이미지 닫기 이미지"
              onClick={() => handleImgDelete(0, bannerImgSrc, true)}
              width={40}
              height={40}
            />
            <Image src={bannerImgSrc} className={styles.profileImg} alt="배너 이미지" width={180} height={180} />
          </div>
        )}
      </div>

      {/* 소개 이미지 */}
      <div className={styles.cotentTitleWrapper}>
        <p className={styles.contentTitle}>소개 이미지</p>
        <p className={styles.warningMessage}>(선택) *이미지는 최대 4개까지 등록 가능합니다.</p>
      </div>
      <div className={styles.addImgButtonWrapper}>
        {imgSrc.length < 4 && (
          <div className={styles.addImgButton} onClick={() => handleImgClick(false)}>
            <div className={styles.addImgWrapper}>
              <input
                type="file"
                accept=".jpg, .png"
                className={styles.imgInput}
                ref={imgRef}
                onChange={(e) => handleUpload(e, false)}
              />
              <PlusIcon alt="플러스 이미지" />
              <div>이미지 등록</div>
            </div>
          </div>
        )}
        {imgSrc &&
          imgSrc.map((item, index) => (
            <div key={index} className={styles.addedImg}>
              <ImgCloseIcon
                className={styles.imgCloseButton}
                alt="이미지 닫기 버튼"
                onClick={() => handleImgDelete(index, item, false)}
                width={40}
                height={40}
              />
              <Image
                src={imageSrcReturn(item)}
                className={styles.profileImg}
                alt="소개 이미지"
                width={180}
                height={180}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default ImageContainer;
