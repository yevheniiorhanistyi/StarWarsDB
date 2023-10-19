import styles from './Spinner.module.scss';

const Spinner: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.spinner} />
  </div>
);

export default Spinner;
