import NoResultIcon from '#/icons/icon-no-result.svg';
import styles from './NoResult.module.css';

interface NoResultProps {
  text: string;
}

function NoResult({ text }: NoResultProps) {
  return (
    <div className={styles.defaultContainer}>
      <NoResultIcon alt="검색 결과 없음" />
      <p className={styles.default}>{text}</p>
    </div>
  );
}

export default NoResult;
