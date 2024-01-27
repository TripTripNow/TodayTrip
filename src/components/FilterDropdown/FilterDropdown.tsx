import ArrowDownIcon from '#/icons/icon-arrowDown-solid.svg';
import { FilterOption, PriceSortOption } from '@/constants/dropdown';
import { useState } from 'react';
import styles from './FilterDropdown.module.css';

interface PriceFilter {
  type: '가격';
  lists: PriceSortOption[];
}

interface ReserveFilter {
  type: '예약 상태';
  lists: FilterOption[];
}

type FilterDropDownProps = PriceFilter | ReserveFilter;
type AllPriceOption = PriceSortOption | PriceFilter['type'];
type AllReserveOption = FilterOption | ReserveFilter['type'];

function FilterDropDown({ type, lists }: FilterDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<AllPriceOption | AllReserveOption>(type);

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <label className={styles.wrapper}>
        <button value={value} onClick={handleDropdown}>
          {value}
        </button>
        <ArrowDownIcon />
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
