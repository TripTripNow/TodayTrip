import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import clsx from 'clsx';

import ArrowDownIcon from '#/icons/icon-arrowdown.svg';
import ArrowUpIcon from '#/icons/icon-arrowup.svg';
import CheckIcon from '#/icons/icon-checkmark.svg';
import styles from './Dropdown.module.css';
import { Control, FieldValues, UseFormSetValue, useController } from 'react-hook-form';

export interface DropdownItems {
  id: number;
  title: string;
}

interface DropdownProps {
  type: '시간' | '카테고리' | '예약한 시간' | '체험';
  dropDownItems: DropdownItems[];
  setDropdownItem: Dispatch<SetStateAction<DropdownItems>>;
  placeholder: string | null;
  setCategory?: Dispatch<any>;
  control?: Control<FieldValues, any>;
  name?: string;
}

function Dropdown({ dropDownItems, setDropdownItem, type, placeholder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleItem, setVisibleItem] = useState(placeholder ?? dropDownItems[0].title);

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropdownClose = () => {
    setIsOpen(false);
  };

  const handleDropdownClick = (e: MouseEvent<HTMLDivElement>, val: DropdownItems) => {
    setVisibleItem(val.title);
    setDropdownItem(val);
    setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  const isPlaceHolder = visibleItem === '카테고리' || visibleItem === '00:00';

  return (
    <div className={clsx(styles.container, type === '시간' && styles.timeContainer)} onBlur={handleDropdownClose}>
      {type === '체험' && <p className={styles.subTitle}>체험명</p>}
      <button
        value={visibleItem}
        className={clsx(styles.wrapper, isPlaceHolder && styles.placeholder)}
        onClick={handleDropdownToggle}
      >
        {visibleItem}
        {isOpen ? <ArrowUpIcon alt="드랍다운 열림" /> : <ArrowDownIcon alt="드랍다운 닫힘" />}
      </button>
      {isOpen && (
        <div className={clsx(styles.menu, type === '시간' && styles.timeMenu)}>
          {dropDownItems.map((itemValue) => (
            <div
              key={itemValue.id}
              className={clsx(styles.list, type === '시간' && styles.timeList)}
              onMouseDown={(e) => handleDropdownClick(e, itemValue)}
            >
              {type !== '시간' && <CheckIcon alt="체크 아이콘" className={styles.icon} />}
              {itemValue.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Dropdown;
