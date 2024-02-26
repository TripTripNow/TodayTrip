import { Dispatch, SetStateAction, useState } from 'react';
import ArrowDownIcon from '#/icons/icon-arrowDown-solid.svg';
import styles from './FilterDropdown.module.css';
import { PriceFilterOption, ReserveFilterOption } from '@/types/dropdown';

type FilterOption = PriceFilterOption | ReserveFilterOption;

interface FilterDropdownProps<T> {
  list: T[];
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
}

function FilterDropDown<T extends FilterOption>({ value, setValue, list }: FilterDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleDropdownClick = (val: T) => {
    setValue(val);
  };

  return (
    <div onBlur={handleClickOutside} className={list[0] === '가격' ? styles.price : styles.reserve}>
      <button onClick={handleDropdown} className={styles.wrapper}>
        {value}
        {isOpen ? (
          <ArrowDownIcon alt="드롭다운이 열려있음을 나타내는 아이콘" style={{ rotate: '180deg' }} />
        ) : (
          <ArrowDownIcon alt="드롭다운이 닫혀있음을 나타내는 아이콘" />
        )}
      </button>
      {isOpen && (
        <div className={styles.option}>
          {list?.map((item, idx) => (
            <button className={styles.list} key={idx} onMouseDown={() => handleDropdownClick(item)}>
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropDown;
