import CheckIcon from '#/icons/icon-checkmark.svg';
import { Dispatch } from 'react';
import styles from './DropdownMenu.module.css';

interface DropdownMenuProps {
  value: string;
  isOpen: boolean;
  setValue: Dispatch<React.SetStateAction<string>>;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

function DropdownMenu({ value, isOpen, setValue, setIsOpen }: DropdownMenuProps) {
  const handleClick = () => {
    setValue(value);
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.list} onClick={handleClick}>
      <CheckIcon className={styles.icon} />
      {value}
    </div>
  );
}

export default DropdownMenu;
