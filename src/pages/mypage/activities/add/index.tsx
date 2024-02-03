import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import styles from './Add.module.css';
import Input from '@/components/Input/Input';
import { FieldValues, useForm } from 'react-hook-form';

import PlusIcon from '#/icons/icon-plus.svg';

import Dropdown, { DropdownItems } from '@/components/common/DropDown/Dropdown';
import { CATEGORY_LIST, INITIAL_DROPDOWN_ITEM, TIME_LIST } from '@/constants/dropdown';
import Image from 'next/image';
import ImgCloseIcon from '#/icons/icon-imgClose.svg';
import MapContainer from '@/components/MyPage/Activities/Add/MapContainer';
import { priceFormat } from '@/utils/priceFormat';
import ReservationTime from '@/components/MyPage/Activities/Add/ReservationTime';

export interface IsDateTime {
  selectedDate: string;
  startTimeItem: string;
  endTimeItem: string;
}

function ActivitiesAdd() {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>();
  const [isDate, setIsDate] = useState<IsDateTime[]>([]);
  const [categoryItem, setCategoryItem] = useState<DropdownItems>(INITIAL_DROPDOWN_ITEM);
  const [bannerImgSrc, setBannerImgSrc] = useState<string[]>([]);
  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [addressData, setAddressData] = useState<string | undefined>('주소를 입력해주세요');
  const bannerImgRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { handleSubmit, control } = methods;

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    setPrice(+onlyNumber);
  };

  const handleOnSubmit = (data: FieldValues) => {
    data.price = price;
    data.addressData = addressData;
    data.isDate = isDate;
    data.bannerImgSrc = bannerImgSrc;
    data.imgSrc = imgSrc;
    data.description = description;
    if (data) console.log(data);
  };

  const handleImgClick = (banner: boolean) => {
    if (banner) {
      if (bannerImgRef.current) bannerImgRef.current.click();
    } else {
      if (imgRef.current) imgRef.current.click();
    }
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>, banner: boolean) => {
    if (e.target && e.target.files) {
      const targetFiles = e.target.files[0];
      const selectedFiles = URL.createObjectURL(targetFiles);
      if (banner) {
        setBannerImgSrc((prev) => [...prev, selectedFiles]);
      } else {
        setImgSrc((prev) => [...prev, selectedFiles]);
      }
    }
  };

  const handleImgDelete = (item: string, banner: boolean) => {
    if (banner) {
      setBannerImgSrc(bannerImgSrc.filter((e) => e !== item));
    } else {
      setImgSrc(imgSrc.filter((e) => e !== item));
    }
  };

  return (
    <div className={styles.addContainer}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.formContainer}>
        <div className={styles.addHeaderWrapper}>
          <p className={styles.addHeader}>내 체험 등록</p>
          <button className={styles.addHeaderButton}>등록하기</button>
        </div>
        <Input name="title" control={control} placeholder="제목" type="text" activities={true} />

        <Dropdown
          type="카테고리"
          setDropdownItem={setCategoryItem}
          items={CATEGORY_LIST}
          dropDownItem={categoryItem}
          placeholder={'카테고리'}
        />

        <textarea value={description} onChange={handleTextAreaChange} className={styles.textarea} placeholder="설명" />

        <label className={styles.priceWrapper}>가격</label>
        <input
          value={price && priceFormat(price!)}
          type="text"
          className={styles.priceInput}
          onChange={handlePriceChange}
          placeholder="가격"
        />

        <div className={styles.addressContainer}>
          <p className={styles.addressTitle}>주소</p>
          <MapContainer setAddressData={setAddressData} />
        </div>
        <p className={styles.dateTitle}>예약 가능한 시간대</p>
        <ReservationTime isDate={isDate} setIsDate={setIsDate} />

        <div className={styles.cotentTitleWrapper}>
          <p className={styles.contentTitle}>배너 이미지</p>
          <p className={styles.warningMessage}>*이미지는 최대 1개까지 등록 가능합니다.</p>
        </div>
        <div className={styles.addImgButtonWrapper}>
          {bannerImgSrc.length < 1 && (
            <div className={styles.addImgButton} onClick={() => handleImgClick(true)}>
              <div className={styles.addImgWrapper}>
                <input
                  type="file"
                  accept=".jpg, .png"
                  className={styles.imgInput}
                  ref={bannerImgRef}
                  onChange={(e) => handleUpload(e, true)}
                />
                <PlusIcon alt="플러스 이미지" />
                <div>이미지 등록</div>
              </div>
            </div>
          )}
          {bannerImgSrc &&
            bannerImgSrc.map((item, index) => (
              <div key={index} className={styles.addedImg}>
                <ImgCloseIcon
                  className={styles.imgCloseButton}
                  alt="이미지 닫기 버튼"
                  onClick={() => handleImgDelete(item, true)}
                />
                <Image src={item} className={styles.profileImg} alt="profileImg" width={180} height={180} />
              </div>
            ))}
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
                  onClick={() => handleImgDelete(item, false)}
                />
                <Image src={item} className={styles.profileImg} alt="profileImg" width={180} height={180} />
              </div>
            ))}
        </div>
      </form>
    </div>
  );
}

export default ActivitiesAdd;
ActivitiesAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
