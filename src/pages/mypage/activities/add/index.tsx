import MyPageLayout from '@/components/MyPage/MyPageLayout';
import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import styles from './Add.module.css';
import Input from '@/components/Input/Input';
import { FieldValues, useForm, useFormContext } from 'react-hook-form';
import DatePickerInput from '@/components/common/DatePicker/DatePicker';
import PlusButtonIcon from '#/icons/icon-plusButton.svg';
import MinusButtonIcon from '#/icons/icon-minusButton.svg';
import PlusIcon from '#/icons/icon-plus.svg';
import dayjs from 'dayjs';
import Dropdown, { ActivityItems } from '@/components/common/DropDown/Dropdown';
import { TIME_LIST } from '@/constants/dropdown';
import Image from 'next/image';
import ImgCloseIcon from '#/icons/icon-imgClose.svg';
import MapContainer from '@/components/MyPage/Activities/Add/MapContainer';

interface IsDateTime {
  selectedDate: string;
  startTimeItem: string;
  endTimeItem: string;
}

function ActivitiesAdd() {
  const [isDate, setIsDate] = useState<IsDateTime[]>([]);
  const [isSelectedDate, setIsSelectedDate] = useState('');
  const [startTime, setStartTime] = useState<string | ActivityItems>('');
  const [endTime, setEndTime] = useState<string | ActivityItems>('');
  const [categoryItem, setCategoryItem] = useState<string | ActivityItems>('');
  const [bannerImgSrc, setBannerImgSrc] = useState<string[]>([]);
  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [address, setAddress] = useState<string | undefined>('주소를 입력해주세요');
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const bannerImgRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      nickName: '',
      email: '',
    },
  });

  const { handleSubmit, control } = methods;

  // const { setValue } = useFormContext();

  const handleOnSubmit = () => {};
  const handleAddButton = (isSelectedDate: string, startTime: string, endTime: string) => {
    if (!startTime || !endTime || !isSelectedDate) {
      alert('날짜, 시간을 선택해 주세요.');
      return;
    }
    if (startTime >= endTime) {
      alert('시간을 확인해 주세요.');
      return;
    }
    if (
      isDate.filter(
        (e) => `${e.selectedDate}+${e.startTimeItem}+${e.endTimeItem}` === `${isSelectedDate}+${startTime}+${endTime}`,
      ).length > 0
    ) {
      alert('동일한 시간이 있습니다.');
      return;
    }

    setIsDate((prev) => [
      ...prev,
      {
        selectedDate: isSelectedDate,
        startTimeItem: startTime,
        endTimeItem: endTime,
      },
    ]);
  };

  const handleDeleteButton = (item: string) => {
    setIsDate((prev) => prev.filter((e) => `${e.selectedDate}+${e.startTimeItem}+${e.endTimeItem}` !== item));
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
      // handlePostProfile(targetFiles);
    }
  };

  // const handlePostProfile = (imgUrl: File) => {
  //   const imgFormData = new FormData();
  //   imgFormData.append('image', imgUrl);
  //   //TODO 이미지 url 생성 api 연동, imgFormData 넘겨주기, setValue에 응답값 넘겨주기
  //   setValue('profileImageUrl', 'img');
  // };

  const handleImgDelete = (item: string, banner: boolean) => {
    if (banner) {
      setBannerImgSrc(bannerImgSrc.filter((e) => e !== item));
    } else {
      setImgSrc(imgSrc.filter((e) => e !== item));
    }
  };

  return (
    <div className={styles.addContainer}>
      <div className={styles.addHeaderWrapper}>
        <p className={styles.addHeader}>내 체험 등록</p>
        <button className={styles.addHeaderButton}>등록하기</button>
      </div>

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        onKeyDown={(e) => {
          console.log(e.code);
          if (e.code === 'Enter' || e.code === 'NumpadEnter') e.preventDefault();
        }}
        className={styles.formContainer}
      >
        <Input name="title" control={control} placeholder="제목" type="text" activities={true} />
        <div className={styles.categoryWrapper}>
          <Dropdown type="카테고리" setDropdownItem={setCategoryItem} />
        </div>

        <Input name="description" control={control} placeholder="설명" type="text" activities={true} />
        <Input name="price" control={control} label="가격" placeholder="가격" type="number" activities={true} />

        <div className={styles.addressContainer}>
          <p className={styles.addressTitle}>주소</p>
          <MapContainer />
        </div>
        <p className={styles.dateTitle}>예약 가능한 시간대</p>
        <div className={styles.dateWrapper}>
          <div className={styles.dateHeader}>
            <p className={styles.date}>날짜</p>
            <p className={styles.startTime}>시작 시간</p>
            <p>종료 시간</p>
          </div>
          <div className={styles.dateContent}>
            <DatePickerInput setIsSelectedDate={setIsSelectedDate} />
            <div className={styles.dateDropDownWrapper}>
              <div className={styles.dateDropDown}>
                <Dropdown type="시간" setDropdownItem={setStartTime} items={TIME_LIST} />
              </div>
              <p className={styles.dateWave}>~</p>
              <div className={styles.dateDropDown}>
                <Dropdown type="시간" setDropdownItem={setEndTime} items={TIME_LIST} />
              </div>
            </div>
            <button onClick={() => handleAddButton(isSelectedDate, startTime as string, endTime as string)}>
              <PlusButtonIcon className={styles.datePlusButton} alt="플러스 버튼" />
            </button>
          </div>
          <hr className={styles.dateHr} />
          <div className={styles.plusDateWrapper}>
            {isDate &&
              isDate.map((item, index) => {
                return (
                  <div key={index}>
                    <div className={styles.dateContent}>
                      <p className={styles.dateTime}>{dayjs(item.selectedDate).format('YY/MM/DD')}</p>
                      <div className={styles.dateDropDownWrapper}>
                        <div className={styles.addedTime}>{item.startTimeItem}</div>
                        <p className={styles.dateWave}>~</p>
                        <div className={styles.addedTime}>{item.endTimeItem}</div>
                      </div>
                      <button
                        onClick={() =>
                          handleDeleteButton(`${item.selectedDate}+${item.startTimeItem}+${item.endTimeItem}`)
                        }
                      >
                        <MinusButtonIcon className={styles.datePlusButton} alt="마이너스 버튼" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
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
      <Input name="description" control={control} placeholder="설명" type="text" activities={true} />
    </div>
  );
}

export default ActivitiesAdd;
ActivitiesAdd.getLayout = (page: ReactElement) => <MyPageLayout>{page}</MyPageLayout>;
