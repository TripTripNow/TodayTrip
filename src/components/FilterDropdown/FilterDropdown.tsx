import clsx from 'clsx';
import { useState } from 'react';
import ArrowDownIcon from '#/icons/icon-arrowDown-solid.svg';
import { FilterOption, PriceSortOption } from '@/constants/dropdown';
import styles from './FilterDropdown.module.css';

interface PriceFilter {
  type: '가격';
  lists: PriceSortOption[];
}

interface ReserveFilter {
  type: '필터';
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
    <div>
      <label className={clsx(styles.label, type === '가격' ? styles.labelPrice : styles.labelFilter)}>
        <button value={value} onClick={handleDropdown}>
          {value}
        </button>
        {value === type && <ArrowDownIcon />}
      </label>
      {isOpen && (
        <div
          className={clsx(styles.lists, type === '가격' ? styles.listsPrice : styles.listsFilter)}
          onClick={handleDropdown}
        >
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
