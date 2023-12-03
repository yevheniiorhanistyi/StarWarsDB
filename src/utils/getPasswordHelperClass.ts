import styles from '../components/Forms/Forms.module.scss';

export const getPasswordHelperClass = (strength: number | undefined): string => {
  if (strength === undefined) {
    return styles.formHelper;
  }

  let strengthClass: string | null = null;

  if (strength === 2 || strength === 3) {
    strengthClass = `${styles.formHelper} ${styles.formHelper_medium}`;
  } else if (strength >= 4) {
    strengthClass = `${styles.formHelper} ${styles.formHelper_strong}`;
  }

  return strengthClass !== null ? strengthClass : styles.formHelper;
};

export default getPasswordHelperClass;
