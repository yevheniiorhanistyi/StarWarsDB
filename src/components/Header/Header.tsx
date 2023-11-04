import { Component } from 'react';

import { ICommonProps } from '../../types/types';

import Nav from '../Nav/Nav';
import logo from '../../assets/logos/star_wars.png';

import styles from './Header.module.scss';

class Header extends Component<ICommonProps> {
  render() {
    const { hasError, triggerError } = this.props;
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.outerBox}>
            <a href="/">
              <img className={styles.header__logo} src={logo} alt="Star Wars" />
            </a>
            <Nav hasError={hasError} triggerError={triggerError} />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
