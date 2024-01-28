import ArrowDownIcon from '#/icons/icon-arrowDown-solid.svg';
import { PRICE_LIST, PriceSortOption, RESERVE_LIST, ReserveSortOption } from '@/constants/dropdown';
import { useState } from 'react';
import styles from './FilterDropdown.module.css';

interface FilterDropdownProps {
  type: '가격' | '예약 상태';
}

type AllPriceOption = PriceSortOption | '가격';
type AllReserveOption = ReserveSortOption | '예약 상태';

function FilterDropDown({ type }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<AllPriceOption | AllReserveOption>(type);

  const lists = type === '가격' ? PRICE_LIST : RESERVE_LIST;

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container} onBlur={handleClickOutside}>
      <label className={styles.wrapper}>
        <button value={value} onClick={handleDropdown}>
          {value}
        </button>
        {value === type ? <ArrowDownIcon /> : <ArrowDownIcon style={{ rotate: '180deg' }} />}
      </label>
      {isOpen && (
        <div className={styles.menu} onClick={handleDropdown}>
          {lists.map((item, idx) => (
            <button key={idx} className={styles.list} onClick={() => setValue(item)}>
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropDown;
