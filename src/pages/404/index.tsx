import styles from './404.module.css';

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.fof}>
        <pre> </pre>
        <pre> </pre>
        <pre> </pre>
        <pre> </pre>
        <h1>Error 404</h1>
        <br />
        <h1>조습니다</h1>
        <button>뒤로 가기</button>
      </div>
    </div>
  );
}

export default NotFound;
