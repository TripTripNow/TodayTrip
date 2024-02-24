import { ChangeEvent, FormEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import Button from '@/components/common/Button/Button';
import SearchIcon from '#/icons/icon-search.svg';
import DeleteIcon from '#/icons/icon-close.svg';
import styles from './Searchbar.module.css';

interface SearchbarProps {
  inputSearchText: string;
  handleSearchText: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>,
    text?: string,
  ) => void;
  recentText: string[];
  handleDeleteRecentSearch: (e: MouseEvent<HTMLOrSVGScriptElement>, text: string) => void;
}

function Searchbar({
  inputSearchText,
  handleSearchText,
  handleSearchSubmit,
  recentText,
  handleDeleteRecentSearch,
}: SearchbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드랍다운 상태 추가

  const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') setIsDropdownOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>무엇을 체험하고 싶으신가요?</h1>

      <form onSubmit={handleSearchSubmit} className={styles.inputForm}>
        <div className={styles.inputWrapper}>
          <SearchIcon alt="검색창 아이콘" />
          <input
            className={styles.input}
            type="text"
            onChange={handleSearchText}
            value={inputSearchText}
            placeholder="내가 원하는 체험은"
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setIsDropdownOpen(false)}
            onClick={() => setIsDropdownOpen(true)}
            onKeyDown={handleEnterClick}
          />
          {inputSearchText && (
            <>
              <button
                className={styles.deleteSearchResult}
                aria-label="검색결과 초기화 버튼"
                onMouseDown={(e) => handleSearchSubmit(e, '')}
              >
                <DeleteIcon />
              </button>
              <p className={styles.searchPlaceholder}>내가 원하는 체험은</p>
            </>
          )}

          {/* 드랍다운 내용 */}
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <p className={styles.dropdownDescription}>최근 검색어{recentText.length <= 0 && ' 없음'}</p>
              {recentText.map((text, index) => (
                <div
                  key={index}
                  className={styles.dropdownItem}
                  onMouseDown={(e) => {
                    handleSearchSubmit(e, text);
                    setIsDropdownOpen(false);
                  }}
                >
                  <p>{text}</p>
                  <DeleteIcon
                    className={styles.dropdownItemDeleteIcon}
                    onMouseDown={(e: MouseEvent<HTMLOrSVGScriptElement>) => handleDeleteRecentSearch(e, text)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <Button type="search" color="green">
          검색하기
        </Button>
      </form>
    </div>
  );
}

export default Searchbar;
