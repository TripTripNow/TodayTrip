import NoResultIcon from '#/icons/icon-no-result.svg';
import styles from './NoResult.module.css';

function NoResult() {
  return (
    <div className={styles.container}>
      <NoResultIcon />
      <p>검색 결과가 없습니다.</p>
    </div>
  );
}

export default NoResult;
