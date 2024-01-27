import ArrowDownIcon from '#/icons/icon-arrowdown.svg';
import ArrowUpIcon from '#/icons/icon-arrowup.svg';
import CheckIcon from '#/icons/icon-checkmark.svg';
import { useState } from 'react';
import styles from './Dropdown.module.css';
import DropdownMenu from '@/components/DropDown/DropdownMenu';

const lists = ['문화 예술', '식음료', '스포츠', '투어', '관광'];

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('카테고리');

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <button value={value} className={styles.wrapper} onClick={handleClick}>
        {value}
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {lists.map((value, index) => (
            <DropdownMenu key={index} value={value} isOpen={isOpen} setIsOpen={setIsOpen} setValue={setValue} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
