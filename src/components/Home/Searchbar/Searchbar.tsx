import { ChangeEvent, FormEvent } from 'react';

import SearchIcon from '#/icons/icon-search.svg';
import styles from './Searchbar.module.css';

interface SearchbarProps {
  searchText: string;
  handleSearchText: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
  recentText: string[];
}

function Searchbar({ searchText, handleSearchText, handleSearchSubmit, recentText }: SearchbarProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>무엇을 체험하고 싶으신가요?</h3>

      <form onSubmit={handleSearchSubmit} className={styles.inputForm}>
        <div className={styles.inputWrapper}>
          <SearchIcon style={{ marginLeft: '10px' }} />
          <input
            className={styles.input}
            type="text"
            autoFocus
            onChange={handleSearchText}
            value={searchText}
            placeholder="내가 원하는 체험은"
          />
          {searchText && <p className={styles.searchPlaceholder}>내가 원하는 체험은</p>}
        </div>

        <button className={styles.searchBtn}>검색하기</button>
      </form>
      <p className={styles.searchText}>최근 검색어: {recentText.join(', ')}</p>
    </div>
  );
}

export default Searchbar;
