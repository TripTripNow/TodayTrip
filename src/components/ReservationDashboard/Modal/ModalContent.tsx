import Dropdown from '@/components/common/DropDown/Dropdown';
import styles from './ModalContent.module.css';
import { Dispatch, SetStateAction } from 'react';

interface ModalContentProps {
  setDropdownItem: Dispatch<SetStateAction<string>>;
  items: string[];
  dropdownItem: string;
}

function ReservationDate({ setDropdownItem, items, dropdownItem }: ModalContentProps) {
  const showDateArr = dropdownItem.split('.');
  return (
    <div className={styles.dateContainer}>
      <h2>예약 날짜</h2>
      <p>{`${showDateArr[0]}년 ${showDateArr[1]}월 ${showDateArr[2]}일`}</p>
      <Dropdown setDropdownItem={setDropdownItem} items={items} type="예약한 시간" />
    </div>
  );
}

function ReservationDetails() {
  return (
    <div className={styles.detailsContainer}>
      <h2>예약 내역</h2>
    </div>
  );
}

function ModalContent({ setDropdownItem, items, dropdownItem }: ModalContentProps) {
  return (
    <div className={styles.mainContainer}>
      <ReservationDate setDropdownItem={setDropdownItem} items={items} dropdownItem={dropdownItem} />
      <ReservationDetails />
    </div>
  );
}

export default ModalContent;
