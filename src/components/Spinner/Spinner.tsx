import { Component } from 'react';

import styles from './Spinner.module.scss';

class Spinner extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.spinner} />
      </div>
    );
  }
}

export default Spinner;
