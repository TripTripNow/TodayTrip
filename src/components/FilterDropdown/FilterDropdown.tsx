import ArrowDownIcon from '#/icons/icon-arrowDown-solid.svg';
import { PRICE_LIST, RESERVE_LIST } from '@/constants/dropdown';
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './FilterDropdown.module.css';
import { PriceFilterOption, ReserveFilterOption } from '@/types/dropdown';

export type EntireOptions = PriceFilterOption | ReserveFilterOption;

interface PriceDropdownProps {
  type: '가격';
  value: PriceFilterOption;
  setValue: Dispatch<SetStateAction<PriceFilterOption>>;
}

interface ReserveDropdownProps {
  type: '예약 상태';
  value: ReserveFilterOption;
  setValue: Dispatch<SetStateAction<ReserveFilterOption>>;
}

type FilterDropdownProps = PriceDropdownProps | ReserveDropdownProps;

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

  const handleDropdownClick = (val: EntireOptions) => {
    if (type === '가격') {
      setValue(val as PriceFilterOption);
    } else {
      setValue(val as ReserveFilterOption);
    }
  };

  return (
    <div onBlur={handleClickOutside} className={type === '가격' ? styles.price : styles.reserve}>
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
          {lists.map((item, idx) => (
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
