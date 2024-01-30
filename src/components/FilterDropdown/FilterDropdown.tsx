import ArrowDownIcon from '#/icons/icon-arrowDown-solid.svg';
import { PRICE_LIST, RESERVE_LIST } from '@/constants/dropdown';
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './FilterDropdown.module.css';
import { PriceFilterOption, ReserveFilterOption } from '@/types/dropdown';

export type EntireOptions = PriceFilterOption | ReserveFilterOption;

interface FilterDropdownProps {
  type: '가격' | '예약 상태';
  value: EntireOptions;
  setValue: Dispatch<SetStateAction<EntireOptions>>;
}

function FilterDropDown({ type, value, setValue }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const lists = type === '가격' ? PRICE_LIST : RESERVE_LIST;

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div onBlur={handleClickOutside} className={type === '가격' ? styles.price : styles.reserve}>
      <button value={value} onClick={handleDropdown} className={type === '가격' ? styles.priceWrapper : styles.wrapper}>
        {value}
        {isOpen ? (
          <ArrowDownIcon alt="드롭다운이 열려있음을 나타내는 아이콘" style={{ rotate: '180deg' }} />
        ) : (
          <ArrowDownIcon alt="드롭다운이 닫혀있음을 나타내는 아이콘" />
        )}
      </button>
      {isOpen && (
        <div className={styles.option}>
          {lists.map((item, idx) => (
            <button
              className={type === '가격' ? styles.priceList : styles.list}
              key={idx}
              onClick={() => setValue(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropDown;
