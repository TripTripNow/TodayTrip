import styles from '@/pages/mypage/activities/add/Add.module.css';
import Image from 'next/image';
import ImgCloseIcon from '#/icons/icon-imgClose.svg';
import { ChangeEvent, useRef, useState } from 'react';
import PlusIcon from '#/icons/icon-plus.svg';
import { Control, FieldValues, UseFormSetValue, useController } from 'react-hook-form';

interface ImageContainerProps {
  name: string;
  control: Control<FieldValues, any>;
  setValue: UseFormSetValue<FieldValues>;
}

function ImageContainer({ name, control, setValue }: ImageContainerProps) {
  const { field } = useController({ name, control });
  const value = field.value;
  const bannerImgRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [bannerImgSrc, setBannerImgSrc] = useState<string | null>();
  const [imgSrc, setImgSrc] = useState<string[]>([]);

  const handleImgClick = (banner: boolean) => {
    if (banner) {
      if (bannerImgRef.current) bannerImgRef.current.click();
    } else {
      if (imgRef.current) imgRef.current.click();
    }
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>, banner: boolean) => {
    if (e.target && e.target.files?.length !== 0) {
      const targetFiles = e.target.files?.[0];
      const selectedFiles = URL.createObjectURL(targetFiles!);
      if (banner) {
        setBannerImgSrc(selectedFiles);
        // field.onChange({ ...value, bannerImageUrl: e.target.files?.[0] });
        setValue('bannerImageUrl', selectedFiles);
      } else {
        setImgSrc((prev) => [...prev, selectedFiles]);
        if (value) {
          field.onChange([...value, selectedFiles]);
          console.log('여기');
          console.log(field.value);
          // setValue('subImageUrls', [...field.value.subImageUrls, selectedFiles]);
        } else {
          console.log('dd');
          console.log(value);
          field.onChange([selectedFiles]);
          // setValue('subImageUrls', selectedFiles);
        }
      }
    }
  };

  const handleImgDelete = (item: number, banner: boolean) => {
    if (banner) {
      setBannerImgSrc(null);
      // field.onChange({ ...value, bannerImageUrl: '' });
      setValue('bannerImageUrl', '');
      if (bannerImgRef.current) {
        bannerImgRef.current.value = ''; // 배너 이미지 삭제 후 input 초기화
      }
    } else {
      setImgSrc(imgSrc.filter((_, index) => index !== item));
      if (imgRef.current) {
        imgRef.current.value = ''; // 소개 이미지 삭제 후 input 초기화
      }

      if (value.length === 1) field.onChange([]);
      else {
        field.onChange(value.filter((_: any, index: number) => index !== item));
        // setValue(
        //   'subImageUrls',
        //   field.value.subImageUrls.filter((_: any, index: number) => index !== item),
        // );
      }
    }
  };

  return (
    <>
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
              onClick={() => handleImgDelete(0, true)}
              width={40}
              height={40}
            />
            <Image src={bannerImgSrc} className={styles.profileImg} alt="배너 이미지" width={180} height={180} />
          </div>
        )}
      </div>

      <div className={styles.cotentTitleWrapper}>
        <p className={styles.contentTitle}>소개 이미지</p>
        <p className={styles.warningMessage}>*이미지는 최대 4개까지 등록 가능합니다.</p>
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
                onClick={() => handleImgDelete(index, false)}
                width={40}
                height={40}
              />
              <Image src={item} className={styles.profileImg} alt="소개 이미지" width={180} height={180} />
            </div>
          ))}
      </div>
    </>
  );
}

export default ImageContainer;
