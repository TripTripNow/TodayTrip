import ArrowDownIcon from '#/icons/icon-arrowdown.svg';
import ArrowUpIcon from '#/icons/icon-arrowup.svg';
// import DropdownMenu from '@/components/DropDown/DropdownMenu';
import CheckIcon from '#/icons/icon-checkmark.svg';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './Dropdown.module.css';

const lists = ['문화 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('카테고리');

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.container} style={{ border: '1px solid #000' }}>
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
          {lists.map((value, index) => (
            <div
              key={index}
              className={styles.list}
              onClick={() => {
                setValue(value);
                setIsOpen(!isOpen);
              }}
            >
              <CheckIcon alt="체크 아이콘" className={styles.icon} />
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
