import styles from '../404/404.module.css';

function ServerError() {
  return (
    <div className={styles.container}>
      <div className={styles.fof}>
        <h1>Error 500</h1>
      </div>
    </div>
  );
}

export default ServerError;
