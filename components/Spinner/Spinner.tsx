import styles from "./Spinner.module.scss";

const Spinner: React.FC = () => (
  <div>
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
    </div>
  </div>
);

export default Spinner;
