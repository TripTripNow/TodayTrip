import { MouseEvent, useState } from 'react';
import clsx from 'clsx';

import ArrowDownIcon from '#/icons/icon-arrowdown.svg';
import ArrowUpIcon from '#/icons/icon-arrowup.svg';
import CheckIcon from '#/icons/icon-checkmark.svg';

import styles from './Dropdown.module.css';

const CATEGORY_LIST = ['문화 예술', '식음료', '스포츠', '투어', '관광', '웰빙'] as const;

interface DropdownProps {
  activities?: {
    id: number;
    userId: number;
    title: string;
    description: string;
    category: string;
    price: number;
    address: string;
    bannerImageUrl: string;
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
  }[];
  setDropdownItem: (val: string | number) => void;
}

function Dropdown({ activities, setDropdownItem }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(activities ? activities[0].title : '카테고리');

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropdownClick = (e: MouseEvent<HTMLDivElement>, val: string) => {
    e.preventDefault();
    setValue(val);
    setDropdownItem(val);
    handleDropdownToggle();
  };

  const showLists = activities ? activities.map((activity) => activity.title) : CATEGORY_LIST;

  return (
    <div className={styles.container} style={{ border: '1px solid #000' }} onBlur={handleDropdownToggle}>
      {activities && <p className={styles.subTitle}>체험명</p>}
      <button
        value={value}
        className={clsx(styles.wrapper, value === '카테고리' && styles.placeholder)}
        onClick={handleDropdownToggle}
      >
        {value}
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {showLists.map((value, index) => (
            <div key={index} className={styles.list} onMouseDown={(e) => handleDropdownClick(e, value)}>
              <CheckIcon className={styles.icon} />
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
