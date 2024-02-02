import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import clsx from 'clsx';

import { CATEGORY_LIST } from '@/constants/dropdown';
import ArrowDownIcon from '#/icons/icon-arrowdown.svg';
import ArrowUpIcon from '#/icons/icon-arrowup.svg';
import CheckIcon from '#/icons/icon-checkmark.svg';
import styles from './Dropdown.module.css';

export interface ActivityItems {
  id: number;
  title: string;
}

interface DropdownProps {
  type: '시간' | '카테고리' | '예약한 시간' | '체험';
  items?: string[];
  activityItems?: ActivityItems[];
  setDropdownItem: Dispatch<SetStateAction<string | ActivityItems>>;
}

const dropdownInitialValue = (type: string, items: string[], activityItems?: ActivityItems[]) => {
  if (type === '카테고리') return '카테고리';
  else if (type === '체험' && activityItems) return activityItems[0]?.title;
  else return items[0];
};

function Dropdown({ items, setDropdownItem, type, activityItems }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(dropdownInitialValue(type, items ?? [], activityItems ?? []));

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropdownClose = () => {
    setIsOpen(false);
  };

  const handleDropdownClick = (e: MouseEvent<HTMLDivElement>, val: string | ActivityItems) => {
    e.preventDefault();
    if (typeof val === 'string') {
      setValue(val);
      setDropdownItem(val);
    } else {
      setValue(val.title);
      setDropdownItem(val);
    }

    handleDropdownClose();
  };

  const showLists = activityItems ? activityItems : items ? items : CATEGORY_LIST;

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
        <div className={styles.menu}>
          {showLists.map((value, index) => (
            <div key={index} className={styles.list} onMouseDown={(e) => handleDropdownClick(e, value)}>
              <CheckIcon alt="체크 아이콘" className={styles.icon} />
              {typeof value === 'string' ? value : value.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
