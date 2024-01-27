import CheckIcon from '#/icons/icon-checkmark.svg';
import styles from './DropdownMenu.module.css';

interface DropdownMenuProps {
  value: string;
  isOpen: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DropdownMenu({ value, isOpen, setValue, setIsOpen }: DropdownMenuProps) {
  const handleClick = () => {
    setValue(value);
    setIsOpen(!isOpen);
    console.log(value);
  };
  return (
    <div className={styles.list} onClick={handleClick}>
      <CheckIcon className={styles.icon} />
      {value}
    </div>
  );
}

export default DropdownMenu;
