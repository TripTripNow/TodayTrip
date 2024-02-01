import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import clsx from 'clsx';
import ArrowDownIcon from '#/icons/icon-arrowdown.svg';
import ArrowUpIcon from '#/icons/icon-arrowup.svg';
import CheckIcon from '#/icons/icon-checkmark.svg';
import styles from './Dropdown.module.css';
import { CATEGORY_LIST } from '@/constants/dropdown';

interface DropdownProps {
  type: '시간' | '카테고리' | '예약한 시간' | '체험';
  items?: string[];
  setDropdownItem: Dispatch<SetStateAction<string>>;
}

const dropdownInitialValue = (type: string, items: string[]) => {
  if (type === '카테고리') return '카테고리';
  else return items[0];
};

function Dropdown({ items, setDropdownItem, type }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(dropdownInitialValue(type, items ?? []));

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropdownClose = () => {
    setIsOpen(false);
  };

  const handleDropdownClick = (e: MouseEvent<HTMLDivElement>, val: string) => {
    e.preventDefault();
    setValue(val);
    setDropdownItem(val);
    handleDropdownClose();
  };

  const showLists = items ? items.map((item) => item) : CATEGORY_LIST;
  return (
    <div className={clsx(styles.container, type === '시간' && styles.timeContainer)} onBlur={handleDropdownClose}>
      {type === '체험' && <p className={styles.subTitle}>체험명</p>}
      <button
        value={value}
        className={clsx(styles.wrapper, value === '카테고리' && styles.placeholder)}
        onClick={handleDropdownToggle}
      >
        {value}
        {isOpen ? <ArrowUpIcon alt="위쪽 방향 아이콘" /> : <ArrowDownIcon alt="아래쪽 방향 아이콘" />}
      </button>

      {isOpen && (
        <div className={clsx(styles.menu, type === '시간' && styles.timeMenu)}>
          {showLists.map((value, index) => (
            <div
              key={index}
              className={clsx(styles.list, type === '시간' && styles.timeList)}
              onMouseDown={(e) => handleDropdownClick(e, value)}
            >
              {type !== '시간' && <CheckIcon alt="체크 아이콘" className={styles.icon} />}
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
