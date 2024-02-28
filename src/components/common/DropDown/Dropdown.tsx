import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import ArrowDownIcon from '#/icons/icon-arrowdown.svg';
import ArrowUpIcon from '#/icons/icon-arrowup.svg';
import CheckIcon from '#/icons/icon-checkmark.svg';
import styles from './Dropdown.module.css';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { Activity } from '@/types/common/api';

export interface DropdownItems {
  id: number;
  title: string;
}

interface DropdownProps {
  type: '시간' | '카테고리' | '예약한 시간' | '체험';
  dropDownItems: DropdownItems[];
  setDropdownItem: Dispatch<SetStateAction<DropdownItems>>;
  placeholder: string | null;
  id?: string;
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<Activity[], Error>>;
}

function Dropdown({ dropDownItems, setDropdownItem, type, placeholder, fetchNextPage, id }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(placeholder ?? dropDownItems[0].title);
  const { isVisible, targetRef, setRerender } = useInfiniteScroll();
  const isPlaceHolder = value === '카테고리' || value === '0:00';
  const InitialDropdownLength = useRef(dropDownItems.length);

  const handleDropdownToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRerender((prev) => !prev);
    setIsOpen((prev) => !prev);
  };

  const handleDropdownClose = () => {
    setRerender((prev) => !prev);
    setIsOpen(false);
  };

  const handleDropdownClick = (val: DropdownItems) => {
    setValue(val.title);
    setDropdownItem(val);
    setRerender((prev) => !prev);
  };

  useEffect(() => {
    if (isVisible && fetchNextPage) fetchNextPage();
  }, [isVisible]);

  return (
    <div
      id={id}
      className={clsx(styles.container, type === '시간' && styles.timeContainer)}
      onBlur={handleDropdownClose}
    >
      {type === '체험' && <p className={styles.subTitle}>체험명</p>}
      <button
        value={value}
        className={clsx(
          styles.wrapper,
          type === '카테고리' && styles.categoryWrapper,
          isPlaceHolder && styles.placeholder,
        )}
        onClick={handleDropdownToggle}
      >
        <span className={styles.dropdownText}>{value}</span>
        {isOpen ? (
          <ArrowUpIcon className={styles.dropdownArrow} alt="드랍다운 열림" />
        ) : (
          <ArrowDownIcon className={styles.dropdownArrow} alt="드랍다운 닫힘" />
        )}
      </button>
      {isOpen && (
        <div
          className={clsx(
            styles.menu,
            type === '시간' && styles.timeMenu,
            type === '체험' && InitialDropdownLength.current > 4 && styles.activityMenu,
            type === '예약한 시간' && InitialDropdownLength.current > 4 && styles.modalTimeMenu,
          )}
        >
          {dropDownItems.map((itemValue) => (
            <div
              key={itemValue.id}
              className={clsx(styles.list, type === '시간' && styles.timeList)}
              onMouseDown={() => handleDropdownClick(itemValue)}
            >
              {type !== '시간' && <CheckIcon alt="체크 아이콘" className={styles.icon} />}
              <span className={styles.dropdownText}>{itemValue.title}</span>
            </div>
          ))}
          <div ref={targetRef}></div>
        </div>
      )}
    </div>
  );
}
export default Dropdown;
