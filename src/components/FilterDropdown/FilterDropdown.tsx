import ArrowDownIcon from '#/icons/icon-arrowDown-solid.svg';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './FilterDropdown.module.css';

interface FilterProps {
  type: '가격' | '필터';
  lists: string[];
}

function FilterDropDown({ type, lists }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const DropdownHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <label className={clsx(styles.label, type === '가격' ? styles.labelPrice : styles.labelFilter)}>
        <button onClick={DropdownHandler}>{type}</button>
        <ArrowDownIcon />
      </label>
      {isOpen && (
        <div
          className={clsx(styles.lists, type === '가격' ? styles.listsPrice : styles.listsFilter)}
          onClick={DropdownHandler}
        >
          {lists.map((item, idx) => (
            <button key={idx} className={styles.list}>
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropDown;
