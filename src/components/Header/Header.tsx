import { Component } from 'react';

import Nav from '../Nav/Nav';
import logo from '../../assets/logos/star_wars.png';

import styles from './Header.module.scss';

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.outerBox}>
            <a href="/">
              <img className={styles.header__logo} src={logo} alt="Star Wars" />
            </a>
            <Nav />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;