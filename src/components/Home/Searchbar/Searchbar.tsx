import { ChangeEvent, FormEvent } from 'react';

import Button from '@/components/common/Button/Button';
import SearchIcon from '#/icons/icon-search.svg';
import styles from './Searchbar.module.css';

interface SearchbarProps {
  inputSearchText: string;
  handleSearchText: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
  recentText: string[];
}

function Searchbar({ inputSearchText, handleSearchText, handleSearchSubmit, recentText }: SearchbarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <h3 className={styles.title}>무엇을 체험하고 싶으신가요?</h3>

        <form onSubmit={handleSearchSubmit} className={styles.inputForm}>
          <div className={styles.inputWrapper}>
            <SearchIcon alt="검색창 아이콘" />
            <input
              className={styles.input}
              type="text"
              autoFocus
              onChange={handleSearchText}
              value={inputSearchText}
              placeholder="내가 원하는 체험은"
            />
            {inputSearchText && <p className={styles.searchPlaceholder}>내가 원하는 체험은</p>}
          </div>

          <Button type="search" color="green">
            검색하기
          </Button>
        </form>
        <p className={styles.searchText}>최근 검색어: {recentText.join(', ')}</p>
      </div>
    </div>
  );
}

export default Searchbar;
