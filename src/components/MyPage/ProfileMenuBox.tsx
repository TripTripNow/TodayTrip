import { ChangeEvent, useCallback, useRef, useState } from 'react';
import styles from './ProfileMenuBox.module.css';
import MypageIcon from '#/icons/icon-mypage.svg';
import ReservationIcon from '#/icons/icon-reservation.svg';
import ActivitiesIcon from '#/icons/icon-activities.svg';
import DashboardIcon from '#/icons/icon-dashboard.svg';
import MypageActiveIcon from '#/icons/icon-mypage-active.svg';
import ReservationActiveIcon from '#/icons/icon-reservation-active.svg';
import ActivitiesActiveIcon from '#/icons/icon-activities-active.svg';
import DashboardActiveIcon from '#/icons/icon-dashboard-active.svg';
import LogoImg from '#/images/img-kakao.png';
import Image from 'next/image';
import EditIcon from '#/icons/icon-edit.svg';
import { useRouter } from 'next/router';

const MENU_LIST = [
  {
    title: '내 정보',
    src: <MypageIcon />,
    activeSrc: <MypageActiveIcon />,
    link: '/mypage',
  },
  {
    title: '예약 내역',
    src: <ReservationIcon />,
    activeSrc: <ReservationActiveIcon />,
    link: '/mypage/reservations',
  },
  {
    title: '내 체험 관리',
    src: <ActivitiesIcon />,
    activeSrc: <ActivitiesActiveIcon />,
    link: '/mypage/reservations',
  },
  {
    title: '예약 현황',
    src: <DashboardIcon />,
    activeSrc: <DashboardActiveIcon />,
    link: '/mypage/reservations',
  },
];

function ProfileMenuBox() {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState('내 정보');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleMenuItem = (item: { title: string; link: string }) => {
    setIsSelected(item.title);
    router.push(item.link);
  };

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
    <div className={styles.profileBoxContainer}>
      <div className={styles.profileContainer}>
        <Image
          src={imageSrc ? imageSrc : LogoImg}
          className={styles.profileImg}
          alt="profileImg"
          width={160}
          height={160}
        />
        {isSelected === '내 정보' && <EditIcon className={styles.editIcon} onClick={handleUploadImg} />}
        <input type="file" accept="image/*" onChange={(e) => onUpload(e)} ref={inputRef} className={styles.imgInput} />
      </div>
      <div className={styles.memuContainer}>
        {MENU_LIST.map((e, index) => {
          return (
            <div
              className={`${styles.menuItem} ${e.title === isSelected && styles.active}`}
              key={index}
              onClick={() => handleMenuItem(e)}
            >
              {e.title === isSelected ? e.activeSrc : e.src}
              <div className={styles.menuItemTitle}>{e.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileMenuBox;
