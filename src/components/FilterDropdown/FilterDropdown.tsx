import ArrowDownIcon from '#/icons/icon-arrowDown-solid.svg';
import { PRICE_LIST, PriceSortOption, RESERVE_LIST, ReserveSortOption } from '@/constants/dropdown';
import { useEffect, useState } from 'react';
import styles from './FilterDropdown.module.css';
import clsx from 'clsx';

interface FilterDropdownProps {
  type: '가격' | '예약 상태';
}

type AllPriceOption = PriceSortOption | '가격';
type AllReserveOption = ReserveSortOption | '예약 상태';

function FilterDropDown({ type }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<AllPriceOption | AllReserveOption>(type);
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const lists = type === '가격' ? (isMobile ? ['낮은 순', '높은 순'] : PRICE_LIST) : RESERVE_LIST;

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  const handleMobileSizeUpdate = () => {
    if (windowSize < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleMobileSizeUpdate();

    return () => {
      window.removeEventListener('resize', handleResize);
      handleMobileSizeUpdate();
    };
  }, [windowSize, isMobile]);

  return (
    <div onBlur={handleClickOutside}>
      <label className={styles.wrapper}>
        <button value={value} onClick={handleDropdown}>
          {value}
        </button>
        {value === type ? <ArrowDownIcon /> : <ArrowDownIcon style={{ rotate: '180deg' }} />}
      </label>
      {isOpen && (
        <div className={styles.option} onClick={handleDropdown}>
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
