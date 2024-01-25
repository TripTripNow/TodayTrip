import ArrowDownIcon from '#/icons/icon-arrowdown.svg';
import ArrowUpIcon from '#/icons/icon-arrowup.svg';
import CheckIcon from '#/icons/icon-checkmark.svg';
import { useState } from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps {
  lists: string[];
}

function Dropdown({ lists }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <button className={styles.button} onClick={handleClick}>
          카테고리
        </button>
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </label>
      <ul className={isOpen ? styles.lists : styles.none}>
        {isOpen &&
          lists.map((item, index) => (
            <li className={styles.list} key={index}>
              <CheckIcon style={{ marginRight: 8 }} />
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Dropdown;
