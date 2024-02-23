import NoResultIcon from '#/icons/icon-no-result.svg';
import styles from './NoResult.module.css';

interface NoResultProps {
  text?: string;
}

function NoResult({ text }: NoResultProps) {
  return (
    <div className={styles.container}>
      <NoResultIcon alt="검색 결과 없음" />
      <p>{text ?? '검색 결과가 없습니다.'}</p>
    </div>
  );
}

export default NoResult;